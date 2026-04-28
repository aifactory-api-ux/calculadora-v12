import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCalculator } from '../src/hooks/useCalculator';

describe('useCalculator', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useCalculator());

    expect(result.current.operand1).toBe(0);
    expect(result.current.operand2).toBe(0);
    expect(result.current.operation).toBe('add');
    expect(result.current.result).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('updates operand1', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.setOperand1(5);
    });

    expect(result.current.operand1).toBe(5);
  });

  it('updates operation', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => {
      result.current.setOperation('subtract');
    });

    expect(result.current.operation).toBe('subtract');
  });
});