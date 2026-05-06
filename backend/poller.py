"""
Polling-based Facebook auto-reply bot for Pure Origin Rajshahi.
Polls comments and inbox every 15s. No webhook needed.

Usage:
    source venv/bin/activate
    python poller.py
"""
import time
import logging
import requests
from datetime import datetime, timezone, timedelta

BD_TZ = timedelta(hours=6)  # Bangladesh = UTC+6

from config import PAGE_ACCESS_TOKEN, PAGE_ID
from ai import generate_comment_reply, generate_inbox_reply, detect_mango, is_list_request, PRE_SEASON_MSG
from sheets import get_next_post

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
logger = logging.getLogger(__name__)

GRAPH = "https://graph.facebook.com/v25.0"
POLL_INTERVAL = 15  # seconds

# ── Daily auto-post schedule (Bangladesh time) ────────────────────────────────
AUTO_POSTS = [
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
    "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
    "22:00", "22:30", "23:00",
]

_posted_today: set = set()
_last_post_date = None

# In-memory reply tracking (resets on restart)
replied_comments: set = set()
replied_messages: set = set()


# ── Auto-post message builders ────────────────────────────────────────────────

def build_auto_post(post_type: str) -> str:
    now = datetime.now(timezone.utc) + BD_TZ
    date_str = now.strftime("%d %B %Y")

    if post_type == "morning":
        return (
            f"🌅 শুভ সকাল! ({date_str})\n\n"
            f"রাজশাহীর সেরা আম এখন পাওয়া যাচ্ছে! 🥭\n\n"
            f"{MANGO_LIST}\n\n"
            f"📲 অর্ডার করতে WhatsApp করুন: 01931-112866\n"
            f"🏠 ডেলিভারি: সারা বাংলাদেশ (২৪-৪৮ ঘণ্টা)"
        )
    else:  # evening
        return (
            f"🌙 সন্ধ্যার অফার ({date_str})\n\n"
            f"আজই অর্ডার করুন — আগামীকাল পৌঁছে যাবে! 🥭\n\n"
            f"✅ সরাসরি বাগান থেকে\n"
            f"✅ ১০০% প্রাকৃতিক, রাসায়নিকমুক্ত\n"
            f"✅ সারা বাংলাদেশে ডেলিভারি\n\n"
            f"📲 WhatsApp: 01931-112866\n"
            f"🌐 Website: https://pure-origin-rajshahi.vercel.app"
        )


# ── Comment polling ───────────────────────────────────────────────────────────

def get_recent_posts():
    resp = requests.get(
        f"{GRAPH}/{PAGE_ID}/posts",
        params={
            "access_token": PAGE_ACCESS_TOKEN,
            "limit": 5,
            "fields": "id,message,story,created_time",
        },
        timeout=10,
    )
    if not resp.ok:
        logger.error("Failed to fetch posts: %s", resp.text)
        return []
    return resp.json().get("data", [])


def get_comments(post_id):
    resp = requests.get(
        f"{GRAPH}/{post_id}/comments",
        params={
            "access_token": PAGE_ACCESS_TOKEN,
            "filter": "stream",
            "limit": 25,
            "fields": "id,from,message,created_time",
        },
        timeout=10,
    )
    if not resp.ok:
        logger.error("Failed to fetch comments for %s: %s", post_id, resp.text)
        return []
    return resp.json().get("data", [])


def reply_to_comment(comment_id, message):
    resp = requests.post(
        f"{GRAPH}/{comment_id}/comments",
        data={"message": message, "access_token": PAGE_ACCESS_TOKEN},
        timeout=10,
    )
    if resp.ok:
        logger.info("Replied to comment %s", comment_id)
    else:
        logger.error("Failed comment reply %s: %s", comment_id, resp.text)


def check_comments(reply=True):
    posts = get_recent_posts()
    for post in posts:
        comments = get_comments(post["id"])
        for comment in comments:
            cid = comment["id"]
            from_id = comment.get("from", {}).get("id", "")
            if from_id == PAGE_ID:
                continue
            if cid in replied_comments:
                continue
            replied_comments.add(cid)
            if reply:
                post_text = post.get("message") or post.get("story") or ""
                comment_text = comment.get("message", "")
                ai_reply = generate_comment_reply(comment_text, post_text)
                full_reply = ai_reply + "\n\n📩 বিস্তারিত জানতে ইনবক্সে মেসেজ করুন।"
                reply_to_comment(cid, full_reply)


# ── Messenger polling ─────────────────────────────────────────────────────────

def send_message(recipient_id, message):
    resp = requests.post(
        f"{GRAPH}/me/messages",
        json={
            "recipient": {"id": recipient_id},
            "message": {"text": message},
        },
        params={"access_token": PAGE_ACCESS_TOKEN},
        timeout=10,
    )
    if resp.ok:
        logger.info("Sent DM to %s", recipient_id)
    else:
        logger.error("Failed DM to %s: %s", recipient_id, resp.text)


def get_conversations():
    resp = requests.get(
        f"{GRAPH}/{PAGE_ID}/conversations",
        params={"access_token": PAGE_ACCESS_TOKEN, "limit": 10},
        timeout=10,
    )
    if not resp.ok:
        logger.warning("Cannot fetch conversations: %s", resp.text)
        return []
    return resp.json().get("data", [])


