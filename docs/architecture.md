# Architecture

## Overview

The calculadora-v12 application consists of three main services:

1. **Frontend** (React + Vite) - User interface running on port 3000
2. **Backend** (Express + TypeScript) - REST API running on port 4000
3. **Redis** - Cache layer running on port 6379

## Data Flow

1. User interacts with the React UI
2. Frontend sends POST request to `/api/calculate`
3. Backend validates input and checks Redis cache
4. If not cached, calculation is performed and result stored
5. Response returned with `result` and `cached` flag

## Key Components

### Backend

- `src/app.ts` - Express application setup
- `src/index.ts` - Entry point, starts server
- `src/routes/` - Route handlers for /calculate, /health, /logs
- `src/controllers/` - Request handlers with business logic
- `src/services/` - Cache and logging services
- `src/models/` - TypeScript interfaces
- `src/utils/` - Validation utilities
- `src/config/` - Redis and logger configuration

### Frontend

- `src/App.tsx` - Main application component
- `src/components/Calculator.tsx` - Input form component
- `src/components/ResultDisplay.tsx` - Result output component
- `src/components/OperationButton.tsx` - Operation toggle buttons
- `src/hooks/useCalculator.ts` - State management hook
- `src/utils/api.ts` - Axios API client

## Environment Variables

### Backend (backend/.env.example)

- `PORT` - Server port (default: 4000)
- `REDIS_HOST` - Redis hostname (default: redis)
- `REDIS_PORT` - Redis port (default: 6379)
- `LOG_LEVEL` - Logging level (default: info)
- `CACHE_TTL_SECONDS` - Cache TTL (default: 3600)

### Frontend (frontend/.env.example)

- `VITE_API_BASE_URL` - Backend API URL (default: http://localhost:4000/api)