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
| `add_post.py` | **Local only** — reads `posts.txt`, uploads posts to Google Sheet queue |
| `download_images.py` | **Local only** — downloads images by keyword, save to Drive folder |
| `posts.txt` | **Local only** — write numbered posts here, run `add_post.py` to upload |
| `apps_script.js` | Reference copy of the Google Apps Script code |
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
Every 30 minutes from 10:00 to 23:00 BD time (27 slots/day).
All posts pulled from Google Sheet queue. If sheet is empty at that slot, skipped.

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

## Uploading Scheduled Posts (Local Only)

### Step 1 — Download images
```bash
source venv/bin/activate
python download_images.py "mango fruit rajshahi" 100
python download_images.py "রাজশাহীর আম" 50
```
Images saved to `downloaded_images/<keyword>/`. Upload that folder to the Google Drive image folder manually.
Drive folder: https://drive.google.com/drive/folders/1MvZaQs2CX0wnczyg615l-QB1Rwkshotb

### Step 2 — Write posts
Edit `posts.txt` with numbered posts (Bengali or English numbers):
```
১. First post text here
২. Second post text here
৩. Third post text here
```

### Step 3 — Upload to queue
```bash
source venv/bin/activate
python add_post.py          # preview + upload all posts from posts.txt
python add_post.py --list   # see what's currently queued in the sheet
python add_post.py --clear  # clear the entire queue
```
Apps Script auto-assigns images from the Drive folder (cycles through them in order).

## Google Sheets / Apps Script
- Sheet: https://docs.google.com/spreadsheets/d/17RP6sMcPAJFNZxViG-zMRXpyWWUb5hincBWVV11CAC8/edit
- Apps Script URL stored in `.env` as `GOOGLE_SCRIPT_URL`
- Apps Script code reference: `apps_script.js`
- Image index (which image is next) stored in Apps Script PropertiesService — resets automatically when it loops
