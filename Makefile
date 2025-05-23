.PHONY: start stop clean logs start-local deploy-server

# Variables
TIMESTAMP := $(shell date +"%Y%m%d_%H%M%S")
LOG_FILE := casino_$(TIMESTAMP).log
CONTAINER_NAME := docker-keycloakdb_svr-1
KEYCLOAK_URL := http://localhost:9090

start-loading:
	@echo "Starting loading page..."
	@if [ ! -d loading-next/node_modules ] || [ ! -d loading-next/.next ]; then \
	  echo "Installing dependencies and building loading-next..."; \
	  cd loading-next && npm install && npm run build; \
	fi
	@cd loading-next && npm run dev > /dev/null 2>&1 &

# Local development (default)
start-local: start-loading
	@echo "Starting all services for local development..."
	@cd docker && docker compose up -d
	@echo "Waiting for services to start..."
	@sleep 30
	@echo "Starting backend..."
	@cd backend && ./gradlew bootRun > /dev/null 2>&1 &
	@echo "Waiting for backend to initialize..."
	@sleep 15
	@echo "Starting frontend in development mode..."
	@cd frontend && npm start > /dev/null 2>&1 &
	@echo "All services started successfully in development mode!"

# For backward compatibility
start: start-local

# Server deployment
deploy-server:
	@echo "Deploying application to server..."
	@echo "Installing and building loading page..."
	@cd loading-next && npm install && npm run build
	@echo "Building backend..."
	@cd backend && ./gradlew bootJar > /dev/null 2>&1 &
	@echo "Installing and building frontend..."
	@cd frontend && npm install && ng build --configuration production
	@echo "Server deployment complete!"

stop:
	@echo "Stopping Casino application..."
	@if [ -f casino.log ]; then \
		echo "Cleaning up logs..."; \
		rm -f casino_*.log casino.log; \
	fi
	@echo "Stopping Loading Page..."
	@lsof -ti:3000 | xargs kill -9 2>/dev/null || true
	@echo "Stopping Frontend..."
	@lsof -ti:4200 | xargs kill -9 2>/dev/null || true
	@echo "Stopping Backend..."
	@lsof -ti:8080 | xargs kill -9 2>/dev/null || true
	@echo "Stopping Docker services..."
	@cd docker && docker compose down
	@echo "All services stopped and logs cleaned up!"

clean: stop
	@echo "Cleaning up any remaining processes..."
	@ps aux | grep -E 'gradlew bootRun|npm start|next dev' | grep -v grep | awk '{print $$2}' | xargs -r kill -9 2>/dev/null || true
	@echo "Cleanup complete."

logs:
	@if [ -f casino.log ]; then \
		tail -f casino.log; \
	else \
		echo "No log file found. Start the application first."; \
	fi 