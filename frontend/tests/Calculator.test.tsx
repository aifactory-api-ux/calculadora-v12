import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Calculator } from '../src/components/Calculator';

describe('Calculator', () => {
  it('renders correctly', () => {
    render(
      <Calculator
        operand1={0}
        operand2={0}
        setOperand1={() => {}}
        setOperand2={() => {}}
        operation="add"
        setOperation={() => {}}
        onCalculate={() => {}}
        loading={false}
      />
    );

    expect(screen.getByLabelText('Number 1')).toBeDefined();
    expect(screen.getByLabelText('Number 2')).toBeDefined();
    expect(screen.getByText('Calculate')).toBeDefined();
  });

  it('displays loading state', () => {
    render(
      <Calculator
        operand1={0}
        operand2={0}
        setOperand1={() => {}}
        setOperand2={() => {}}
        operation="add"
        setOperation={() => {}}
        onCalculate={() => {}}
        loading={true}
      />
    );

    expect(screen.getByText('Calculating...')).toBeDefined();
  });
});