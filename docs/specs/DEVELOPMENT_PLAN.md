# DEVELOPMENT PLAN: calculadora-v12

## 1. ARCHITECTURE OVERVIEW

**Components:**
- **Backend (Node.js 20, Express.js, TypeScript):**
  - Exposes REST API: `/api/calculate`, `/api/health`, `/api/logs`
  - Uses Redis (cache), Winston (logging), dotenv (env), CORS, body-parser
  - Strict TypeScript interfaces for all data contracts
  - Input validation, structured logging, error handling, healthcheck
- **Frontend (React 18, TypeScript):**
  - Minimalist calculator UI: two numeric fields, two operation buttons (+, -), result/error area
  - Responsive design (desktop/mobile)
  - Uses Axios for API calls, custom hook for state/logic, strict typing
  - No authentication, no advanced features, no history
- **Infrastructure:**
  - Docker Compose: orchestrates backend, frontend, Redis
  - Healthchecks, depends_on, .env.example, run.sh for zero-manual setup
  - README, .gitignore, .dockerignore, architecture docs

**Folder Structure (per SPEC.md):**
```
calculadora-v12/
├── docker-compose.yml
├── .env.example
├── .gitignore
├── README.md
├── run.sh
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── index.ts
│   │   ├── app.ts
│   │   ├── routes/
│   │   │   └── calculate.ts
│   │   │   └── health.ts
│   │   │   └── logs.ts
│   │   ├── controllers/
│   │   │   └── calculateController.ts
│   │   │   └── logsController.ts
│   │   ├── models/
│   │   │   └── CalculationRequest.ts
│   │   │   └── CalculationResponse.ts
│   │   │   └── CalculationLog.ts
│   │   ├── services/
│   │   │   └── cacheService.ts
│   │   │   └── logService.ts
│   │   ├── utils/
│   │   │   └── validation.ts
│   │   └── config/
│   │       └── redis.ts
│   │       └── logger.ts
│   ├── tests/
│   │   └── calculate.test.ts
│   │   └── logs.test.ts
│   └── .env.example
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   └── Calculator.tsx
│   │   │   └── ResultDisplay.tsx
│   │   │   └── OperationButton.tsx
│   │   ├── hooks/
│   │   │   └── useCalculator.ts
│   │   ├── types/
│   │   │   └── calculation.ts
│   │   ├── utils/
│   │   │   └── api.ts
│   │   └── styles/
│   │       └── main.css
│   ├── tests/
│   │   └── Calculator.test.tsx
│   │   └── useCalculator.test.ts
│   └── .env.example
```

**APIs:**
- `POST /api/calculate` — body: CalculationRequest, response: CalculationResponse
- `GET /api/health` — response: `{status: "ok"}`
- `GET /api/logs` — response: CalculationLog[]

**Data Contracts:** (see SPEC.md §2)

**Frontend State & Component Contracts:** (see SPEC.md §7)

## 2. ACCEPTANCE CRITERIA

1. User can enter two numbers, select '+' or '-', and see the result (rounded to two decimals) instantly, with correct validation and error messages.
2. Backend API responds to `/api/calculate` with correct result and cache status, validates input, and logs each operation.
3. Application is fully containerized; `./run.sh` brings up all services, healthchecks pass, and the frontend is accessible at `http://localhost:3000` with all features working.

---

## TEAM SCOPE (MANDATORY — PARSED BY THE PIPELINE)
Every executable item MUST include exactly one line at the end of the item block (after Validation):
**Role:** <role_id> (<category>)

---

## 3. EXECUTABLE ITEMS

---

### ITEM 1: Foundation — data contracts, config, validation, logging, cache client
**Goal:** Create all shared backend and frontend TypeScript interfaces, backend config, validation, logger, and Redis client modules required by other items.
**Files to create:**
- backend/src/models/CalculationRequest.ts
- backend/src/models/CalculationResponse.ts
- backend/src/models/CalculationLog.ts
- backend/src/utils/validation.ts
- backend/src/config/redis.ts
- backend/src/config/logger.ts
- frontend/src/types/calculation.ts
**Tests required:**
- backend/tests/validation.test.ts: tests for input validation (valid/invalid CalculationRequest)
- backend/tests/logger.test.ts: tests logger config (log level, format)
- backend/tests/redis.test.ts: tests Redis client connection (mocked)
**Dependencies:** None
**Validation:** 
- Run backend/tests/validation.test.ts to verify validation logic.
- Import CalculationRequest/CalculationResponse in both backend and frontend modules.
- Start backend with missing env vars: process must exit with error.
**Role:** role-tl (technical_lead)

---

### ITEM 2: Backend — Express app, calculation, health, logs endpoints, cache, logging
**Goal:** Implement backend Express app with all endpoints, controllers, services, and tests as per SPEC.md.
**Files to create:**
- backend/src/index.ts
- backend/src/app.ts
- backend/src/routes/calculate.ts
- backend/src/routes/health.ts
- backend/src/routes/logs.ts
- backend/src/controllers/calculateController.ts
- backend/src/controllers/logsController.ts
- backend/src/services/cacheService.ts
- backend/src/services/logService.ts
- backend/package.json
- backend/tsconfig.json
- backend/Dockerfile
- backend/tests/calculate.test.ts
- backend/tests/logs.test.ts
- backend/.env.example
**Dependencies:** Item 1
**Validation:** 
- `npm run test` in backend: all tests pass.
- `docker build .` in backend: image builds, runs, and exposes port 4000.
- API endpoints respond as per SPEC.md (manual or automated test).
**Role:** role-be (backend_developer)

---

### ITEM 3: Frontend — React app, calculator UI, state hook, API client, styles, tests
**Goal:** Implement frontend React app with calculator UI, state management hook, API integration, responsive styles, and tests as per SPEC.md.
**Files to create:**
- frontend/src/main.tsx
- frontend/src/App.tsx
- frontend/src/components/Calculator.tsx
- frontend/src/components/ResultDisplay.tsx
- frontend/src/components/OperationButton.tsx
- frontend/src/hooks/useCalculator.ts
- frontend/src/types/calculation.ts
- frontend/src/utils/api.ts
- frontend/src/styles/main.css
- frontend/public/index.html
- frontend/package.json
- frontend/tsconfig.json
- frontend/Dockerfile
- frontend/tests/Calculator.test.tsx
- frontend/tests/useCalculator.test.ts
- frontend/.env.example
**Dependencies:** Item 1
**Validation:** 
- `npm run test` in frontend: all tests pass.
- `docker build .` in frontend: image builds, runs, and exposes port 3000.
- UI works in browser: user can calculate, see errors, and UI is responsive.
**Role:** role-fe (frontend_developer)

---

### ITEM 4: Infrastructure & Deployment — Docker Compose, orchestration, run script, docs
**Goal:** Provide complete orchestration and documentation for local development and deployment.
**Files to create:**
- docker-compose.yml
- .env.example
- .gitignore
- .dockerignore
- run.sh
- README.md
- docs/architecture.md
**Dependencies:** Items 1, 2, 3
**Validation:** 
- `./run.sh` builds and starts all services, waits for health, prints access URL.
- Visiting `http://localhost:3000` shows working calculator; backend API and Redis are healthy.
- All environment variables are documented in .env.example.
**Role:** role-devops (devops_support)

---