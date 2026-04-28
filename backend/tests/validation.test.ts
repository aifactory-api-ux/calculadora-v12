import { validateCalculationRequest } from '../src/utils/validation';

describe('Validation', () => {
  describe('validateCalculationRequest', () => {
    it('should accept a valid add request', () => {
      const result = validateCalculationRequest({ operand1: 5, operand2: 3, operation: 'add' });
      expect(result.valid).toBe(true);
      if (result.valid) {
        expect(result.data.operand1).toBe(5);
        expect(result.data.operand2).toBe(3);
        expect(result.data.operation).toBe('add');
      }
    });

    it('should accept a valid subtract request', () => {
      const result = validateCalculationRequest({ operand1: 10, operand2: 4, operation: 'subtract' });
      expect(result.valid).toBe(true);
      if (result.valid) {
        expect(result.data.operation).toBe('subtract');
      }
    });

    it('should reject null body', () => {
      const result = validateCalculationRequest(null);
      expect(result.valid).toBe(false);
      if (!result.valid) {
        expect(result.error).toBe('Request body is required');
      }
    });

    it('should reject undefined body', () => {
      const result = validateCalculationRequest(undefined);
      expect(result.valid).toBe(false);
      if (!result.valid) {
        expect(result.error).toBe('Request body is required');
      }
    });

    it('should reject non-object body', () => {
      const result = validateCalculationRequest('string');
      expect(result.valid).toBe(false);
      if (!result.valid) {
        expect(result.error).toBe('Request body must be an object');
      }
    });

    it('should reject missing operand1', () => {
      const result = validateCalculationRequest({ operand2: 3, operation: 'add' });
      expect(result.valid).toBe(false);
      if (!result.valid) {
        expect(result.error).toBe('operand1 must be a valid number');
      }
    });

    it('should reject NaN operand1', () => {
      const result = validateCalculationRequest({ operand1: NaN, operand2: 3, operation: 'add' });
      expect(result.valid).toBe(false);
      if (!result.valid) {
        expect(result.error).toBe('operand1 must be a valid number');
      }
    });

    it('should reject invalid operation', () => {
      const result = validateCalculationRequest({ operand1: 5, operand2: 3, operation: 'multiply' });
      expect(result.valid).toBe(false);
      if (!result.valid) {
        expect(result.error).toBe("operation must be 'add' or 'subtract'");
      }
    });

    it('should reject negative numbers', () => {
      const result = validateCalculationRequest({ operand1: -5, operand2: 3, operation: 'add' });
      expect(result.valid).toBe(true);
    });
  });
});