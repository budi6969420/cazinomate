# Casino Application

This is a casino application with a Spring Boot backend and React frontend.

## Prerequisites

- Docker and Docker Compose
- Java 17 or higher
- Node.js and npm
- Make

## Available Make Commands

### Start the Application
```bash
make start
```
This command will:
- Clean up any existing processes and logs
- Start the Docker services
- Wait for the Keycloak database to be healthy
- Start the Spring Boot backend
- Start the React frontend
- Create a new timestamped log file

### View Logs
```bash
make logs
```
Shows the live application logs. The logs are written to a timestamped file (e.g., `casino_20240315_123456.log`) and symlinked to `casino.log` for easy access.

### Stop the Application
```bash
make stop
```
This will:
- Stop all running services
- Clean up all log files
- Stop Docker containers

### Clean Everything
```bash
make clean
```
This is a more thorough cleanup that:
- Stops all services (calls `make stop`)
- Kills any remaining backend or frontend processes
- Removes all log files

## Log Files

- Log files are created with timestamps (e.g., `casino_20240315_123456.log`)
- The latest log is always available at `casino.log`
- Logs are automatically cleaned up when stopping the application
- You can view live logs using `make logs`

## Development

The application consists of:
- Backend: Spring Boot application in the `backend` directory
- Frontend: React application in the `frontend` directory
- Docker services: Configuration in the `docker` directory

## Troubleshooting

If you encounter any issues:
1. Run `make clean` to ensure a clean state
2. Check the logs using `make logs`
3. Ensure all prerequisites are installed
4. Verify Docker services are running properly 