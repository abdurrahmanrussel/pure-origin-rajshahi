"""
Read posts.txt → upload each numbered post to Google Sheet queue.
Apps Script auto-assigns images from Drive folder (cycles through them).

posts.txt format — just numbered posts, no image tags needed:
    ১. First post text here
    ২. Second post text here
    ৩. Third post (can be multi-line,
       just indent continuation lines)

Run:
    python add_post.py          # upload from posts.txt
    python add_post.py --list   # show current queue
    python add_post.py --clear  # clear queue
"""
import os
import re
import sys
import requests
from dotenv import load_dotenv

load_dotenv()

SCRIPT_URL = os.getenv("GOOGLE_SCRIPT_URL")
POSTS_FILE = os.path.join(os.path.dirname(__file__), "posts.txt")

# Matches Bengali (১২৩...) or English (123...) numbered list markers
NUMBERED = re.compile(r'(?:^|\n)[\s]*[১২৩৪৫৬৭৮৯০\d]+[.।]\s*')


def parse_posts(text: str) -> list[str]:
    parts = NUMBERED.split(text)
    return [p.strip() for p in parts if p.strip()]


def upload(post_text: str) -> bool:
    if not SCRIPT_URL:
        print("ERROR: GOOGLE_SCRIPT_URL not set in .env")
        return False
    resp = requests.get(
        SCRIPT_URL,
        params={"action": "add", "post": post_text},
        timeout=20,
    )
    try:
        data = resp.json()
    except Exception:
        print(f"  ❌ Bad response (status {resp.status_code}): {resp.text[:200]}")
        return False
    if data.get("status") == "added":
        return True
    print(f"  ❌ Script error: {data}")
    return False


def list_posts() -> None:
    if not SCRIPT_URL:
        print("ERROR: GOOGLE_SCRIPT_URL not set in .env")
        return
    resp = requests.get(SCRIPT_URL, params={"action": "list"}, timeout=20)
    if not resp.ok:
        print(f"❌ {resp.status_code}: {resp.text}")
        return
    posts = resp.json().get("posts", [])
    if not posts:
        print("Queue is empty.")
        return
    print(f"\n📋 {len(posts)} queued posts:\n")
    for i, p in enumerate(posts, 1):
        preview = p.get("post", "")[:70].replace("\n", " ")
        img = " 🖼️" if p.get("image") else ""
        print(f"  {i}.{img} {preview}{'...' if len(p.get('post', '')) > 70 else ''}")
    print()


def clear_queue() -> None:
    if not SCRIPT_URL:
        print("ERROR: GOOGLE_SCRIPT_URL not set in .env")
        return
    confirm = input("Clear ALL queued posts? (y/n): ").strip().lower()
    if confirm != "y":
        print("Cancelled.")
        return
    resp = requests.get(SCRIPT_URL, params={"action": "clear"}, timeout=20)
    if resp.ok:
        print(f"✅ Cleared {resp.json().get('deleted', '?')} posts.")
    else:
        print(f"❌ {resp.status_code}: {resp.text}")


def main():
    args = sys.argv[1:]

    if args and args[0] == "--list":
        list_posts()
        return
    if args and args[0] == "--clear":
        clear_queue()
        return

    if not os.path.exists(POSTS_FILE):
        print(f"posts.txt not found. Create it at:\n  {POSTS_FILE}")
        return

    raw = open(POSTS_FILE, encoding="utf-8").read()
    posts = parse_posts(raw)

    if not posts:
        print("No numbered posts found in posts.txt.")
        return

    print(f"\n🥭 Found {len(posts)} post(s) in posts.txt:\n")
    for i, text in enumerate(posts, 1):
        preview = text[:80].replace("\n", " ")
        print(f"  {i}. {preview}{'...' if len(text) > 80 else ''}")

    print()
    confirm = input(f"Upload all {len(posts)} to queue? (y/n): ").strip().lower()
    if confirm != "y":
        print("Cancelled.")
        return

    print()
    ok = 0
    for i, text in enumerate(posts, 1):
        if upload(text):
            print(f"  ✅ Post {i} uploaded")
            ok += 1
        else:
            print(f"  ❌ Post {i} failed")

    print(f"\n✅ {ok}/{len(posts)} uploaded.")

    if ok == len(posts):
        clear = input("Clear posts.txt now? (y/n): ").strip().lower()
        if clear == "y":
            open(POSTS_FILE, "w", encoding="utf-8").close()
            print("posts.txt cleared.")


if __name__ == "__main__":
    main()
