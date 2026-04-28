export interface CalculationRequest {
  operand1: number;
  operand2: number;
  operation: 'add' | 'subtract';
}

export interface CalculationResponse {
  result: number;
  cached: boolean;
}