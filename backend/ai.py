"""
AI reply generator for Pure Origin Rajshahi — Facebook bot.
Uses Groq (llama-3.3-70b-versatile) with 5 rotating API keys.
"""
import logging
import time
from groq import Groq
from config import GROQ_API_KEY, GROQ_API_KEY2, GROQ_API_KEY3, GROQ_API_KEY4, GROQ_API_KEY5

logger = logging.getLogger(__name__)

# ── Groq clients (5 keys, round-robin, 100k tokens/day each) ─────────────────
_CLIENTS = [
    (Groq(api_key=k, max_retries=0), "llama-3.3-70b-versatile")
    for k in [GROQ_API_KEY, GROQ_API_KEY2, GROQ_API_KEY3, GROQ_API_KEY4, GROQ_API_KEY5]
    if k
]
_COOLDOWN_SECS = 60
_rate_limited_until: dict[int, float] = {}
_next_client_index = 0


# ── Mango product catalogue ───────────────────────────────────────────────────

MANGO_LIST = """\
🥭 আমাদের আমের তালিকা (২০২৫ মৌসুম):

১. হিমসাগর (Himsagar) — মে-জুন | ১৮০-২৫০ টাকা/কেজি
   রাজশাহীর রাজকীয় আম। অসাধারণ সুগন্ধ ও রসালো স্বাদ।

২. গোপালভোগ (Gopalbhog) — মে-জুন | ২০০-২৮০ টাকা/কেজি
   ছোট কিন্তু অতুলনীয় মিষ্টি। প্রথম মৌসুমের সেরা।

৩. ল্যাংড়া (Langra) — জুন-জুলাই | ১৫০-২০০ টাকা/কেজি
   সুমিষ্ট, সুগন্ধী, হলুদ-সবুজ রঙ।

৪. আম্রপালি (Amrapali) — জুলাই-আগস্ট | ১২০-১৬০ টাকা/কেজি
   হাইব্রিড জাত, লাল-হলুদ, দীর্ঘ সময় সংরক্ষণযোগ্য।

৫. ফজলি (Fazli) — জুলাই-আগস্ট | ১৩০-১৮০ টাকা/কেজি
   বড় আকার, অত্যন্ত রসালো।

৬. হরিভাঙ্গা (Haribhanga) — জুলাই-আগস্ট | ১৬০-২২০ টাকা/কেজি
   রাজশাহীর বিশেষ জাত, ফাইবারমুক্ত।

📦 ডেলিভারি: সারা বাংলাদেশ | ন্যূনতম ৫ কেজি
💳 পেমেন্ট: বিকাশ/নগদ/রকেট — 01931-112866 (সেন্ড মানি)
📲 অর্ডার: WhatsApp করুন — 01931-112866"""

# Mango variety aliases for detection
MANGO_ALIASES = {
    "himsagar":     "হিমসাগর",
    "হিমসাগর":     "হিমসাগর",
    "himshagar":    "হিমসাগর",
    "langra":       "ল্যাংড়া",
    "ল্যাংড়া":    "ল্যাংড়া",
    "lyngra":       "ল্যাংড়া",
    "amrapali":     "আম্রপালি",
    "আম্রপালি":    "আম্রপালি",
    "ampali":       "আম্রপালি",
    "fazli":        "ফজলি",
    "ফজলি":        "ফজলি",
    "fazly":        "ফজলি",
    "haribhanga":   "হরিভাঙ্গা",
    "হরিভাঙ্গা":   "হরিভাঙ্গা",
    "gopalbhog":    "গোপালভোগ",
    "গোপালভোগ":    "গোপালভোগ",
    "gopal":        "গোপালভোগ",
}

LIST_KEYWORDS = [
    "তালিকা", "list", "price", "দাম", "কত", "কি কি", "কী কী",
    "কোন কোন", "সব আম", "আমের দাম", "variety", "জাত",
]


def detect_mango(text: str):
    """Return mango name if user asked about a specific variety."""
    text_lower = text.lower()
    for alias, name in MANGO_ALIASES.items():
        if alias in text_lower:
            return name
    return None


def is_list_request(text: str) -> bool:
    """True if user is asking for the full mango list/prices."""
    text_lower = text.lower()
    return any(kw in text_lower for kw in LIST_KEYWORDS)


# ── System prompts ────────────────────────────────────────────────────────────

