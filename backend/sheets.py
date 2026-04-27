"""
Google Sheets integration for Pure Origin Rajshahi auto-posts.
Reads next post from row 2 of the sheet, then deletes it after posting.

Sheet format (row 1 = header, never touched):
  Column A: Post (text)
  Column B: Image (direct image URL)
"""
import json
import os
import logging
import gspread
from google.oauth2.service_account import Credentials

logger = logging.getLogger(__name__)

SHEET_ID = "17RP6sMcPAJFNZxViG-zMRXpyWWUb5hincBWVV11CAC8"
SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]


def _get_sheet():
    creds_json = os.getenv("GOOGLE_CREDENTIALS_JSON")
    if not creds_json:
        raise RuntimeError("GOOGLE_CREDENTIALS_JSON env var not set")
    creds = Credentials.from_service_account_info(json.loads(creds_json), scopes=SCOPES)
    gc = gspread.authorize(creds)
    return gc.open_by_key(SHEET_ID).sheet1


def get_next_post():
    """Returns (post_text, image_url) from row 2, or (None, None) if sheet is empty."""
    try:
        sheet = _get_sheet()
        rows = sheet.get_all_values()
        if len(rows) < 2:
            logger.info("Sheet empty — no scheduled post.")
            return None, None
        row = rows[1]  # row index 1 = spreadsheet row 2
        post_text = row[0].strip() if len(row) > 0 else ""
        image_url = row[1].strip() if len(row) > 1 else ""
        return post_text or None, image_url or None
    except Exception as e:
        logger.error("Sheet read failed: %s", e)
        return None, None


def delete_posted_row():
    """Delete row 2 after it has been posted."""
    try:
        sheet = _get_sheet()
        sheet.delete_rows(2)
        logger.info("Deleted posted row from sheet.")
    except Exception as e:
        logger.error("Sheet row delete failed: %s", e)
