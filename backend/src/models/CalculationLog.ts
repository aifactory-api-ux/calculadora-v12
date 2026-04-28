export interface CalculationLog {
  timestamp: string;
  operand1: number;
  operand2: number;
  operation: 'add' | 'subtract';
  result: number;
  cached: boolean;
}