BASE_PROMPT = f"""\
তুমি Pure Origin Rajshahi-এর কাস্টমার সার্ভিস। রাজশাহীর সেরা আম ও দেশীয় পণ্য বিক্রি করি — সরাসরি বাগান থেকে।

যোগাযোগ: 01931-112866 (WhatsApp/কল)
লোকেশন: তালাইমারি, মতিহার, রাজশাহী ৬০০০
ওয়েবসাইট: https://pure-origin-rajshahi.vercel.app

পেমেন্ট: 01931-112866 — সেন্ড মানি (বিকাশ/নগদ/রকেট — রিচার্জ নয়)
অর্ডার: WhatsApp করুন → জাত ও পরিমাণ বলুন → পেমেন্ট করুন → ডেলিভারি পান।
ডেলিভারি: সারা বাংলাদেশ, ২৪-৪৮ ঘণ্টার মধ্যে। ন্যূনতম ৫ কেজি।

আমের তথ্য (শুধু এই কথোপকথনে পাঠানো তালিকা থেকে বলো):
{MANGO_LIST}

নিয়ম:
- সবসময় বাংলায় উত্তর দাও।
- উত্তর সংক্ষিপ্ত রাখো (২-৪ লাইন)।
- কোনো দাম বা তথ্য নিজে থেকে বানিও না — শুধু উপরের তালিকা থেকে বলো।
- পেমেন্ট করেছে বললে: শেষ ৪ ডিজিট চাও → ট্রানজেকশন আইডি চাও → দুটো পেলে বলো "অপেক্ষা করুন, কনফার্ম করে দিচ্ছি 🙏"
- সমস্যা বা জোরাজুরি হলে বলো: "সরাসরি কল করুন: 01931-112866"
- AI বা বট পরিচয় দেবে না। কোনো markdown ব্যবহার করবে না।"""

COMMENT_PROMPT = """\
তুমি Pure Origin Rajshahi-এর কাস্টমার সার্ভিস। রাজশাহীর বাগান থেকে সরাসরি আম বিক্রি করি।
নিয়ম:
- কমেন্টের উত্তর ১-২ লাইনে দাও, বন্ধুত্বপূর্ণভাবে।
- বিস্তারিত দাম বা তালিকা বলবে না — ইনবক্সে মেসেজ করতে বলো।
- সবসময় বাংলায় উত্তর দাও।
- AI বা বট পরিচয় দেবে না। কোনো markdown ব্যবহার করবে না।"""


# ── Groq chat with key rotation ───────────────────────────────────────────────

def _chat(messages: list, max_tokens: int = 400, temperature: float = 0.7) -> str:
    global _next_client_index
    now = time.time()
    n = len(_CLIENTS)
    for attempt in range(n):
        i = (_next_client_index + attempt) % n
        client, model = _CLIENTS[i]
        if now < _rate_limited_until.get(i, 0):
            logger.info("Skipping key %d (cooldown %.0fs left)", i, _rate_limited_until[i] - now)
            continue
        try:
            resp = client.chat.completions.create(
                model=model,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
            )
            _next_client_index = (i + 1) % n
            return resp.choices[0].message.content.strip()
        except Exception as e:
            err = str(e)
            if "429" in err or "rate_limit" in err.lower():
                _rate_limited_until[i] = time.time() + _COOLDOWN_SECS
                logger.warning("Rate limit key %d — cooldown %ds", i, _COOLDOWN_SECS)
                continue
            if "413" in err or "too large" in err.lower():
                logger.warning("Payload too large, trying next client...")
                continue
            raise
    raise RuntimeError("All Groq clients exhausted")


# ── Reply generators ──────────────────────────────────────────────────────────

def generate_comment_reply(comment_text: str, post_text: str = "") -> str:
    context = f'পোস্ট: "{post_text[:150]}"\n' if post_text else ""
    try:
        return _chat(
            messages=[
                {"role": "system", "content": COMMENT_PROMPT},
                {"role": "user", "content": f"{context}কমেন্ট: \"{comment_text}\""},
            ],
            max_tokens=100,
            temperature=0.7,
        )
    except Exception as e:
        logger.error("Groq comment reply failed: %s", e)
        return "ধন্যবাদ! 🥭 বিস্তারিত জানতে ইনবক্সে মেসেজ করুন।"


def generate_inbox_reply(user_message: str, history: list = None) -> str:
    messages = [{"role": "system", "content": BASE_PROMPT}]
    if history:
        messages.extend(history[-4:])
    messages.append({"role": "user", "content": user_message})
    try:
        return _chat(messages=messages, max_tokens=500, temperature=0.7)
    except Exception as e:
        logger.error("Groq inbox reply failed: %s", e)
        return "আপনার বার্তার জন্য ধন্যবাদ! 🥭 আমরা শীঘ্রই উত্তর দেব। যোগাযোগ: 01931-112866"
