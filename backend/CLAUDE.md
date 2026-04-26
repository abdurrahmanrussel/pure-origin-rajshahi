# Pure Origin Rajshahi — Facebook Bot

## What This Is
A polling-based Facebook auto-reply bot for the "Pure Origin Rajshahi" page.
Replies to post comments and Messenger inbox using Groq AI (llama-3.3-70b-versatile).
No webhook needed — pure polling every 15 seconds.

## Business Info
- **Page:** Pure Origin Rajshahi
- **Page ID:** 1048132561723449
- **Location:** Talaimari, Motihar, Rajshahi 6000
- **Service:** Premium mangoes & local products, direct from farm
- **Contact:** 01931-112866 (WhatsApp / Call)
- **Email:** abdurrahmanrussel77@gmail.com
- **Website:** https://pure-origin-rajshahi.vercel.app
- **Payment:** 01931-112866 — bKash/Nagad/Rocket (send money only)

## Files
| File | Purpose |
|---|---|
| `poller.py` | Main bot — polls comments and inbox every 15s, runs daily auto-posts |
| `ai.py` | Groq AI reply generator + mango product catalogue |
| `config.py` | Loads env vars from `.env` |
| `fb_api.py` | Facebook Graph API helpers |
| `server.py` | Flask entry point for Render deployment |
| `post_offer.py` | Manual script to post a mango offer to the page |
| `render.yaml` | Render deployment config |
| `requirements.txt` | Python dependencies |
| `.env` | Secrets — never commit this |

## Running Locally
```bash
cd backend
source venv/bin/activate
python poller.py
```

## Deploying to Render
- Start command: `gunicorn server:app --bind 0.0.0.0:$PORT --timeout 120`
- UptimeRobot pings `/health` every 5 minutes to keep it awake
- Push to GitHub → Render auto-deploys

## GitHub Repo
https://github.com/abdurrahmanrussel/pure-origin-rajshahi

## Facebook App
- **App ID:** 1536572791519678
- **App Mode:** Live
- **Permissions:** pages_read_engagement, pages_manage_engagement, pages_messaging, pages_manage_posts
- **Page Access Token:** Never-expiring (generated from long-lived user token, stored in `.env`)
- **Token expires:** Never (PAGE type token)

## Groq AI
- Model: `llama-3.3-70b-versatile`
- 5 API keys rotating (round-robin) — 100k tokens/day each = 500k/day total
- On 429 rate limit: marks key in 60s cooldown, moves to next key
- Keys stored as GROQ_API_KEY through GROQ_API_KEY5 in `.env`

## Mango Products
Hardcoded in `ai.py` → `MANGO_LIST`:
| Variety | Season | Price |
|---|---|---|
| হিমসাগর | মে-জুন | ১৮০-২৫০ ৳/কেজি |
| গোপালভোগ | মে-জুন | ২০০-২৮০ ৳/কেজি |
| ল্যাংড়া | জুন-জুলাই | ১৫০-২০০ ৳/কেজি |
| আম্রপালি | জুলাই-আগস্ট | ১২০-১৬০ ৳/কেজি |
| ফজলি | জুলাই-আগস্ট | ১৩০-১৮০ ৳/কেজি |
| হরিভাঙ্গা | জুলাই-আগস্ট | ১৬০-২২০ ৳/কেজি |

## Bot Behavior

### Comments
- Short 1-2 line friendly AI reply
- Always appends: "বিস্তারিত জানতে ইনবক্সে মেসেজ করুন।"

### Inbox (Messenger)
- If list/price keyword detected → serve raw `MANGO_LIST` (no AI, no hallucination)
- Otherwise → AI reply with last 4 turns of conversation history
- Only ONE reply per poll cycle

### Special Cases
| Trigger | Bot Response |
|---|---|
| Voice message | Asks to send text |
| Image only | Silently ignored |
| Payment claimed | Asks last 4 digits → transaction ID → "অপেক্ষা করুন" |
| Insisting / problem | "কল করুন: 01931-112866" |
| Language | Pure Bangla always |

## Daily Auto-Posts (Bangladesh Time)
| Time | Post |
|---|---|
| 10:00 | Morning post with full mango list |
| 18:00 | Evening offer post |

## Manual Post
```bash
source venv/bin/activate
python post_offer.py              # full list
python post_offer.py himsagar     # Himsagar-specific post
python post_offer.py langra
python post_offer.py gopalbhog
python post_offer.py amrapali
python post_offer.py fazli
python post_offer.py haribhanga
```
