import { OperationButton } from './OperationButton';

interface CalculatorProps {
  operand1: number;
  operand2: number;
  setOperand1: (value: number) => void;
  setOperand2: (value: number) => void;
  operation: 'add' | 'subtract';
  setOperation: (op: 'add' | 'subtract') => void;
  onCalculate: () => void;
  loading: boolean;
}

export function Calculator({ operand1, operand2, setOperand1, setOperand2, operation, setOperation, onCalculate, loading }: CalculatorProps) {
  return (
    <div className="calculator">
      <div className="input-group">
        <label htmlFor="operand1">Number 1</label>
        <input
          id="operand1"
          type="number"
          value={operand1}
          onChange={(e) => setOperand1(parseFloat(e.target.value) || 0)}
          disabled={loading}
        />
      </div>

      <div className="operation-buttons">
        <OperationButton
          operation="add"
          selected={operation === 'add'}
          onClick={() => setOperation('add')}
        />
        <OperationButton
          operation="subtract"
          selected={operation === 'subtract'}
          onClick={() => setOperation('subtract')}
        />
      </div>

      <div className="input-group">
        <label htmlFor="operand2">Number 2</label>
        <input
          id="operand2"
          type="number"
          value={operand2}
          onChange={(e) => setOperand2(parseFloat(e.target.value) || 0)}
          disabled={loading}
        />
      </div>

      <button onClick={onCalculate} disabled={loading} className="calculate-btn">
        {loading ? 'Calculating...' : 'Calculate'}
      </button>
    </div>
  );
}