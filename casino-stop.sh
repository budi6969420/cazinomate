#!/bin/bash

PID_FILE=".casino-pids"
LOG_FILE="casino.log"

# Stop Backend and Frontend
if [ -f "$PID_FILE" ]; then
    echo "Stopping Backend and Frontend..."
    while read pid; do
        if ps -p $pid > /dev/null 2>&1; then
            echo "Stopping process $pid..."
            kill $pid 2>/dev/null
            # Wait for process to terminate
            for i in {1..5}; do
                if ! ps -p $pid > /dev/null 2>&1; then
                    break
                fi
                sleep 1
            done
            # Force kill if still running
            if ps -p $pid > /dev/null 2>&1; then
                echo "Process $pid did not terminate gracefully, forcing..."
                kill -9 $pid 2>/dev/null
            fi
        fi
    done < "$PID_FILE"
    rm "$PID_FILE"
fi

# Stop Docker services
echo "Stopping Docker services..."
cd docker
docker compose down
cd ..

# Clean up ALL log files
echo "Cleaning up log files..."
# Remove the symlink if it exists
if [ -L "$LOG_FILE" ]; then
    rm "$LOG_FILE"
fi

# Remove all casino log files
rm -f casino_*.log

echo "All services stopped and logs cleaned up!" 