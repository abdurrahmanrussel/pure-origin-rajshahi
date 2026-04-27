"""
Google Sheets integration via Apps Script web app.
Calls the script URL to get next post (row 2) and delete it atomically.
"""
import os
import re
import logging
import requests

logger = logging.getLogger(__name__)

SCRIPT_URL = os.getenv(
    "GOOGLE_SCRIPT_URL",
    "https://script.google.com/macros/s/AKfycbyPgwe-N-k7AbWgSGFQuO2RRuvglUvk0yxb0Nvx0btsG5BhIKgco8L988TRsosNtB_M/exec",
)


def _fix_image_url(url: str) -> str:
    """Convert Google Drive share links to direct download URLs."""
    if not url:
        return url
    match = re.search(r'/d/([a-zA-Z0-9_-]+)', url)
    if match:
        return f"https://drive.google.com/uc?export=download&id={match.group(1)}"
    return url


def get_next_post():
    """
    Calls the Apps Script web app which:
    - returns {post, image} from row 2
    - deletes row 2 atomically

    Returns (post_text, image_url) or (None, None) if sheet is empty.
    """
    try:
        resp = requests.get(SCRIPT_URL, timeout=20)
        resp.raise_for_status()
        data = resp.json()
        post = data.get("post") or None
        image = _fix_image_url(data.get("image") or "")
        if post:
            logger.info("Got post from sheet: %.60s...", post)
        else:
            logger.info("Sheet empty — no post to publish.")
        return post, image
    except Exception as e:
        logger.error("Sheet fetch failed: %s", e)
        return None, None


def delete_posted_row():
    """No-op — Apps Script already deletes the row when get_next_post() is called."""
    pass
