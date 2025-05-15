#!/bin/bash

# Create timestamp for logs
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="casino_${TIMESTAMP}.log"
PID_FILE=".casino-pids"

# Clean up any existing PID file
if [ -f "$PID_FILE" ]; then
    echo "Found existing PID file. Cleaning up..."
    while read pid; do
        if ps -p $pid > /dev/null 2>&1; then
            kill $pid 2>/dev/null
        fi
    done < "$PID_FILE"
    rm "$PID_FILE"
fi

# Create or clear the log file
> "$LOG_FILE"

# Start Docker services
echo "Starting Docker services..." | tee -a "$LOG_FILE"
cd docker
docker compose up -d
cd ..

# Warten bis Keycloak-DB healthy ist
CONTAINER_NAME="docker-keycloakdb_svr-1"
echo "Warte auf Container $CONTAINER_NAME (healthy)..." | tee -a "$LOG_FILE"
COUNT=0
until [ "$(docker inspect -f '{{.State.Health.Status}}' $CONTAINER_NAME 2>/dev/null)" = "healthy" ]; do
  COUNT=$((COUNT+1))
  if [ $COUNT -ge 20 ]; then
    echo "$CONTAINER_NAME ist nach 40 Sekunden nicht healthy. Abbruch." | tee -a "$LOG_FILE"
    exit 1
  fi
  sleep 2
done
echo "$CONTAINER_NAME ist healthy!" | tee -a "$LOG_FILE"

# Start Backend
echo "Starting Backend..." | tee -a "$LOG_FILE"
cd backend
./gradlew bootRun --stacktrace --info > "../$LOG_FILE" 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > "../$PID_FILE"
cd ..

# Start Frontend
echo "Starting Frontend..." | tee -a "$LOG_FILE"
cd frontend
npm start >> "../$LOG_FILE" 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID >> "../$PID_FILE"
cd ..

# Create symlink to latest log
ln -sf "$LOG_FILE" "casino.log"

echo "All services started! Check $LOG_FILE for output."
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID" 