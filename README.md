# Calculadora v12

A full-stack calculator application with Node.js backend and React frontend.

## Architecture

- **Backend**: Node.js 20, Express.js, TypeScript, Redis for caching, Winston for logging
- **Frontend**: React 18, TypeScript, Vite
- **Infrastructure**: Docker Compose for orchestration

## Quick Start

```bash
./run.sh
```

This will build and start all services. The frontend will be available at http://localhost:3000

## Services

| Service   | Port | Description              |
|-----------|------|--------------------------|
| Frontend  | 3000 | React UI                 |
| Backend   | 4000 | REST API                 |
| Redis     | 6379 | Cache storage            |

## API Endpoints

- `POST /api/calculate` - Perform calculation
- `GET /api/health` - Health check
- `GET /api/logs` - View calculation logs

## Development

Backend:
```bash
cd backend
npm install
npm run dev
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```