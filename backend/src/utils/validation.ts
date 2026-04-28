import { CalculationRequest } from '../models/CalculationRequest';

export function validateCalculationRequest(body: unknown): { valid: true; data: CalculationRequest } | { valid: false; error: string } {
  if (body === null || body === undefined) {
    return { valid: false, error: 'Request body is required' };
  }

  if (typeof body !== 'object') {
    return { valid: false, error: 'Request body must be an object' };
  }

  const obj = body as Record<string, unknown>;

  if (typeof obj.operand1 !== 'number' || Number.isNaN(obj.operand1)) {
    return { valid: false, error: 'operand1 must be a valid number' };
  }

  if (typeof obj.operand2 !== 'number' || Number.isNaN(obj.operand2)) {
    return { valid: false, error: 'operand2 must be a valid number' };
  }

  if (obj.operation !== 'add' && obj.operation !== 'subtract') {
    return { valid: false, error: "operation must be 'add' or 'subtract'" };
  }

  return { valid: true, data: obj as unknown as CalculationRequest };
}