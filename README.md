# Pure Origin Rajshahi

রাজশাহীর সেরা আম ও দেশীয় পণ্য, সরাসরি উৎস থেকে 🥭

**Website:** https://pure-origin-rajshahi.vercel.app  
**Facebook:** Pure Origin Rajshahi  
**Contact:** 01931-112866 (WhatsApp / Call)

---

## Project Structure

```
pure-origin-rajshahi/
├── frontend/        # React + Vite + Tailwind — deployed on Vercel
└── backend/         # Python FB automation bot — deployed on Render
```

---

## Frontend

Premium mango selling website. Single-page, no backend needed.

**Stack:** React 19, Vite, Tailwind CSS v4  
**Deploy:** Vercel (connect repo, set root to `frontend/`)

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
```

---

## Backend — Facebook Bot

Polling-based auto-reply bot for the Pure Origin Rajshahi Facebook page.
- Replies to post **comments** with a friendly AI response
- Replies to **Messenger inbox** with mango info or AI reply
- Posts **daily offers** automatically at 10:00 and 18:00 (BD time)

**Stack:** Python, Flask, Groq AI (llama-3.3-70b), Facebook Graph API v25  
**Deploy:** Render

### Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Copy `.env` and fill in your credentials:
```
APP_ID=
APP_SECRET=
PAGE_ACCESS_TOKEN=
PAGE_ID=1048132561723449
VERIFY_TOKEN=
GROQ_API_KEY=
GROQ_API_KEY2=
...
```

### Run locally

```bash
# Foreground (recommended for testing)
./start.sh

# Background (keep alive after terminal close)
./start.sh --bg
tail -f bot.log          # watch logs
kill $(cat bot.pid)      # stop
```

### Manual post to page

```bash
python post_offer.py                 # full mango list
python post_offer.py himsagar
python post_offer.py langra
python post_offer.py gopalbhog
python post_offer.py amrapali
python post_offer.py fazli
python post_offer.py haribhanga
```

### Deploy to Render

1. Connect this repo on [render.com](https://render.com)
2. Set **Root Directory** → `backend`
3. Set **Start Command** → `gunicorn server:app --bind 0.0.0.0:$PORT --timeout 120`
4. Add all `.env` variables in Render's Environment tab
5. Add UptimeRobot to ping `/health` every 5 minutes

---

## Facebook App Permissions Required

`pages_read_engagement` · `pages_manage_engagement` · `pages_messaging` · `pages_manage_posts`

---

## Mango Products

| Variety | Season | Price |
|---|---|---|
| হিমসাগর (Himsagar) | মে–জুন | ১৮০–২৫০ ৳/কেজি |
| গোপালভোগ (Gopalbhog) | মে–জুন | ২০০–২৮০ ৳/কেজি |
| ল্যাংড়া (Langra) | জুন–জুলাই | ১৫০–২০০ ৳/কেজি |
| আম্রপালি (Amrapali) | জুলাই–আগস্ট | ১২০–১৬০ ৳/কেজি |
| ফজলি (Fazli) | জুলাই–আগস্ট | ১৩০–১৮০ ৳/কেজি |
| হরিভাঙ্গা (Haribhanga) | জুলাই–আগস্ট | ১৬০–২২০ ৳/কেজি |
