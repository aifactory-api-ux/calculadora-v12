# Coverage Report — frontend
Fecha: 2026-04-28  |  Stack: TypeScript/React/Vite  |  Directorio: frontend

## Resumen
| Métrica | Valor |
|---------|-------|
| Estado | 🔴 CRÍTICO |
| Cobertura total | N/A (tests no ejecutan) |
| Tests ejecutados | 0 |
| Tests pasados | 0 |
| Tests fallidos | 2 (failed suites) |

## Cobertura por archivo
N/A — los tests no pueden ejecutarse debido a error de setup.

## Tests fallidos / errores
- `Calculator.test.tsx` — ReferenceError: expect is not defined (setup.ts no importa expect de vitest)
- `useCalculator.test.ts` — ReferenceError: expect is not defined (mismo problema)
- Missing dependency `@vitest/coverage-v8` no permite cobertura

## Output completo
```
 RUN  v1.6.1 /workspace/.../frontend

 FAIL  tests/Calculator.test.tsx [ tests/Calculator.test.tsx ]
 FAIL  tests/useCalculator.test.ts [ tests/useCalculator.test.ts ]

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Suites 2 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 ReferenceError: expect is not defined
  ❯ node_modules/@testing-library/jest-dom/dist/index.mjs:9:1

  ❯ tests/setup.ts:1:1

 Test Files  2 failed (2)
      Tests  no tests
   Start at  13:31:39
   Duration  6.18s
```
