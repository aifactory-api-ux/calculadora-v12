import { CalculationLog } from '../models/CalculationLog';

const logs: CalculationLog[] = [];

export function logCalculation(log: CalculationLog): void {
  logs.push(log);
}

export function getLogs(): CalculationLog[] {
  return [...logs];
}