def get_messages_in_conversation(conv_id):
    resp = requests.get(
        f"{GRAPH}/{conv_id}/messages",
        params={
            "access_token": PAGE_ACCESS_TOKEN,
            "fields": "id,from,message,created_time,attachments",
            "limit": 10,
        },
        timeout=10,
    )
    if not resp.ok:
        return []
    return list(reversed(resp.json().get("data", [])))


def check_inbox(reply=True):
    conversations = get_conversations()

    if not reply:
        for conv in conversations:
            for msg in get_messages_in_conversation(conv["id"]):
                mid = msg.get("id")
                sender_id = msg.get("from", {}).get("id", "")
                if mid and sender_id != PAGE_ID:
                    replied_messages.add(mid)
        return

    candidates = []
    conv_messages_map = {}
    for conv in conversations:
        messages = get_messages_in_conversation(conv["id"])
        conv_messages_map[conv["id"]] = messages

        last_msg = messages[-1] if messages else None
        if last_msg and last_msg.get("from", {}).get("id") == PAGE_ID:
            continue

        for msg in reversed(messages):
            mid = msg.get("id")
            sender_id = msg.get("from", {}).get("id", "")
            if not mid or sender_id == PAGE_ID:
                continue
            if mid in replied_messages:
                continue
            text = msg.get("message", "")
            attachments = msg.get("attachments", {}).get("data", [])
            if not text and not attachments:
                continue
            candidates.append((msg, conv["id"]))
            break

    if not candidates:
        return

    candidates.sort(key=lambda x: x[0].get("created_time", ""), reverse=True)
    latest_user_msg, conv_id = candidates[0]
    messages = conv_messages_map[conv_id]

    mid = latest_user_msg["id"]
    sender_id = latest_user_msg.get("from", {}).get("id", "")
    replied_messages.add(mid)

    user_text = latest_user_msg.get("message", "")
    attachments = latest_user_msg.get("attachments", {}).get("data", [])
    attach_types = {a.get("type", "") for a in attachments}

    # Voice → ask for text
    if "audio" in attach_types:
        send_message(sender_id, "ভয়েস মেসেজ পড়তে পারি না। দয়া করে টেক্সটে লিখুন। 🙏")
        return

    # Image only → ignore
    if "image" in attach_types and not user_text:
        return

    # Full list request → pre-season message (no AI)
    if is_list_request(user_text):
        send_message(sender_id, PRE_SEASON_MSG)
        return

    # Specific mango inquiry → AI with mango context injected
    mango = detect_mango(user_text)

    history = []
    for m in messages:
        if m["id"] == mid:
            break
        role = "assistant" if m.get("from", {}).get("id") == PAGE_ID else "user"
        if m.get("message"):
            history.append({"role": role, "content": m["message"]})

    ai_reply = generate_inbox_reply(user_text, history)
    send_message(sender_id, ai_reply)


# ── Scheduled daily posts ─────────────────────────────────────────────────────

def post_to_page(message: str, image_url: str = None):
    if image_url:
        resp = requests.post(
            f"{GRAPH}/{PAGE_ID}/photos",
            data={"url": image_url, "message": message, "access_token": PAGE_ACCESS_TOKEN},
            timeout=15,
        )
    else:
        resp = requests.post(
            f"{GRAPH}/{PAGE_ID}/feed",
            data={"message": message, "access_token": PAGE_ACCESS_TOKEN},
            timeout=15,
        )
    if resp.ok:
        logger.info("Auto-post published. ID: %s", resp.json().get("id", resp.json().get("post_id")))
    else:
        logger.error("Auto-post failed: %s", resp.text)
    return resp.ok


def check_scheduled_post():
    global _last_post_date, _posted_today
    now = datetime.now(timezone.utc) + BD_TZ
    today = now.date()

    if _last_post_date != today:
        _posted_today = set()
        _last_post_date = today

    now_minutes = now.hour * 60 + now.minute

    for post_time in AUTO_POSTS:
        if post_time in _posted_today:
            continue
        ph, pm = map(int, post_time.split(":"))
        slot_minutes = ph * 60 + pm
        diff = now_minutes - slot_minutes
        # only fire within a 10-minute window after scheduled time
        if not (0 <= diff < 10):
            continue
        _posted_today.add(post_time)

        post_text, image_url = get_next_post()
        if not post_text:
            logger.info("No post in sheet for %s — skipping.", post_time)
            continue
        post_to_page(post_text, image_url)
        logger.info("Sheet auto-post done at %s.", post_time)


# ── Main loop ─────────────────────────────────────────────────────────────────

def main():
    logger.info("Pure Origin Rajshahi — FB Bot starting...")
    logger.info("Seeding existing comments and messages (won't reply to old ones)...")
    try:
        check_comments(reply=False)
        check_inbox(reply=False)
    except Exception as e:
        logger.error("Seeding error: %s", e)
    logger.info(
        "Seeded %d comment(s) and %d message(s). Watching for NEW ones...",
        len(replied_comments),
        len(replied_messages),
    )
    logger.info("Polling every %ds. Press Ctrl+C to stop.", POLL_INTERVAL)
    logger.info("Auto-post schedule: %s → %s BD time, every 30min (%d slots).",
                AUTO_POSTS[0], AUTO_POSTS[-1], len(AUTO_POSTS))

    while True:
        time.sleep(POLL_INTERVAL)
        try:
            check_scheduled_post()
            check_comments()
            check_inbox()
        except Exception as e:
            logger.error("Unexpected error: %s", e)


if __name__ == "__main__":
    main()
