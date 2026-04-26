#!/bin/bash
# ──────────────────────────────────────────────────────
#  Pure Origin Rajshahi — FB Bot  (local keep-alive)
#  Restarts automatically if the bot crashes.
#
#  Usage:
#    chmod +x start.sh
#    ./start.sh            # foreground, logs to terminal
#    ./start.sh --bg       # background, logs to bot.log
# ──────────────────────────────────────────────────────
cd "$(dirname "$0")"
source venv/bin/activate

BACKGROUND=false
[[ "$1" == "--bg" ]] && BACKGROUND=true

run_bot() {
    while true; do
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting poller..."
        python poller.py
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] Bot stopped. Restarting in 5s..."
        sleep 5
    done
}

if $BACKGROUND; then
    run_bot >> bot.log 2>&1 &
    echo $! > bot.pid
    echo "Bot started in background. PID: $(cat bot.pid)"
    echo "Logs:  tail -f $(pwd)/bot.log"
    echo "Stop:  kill \$(cat $(pwd)/bot.pid)"
else
    echo "Press Ctrl+C to stop."
    run_bot
fi
