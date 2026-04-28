#!/bin/bash

set -e

echo "Starting services..."

docker-compose up --build -d

echo "Waiting for services to be healthy..."

sleep 5

BACKEND_HEALTH=$(curl -s http://localhost:4000/api/health 2>/dev/null || echo '{"status":"error"}')
FRONTEND_HEALTH=$(curl -s http://localhost:3000 2>/dev/null || echo "")

if echo "$BACKEND_HEALTH" | grep -q "ok"; then
    echo "Backend is healthy"
else
    echo "Backend may still be starting..."
fi

echo ""
echo "==================================="
echo "Services are running!"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:4000"
echo "  Redis:    localhost:6379"
echo "==================================="
echo ""
echo "To view logs: docker-compose logs -f"
echo "To stop:      docker-compose down"