# SPEC.md

## 1. TECHNOLOGY STACK

- **Node.js**: v20.x
- **Express.js**: v4.18.x
- **React**: v18.x
- **TypeScript**: v5.x (for both backend and frontend)
- **Docker**: 24.x
- **Docker Compose**: v2.x
- **Redis**: 7.x (for backend cache)
- **dotenv**: v16.x (backend env var management)
- **winston**: v3.x (backend logging)
- **axios**: v1.x (frontend HTTP client)
- **Jest**: v29.x (unit testing)
- **ESLint**: v8.x (linting)
- **Prettier**: v3.x (code formatting)
- **CORS**: v2.x (backend CORS middleware)
- **body-parser**: v1.20.x (backend JSON parsing)
- **concurrently**: v8.x (dev scripts)

## 2. DATA CONTRACTS

### Backend (TypeScript interfaces)

```typescript
// backend/src/models/CalculationRequest.ts
export interface CalculationRequest {
  operand1: number;
  operand2: number;
  operation: 'add' | 'subtract';
}

// backend/src/models/CalculationResponse.ts
export interface CalculationResponse {
  result: number;
  cached: boolean;
}

// backend/src/models/CalculationLog.ts
export interface CalculationLog {
  timestamp: string; // ISO 8601
  operand1: number;
  operand2: number;
  operation: 'add' | 'subtract';
  result: number;
  cached: boolean;
}
```

### Frontend (TypeScript interfaces)

```typescript
// frontend/src/types/calculation.ts
export interface CalculationRequest {
  operand1: number;
  operand2: number;
  operation: 'add' | 'subtract';
}

export interface CalculationResponse {
  result: number;
  cached: boolean;
}
```

## 3. API ENDPOINTS

### POST /api/calculate

- **Method**: POST
- **Path**: `/api/calculate`
- **Request Body Schema**: `CalculationRequest`
  ```json
  {
    "operand1": 5,
    "operand2": 3,
    "operation": "add"
  }
  ```
- **Response Schema**: `CalculationResponse`
  ```json
  {
    "result": 8,
    "cached": false
  }
  ```
- **Status Codes**:
  - 200: Calculation successful
  - 400: Invalid input (missing/invalid fields, invalid operation)
  - 500: Internal server error

### GET /api/health

- **Method**: GET
- **Path**: `/api/health`
- **Request Body**: None
- **Response Schema**:
  ```json
  {
    "status": "ok"
  }
  ```
- **Status Codes**:
  - 200: Service healthy

### GET /api/logs

- **Method**: GET
- **Path**: `/api/logs`
- **Request Body**: None
- **Response Schema**: Array of `CalculationLog`
  ```json
  [
    {
      "timestamp": "2024-06-01T12:00:00.000Z",
      "operand1": 5,
      "operand2": 3,
      "operation": "add",
      "result": 8,
      "cached": false
    }
  ]
  ```
- **Status Codes**:
  - 200: Logs returned

## 4. FILE STRUCTURE

```
calculadora-v12/
├── docker-compose.yml                # Multi-service orchestration (backend, frontend, redis)
├── .env.example                     # Template for environment variables
├── .gitignore                       # Git ignore rules
├── README.md                        # Project documentation
├── run.sh                           # Root startup script
├── backend/
│   ├── Dockerfile                   # Backend service Dockerfile (EXPOSE 4000)
│   ├── package.json                 # Backend dependencies and scripts
│   ├── tsconfig.json                # Backend TypeScript config
│   ├── src/
│   │   ├── index.ts                 # Backend entry point (Express app)
│   │   ├── app.ts                   # Express app instance
│   │   ├── routes/
│   │   │   └── calculate.ts         # /api/calculate route handler
│   │   │   └── health.ts            # /api/health route handler
│   │   │   └── logs.ts              # /api/logs route handler
│   │   ├── controllers/
│   │   │   └── calculateController.ts # Calculation logic, cache, logging
│   │   │   └── logsController.ts      # Logs retrieval logic
│   │   ├── models/
│   │   │   └── CalculationRequest.ts # CalculationRequest interface
│   │   │   └── CalculationResponse.ts # CalculationResponse interface
│   │   │   └── CalculationLog.ts     # CalculationLog interface
│   │   ├── services/
│   │   │   └── cacheService.ts       # Redis cache logic
│   │   │   └── logService.ts         # Logging logic (winston)
│   │   ├── utils/
│   │   │   └── validation.ts         # Input validation helpers
│   │   └── config/
│   │       └── redis.ts              # Redis client config
│   │       └── logger.ts             # Winston logger config
│   ├── tests/
│   │   └── calculate.test.ts         # Calculation endpoint tests
│   │   └── logs.test.ts              # Logs endpoint tests
│   └── .env.example                  # Backend-specific env vars template
├── frontend/
│   ├── Dockerfile                   # Frontend service Dockerfile (EXPOSE 3000)
│   ├── package.json                 # Frontend dependencies and scripts
│   ├── tsconfig.json                # Frontend TypeScript config
│   ├── public/
│   │   └── index.html               # HTML entry point (script src="/src/main.tsx")
│   ├── src/
│   │   ├── main.tsx                 # React entry point
│   │   ├── App.tsx                  # Main app component
│   │   ├── components/
│   │   │   └── Calculator.tsx       # Calculator UI component
│   │   │   └── ResultDisplay.tsx    # Result display component
│   │   │   └── OperationButton.tsx  # Button for add/subtract
│   │   ├── hooks/
│   │   │   └── useCalculator.ts     # React hook for calculation state/logic
│   │   ├── types/
│   │   │   └── calculation.ts       # CalculationRequest/Response interfaces
│   │   ├── utils/
│   │   │   └── api.ts               # Axios API client
│   │   └── styles/
│   │       └── main.css             # Main stylesheet
│   ├── tests/
│   │   └── Calculator.test.tsx      # Calculator component tests
│   │   └── useCalculator.test.ts    # Hook tests
│   └── .env.example                 # Frontend-specific env vars template
```

