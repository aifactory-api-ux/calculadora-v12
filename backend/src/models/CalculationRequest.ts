export interface CalculationRequest {
  operand1: number;
  operand2: number;
  operation: 'add' | 'subtract';
}