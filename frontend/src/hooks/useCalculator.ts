import { useState } from 'react';
import axios from 'axios';
import { api } from '../utils/api';
import { CalculationRequest } from '../types/calculation';

export function useCalculator() {
  const [operand1, setOperand1] = useState<number>(0);
  const [operand2, setOperand2] = useState<number>(0);
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [result, setResult] = useState<number | null>(null);
  const [cached, setCached] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const calculate = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    setResult(null);
    setCached(null);

    try {
      const request: CalculationRequest = { operand1, operand2, operation };
      const response = await api.calculate(request);
      setResult(response.result);
      setCached(response.cached);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.error || 'Request failed');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    operand1,
    setOperand1,
    operand2,
    setOperand2,
    operation,
    setOperation,
    result,
    cached,
    loading,
    error,
    calculate,
  };
}