### PORT TABLE

| Service   | Listening Port | Path           |
|-----------|---------------|----------------|
| backend   | 4000          | backend/       |
| frontend  | 3000          | frontend/      |

### SHARED MODULES

_None. No shared code directory between backend and frontend._

## 5. ENVIRONMENT VARIABLES

### Root `.env.example`

```
# No root-level env vars
```

### backend/.env.example

```
PORT=4000
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=
LOG_LEVEL=info
CACHE_TTL_SECONDS=3600
```

- `PORT` (number): Port for backend Express server. Example: `4000`
- `REDIS_HOST` (string): Redis hostname. Example: `redis`
- `REDIS_PORT` (number): Redis port. Example: `6379`
- `REDIS_PASSWORD` (string): Redis password (empty if none). Example: ``
- `LOG_LEVEL` (string): Logging level for winston. Example: `info`
- `CACHE_TTL_SECONDS` (number): Cache time-to-live in seconds. Example: `3600`

### frontend/.env.example

```
VITE_API_BASE_URL=http://localhost:4000/api
```

- `VITE_API_BASE_URL` (string): Base URL for backend API. Example: `http://localhost:4000/api`

## 6. IMPORT CONTRACTS

### Backend

- `from src/models/CalculationRequest import CalculationRequest`
- `from src/models/CalculationResponse import CalculationResponse`
- `from src/models/CalculationLog import CalculationLog`
- `from src/controllers/calculateController import calculateHandler`
- `from src/controllers/logsController import getLogsHandler`
- `from src/services/cacheService import getCachedResult, setCachedResult`
- `from src/services/logService import logCalculation, getLogs`
- `from src/utils/validation import validateCalculationRequest`
- `from src/config/redis import redisClient`
- `from src/config/logger import logger`

### Frontend

- `import { CalculationRequest, CalculationResponse } from './types/calculation'`
- `import { useCalculator } from './hooks/useCalculator'`
- `import { Calculator } from './components/Calculator'`
- `import { ResultDisplay } from './components/ResultDisplay'`
- `import { OperationButton } from './components/OperationButton'`
- `import { api } from './utils/api'`

## 7. FRONTEND STATE & COMPONENT CONTRACTS

### React Hook

```typescript
useCalculator() → {
  operand1: number,
  operand2: number,
  setOperand1: (value: number) => void,
  setOperand2: (value: number) => void,
  operation: 'add' | 'subtract',
  setOperation: (op: 'add' | 'subtract') => void,
  result: number | null,
  cached: boolean | null,
  loading: boolean,
  error: string | null,
  calculate: () => Promise<void>
}
```

### Components

- **Calculator**  
  props:  
  ```typescript
  {
    operand1: number,
    operand2: number,
    setOperand1: (value: number) => void,
    setOperand2: (value: number) => void,
    operation: 'add' | 'subtract',
    setOperation: (op: 'add' | 'subtract') => void,
    onCalculate: () => void,
    loading: boolean
  }
  ```

- **ResultDisplay**  
  props:  
  ```typescript
  {
    result: number | null,
    cached: boolean | null,
    error: string | null
  }
  ```

- **OperationButton**  
  props:  
  ```typescript
  {
    operation: 'add' | 'subtract',
    selected: boolean,
    onClick: () => void
  }
  ```

## 8. FILE EXTENSION CONVENTION

- **Frontend files**: `.tsx` (all React components and hooks)
- **Backend files**: `.ts` (all TypeScript source files)
- **Project language**: TypeScript (strict mode enabled for both frontend and backend)
- **Frontend entry point**: `/src/main.tsx` (as referenced in `public/index.html` via `<script type="module" src="/src/main.tsx"></script>`)
- **No `.jsx` or `.js` files are permitted in the codebase. All code must use `.ts` or `.tsx` as appropriate.**