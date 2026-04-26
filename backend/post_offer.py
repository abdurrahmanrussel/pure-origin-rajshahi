"""
Manually post a mango offer to the Pure Origin Rajshahi Facebook page.

Usage:
    python post_offer.py             # posts full mango list
    python post_offer.py himsagar    # posts Himsagar-specific post
    python post_offer.py langra
"""
import sys
import requests
from datetime import datetime
from config import PAGE_ACCESS_TOKEN, PAGE_ID
from ai import MANGO_LIST

GRAPH = "https://graph.facebook.com/v25.0"

MANGO_POSTS = {
    "himsagar": (
        "হিমসাগর",
        "রাজশাহীর রাজকীয় আম — হিমসাগর! 🥭\n\nঅসাধারণ সুগন্ধ, ফাইবারমুক্ত ও মিষ্টি স্বাদ।\n"
        "মূল্য: ১৮০-২৫০ টাকা/কেজি | মৌসুম: মে-জুন"
    ),
    "gopalbhog": (
        "গোপালভোগ",
        "মৌসুমের প্রথম আম — গোপালভোগ! 🥭\n\nছোট কিন্তু অতুলনীয় মিষ্টি ও সুগন্ধী।\n"
        "মূল্য: ২০০-২৮০ টাকা/কেজি | মৌসুম: মে-জুন"
    ),
    "langra": (
        "ল্যাংড়া",
        "ল্যাংড়া আম এসে গেছে! 🥭\n\nসুমিষ্ট, সুগন্ধী, হলুদ-সবুজ রঙ — টক-মিষ্টি অসাধারণ স্বাদ।\n"
        "মূল্য: ১৫০-২০০ টাকা/কেজি | মৌসুম: জুন-জুলাই"
    ),
    "amrapali": (
        "আম্রপালি",
        "আম্রপালি আম — লাল-হলুদ রঙের মিষ্টি আম! 🥭\n\nহাইব্রিড জাত, দীর্ঘস্থায়ী।\n"
        "মূল্য: ১২০-১৬০ টাকা/কেজি | মৌসুম: জুলাই-আগস্ট"
    ),
    "fazli": (
        "ফজলি",
        "ফজলি আম — বড় ও রসালো! 🥭\n\nদেরী মৌসুমের সেরা, পুরু শাঁস।\n"
        "মূল্য: ১৩০-১৮০ টাকা/কেজি | মৌসুম: জুলাই-আগস্ট"
    ),
    "haribhanga": (
        "হরিভাঙ্গা",
        "রাজশাহীর বিশেষ আম — হরিভাঙ্গা! 🥭\n\nফাইবারমুক্ত, মসৃণ ও অত্যন্ত সুস্বাদু।\n"
        "মূল্য: ১৬০-২২০ টাকা/কেজি | মৌসুম: জুলাই-আগস্ট"
    ),
}


def post_to_page(message: str) -> bool:
    resp = requests.post(
        f"{GRAPH}/{PAGE_ID}/feed",
        data={"message": message, "access_token": PAGE_ACCESS_TOKEN},
        timeout=10,
    )
    if resp.ok:
        print("✅ Posted! ID:", resp.json().get("id"))
        return True
    print("❌ Failed:", resp.text)
    return False


def main():
    mango_input = sys.argv[1].lower() if len(sys.argv) > 1 else None
    today = datetime.now().strftime("%d %B %Y")

    if mango_input and mango_input in MANGO_POSTS:
        name, body = MANGO_POSTS[mango_input]
        message = (
            f"🥭 {name} অফার ({today})\n\n"
            f"{body}\n\n"
            f"📲 অর্ডার: WhatsApp 01931-112866\n"
            f"🏠 ডেলিভারি: সারা বাংলাদেশ"
        )
    elif mango_input:
        print(f"Unknown mango '{mango_input}'. Available: {', '.join(MANGO_POSTS.keys())}")
        return
    else:
        message = (
            f"🥭 আজকের আমের তালিকা ({today})\n\n"
            f"{MANGO_LIST}\n\n"
            f"🌐 https://pure-origin-rajshahi.vercel.app"
        )

    print("--- Preview ---")
    print(message)
    print("---------------")
    confirm = input("Post this to the page? (y/n): ").strip().lower()
    if confirm == "y":
        post_to_page(message)
    else:
        print("Cancelled.")


if __name__ == "__main__":
    main()
