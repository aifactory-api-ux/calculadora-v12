# Coverage Report — backend
Fecha: 2026-04-28  |  Stack: TypeScript/Express  |  Directorio: backend

## Resumen
| Métrica | Valor |
|---------|-------|
| Estado | 🟡 PARCIAL |
| Cobertura total | 100% (solo logger.ts) |
| Tests ejecutados | 3 |
| Tests pasados | 2 |
| Tests fallidos | 1 |

## Cobertura por archivo
| Archivo | Cobertura |
|---------|-----------|
| src/config/logger.ts | 100% |
| src/utils/validation.ts | ❌ ERROR TS |
| src/controllers/calculateController.ts | ❌ ERROR TS |
| src/controllers/logsController.ts | ❌ ERROR TS |
| src/services/cacheService.ts | ❌ ERROR TS |
| src/services/logService.ts | ❌ ERROR TS |
| src/routes/*.ts | ❌ ERROR TS |

## Tests fallidos / errores
- `validation.test.ts` — ERROR TS2339: Property 'error' does not exist (type narrowing issue en tests)
- `calculate.test.ts` — ERROR TS2352: Conversion error en validation.ts:26
- `logs.test.ts` — ERROR TS2352: Conversion error en validation.ts:26
- `logger.test.ts` — Expected "info", Received "INFO" (case sensitivity)

## Output completo
```
FAIL tests/validation.test.ts
  ● Test suite failed to run

    tests/validation.test.ts:26:21 - error TS2339: Property 'error' does not exist on type '{ valid: true; data: CalculationRequest; } | { valid: false; error: string; }'.

FAIL tests/calculate.test.ts
  ● Test suite failed to run

    src/utils/validation.ts:26:31 - error TS2352: Conversion of type 'Record<string, unknown>' to type 'CalculationRequest' may be a mistake...

FAIL tests/logs.test.ts
  ● Test suite failed to run

    src/utils/validation.ts:26:31 - error TS2352: Conversion error...

FAIL tests/logger.test.ts
  Logger
    ✓ should have a winston logger instance (1 ms)
    ✕ should have info level configured (5 ms)

    Expected: "info"
    Received: "INFO"

PASS tests/redis.test.ts
  Redis Client
    ✓ should create a redis client (6 ms)

Test Suites: 4 failed, 1 passed, 5 total
Tests:       1 failed, 2 passed, 3 total
```
