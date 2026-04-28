import { Calculator } from './components/Calculator';
import { ResultDisplay } from './components/ResultDisplay';
import { useCalculator } from './hooks/useCalculator';

export function App() {
  const {
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
  } = useCalculator();

  return (
    <div className="app">
      <h1>Calculator</h1>
      <Calculator
        operand1={operand1}
        operand2={operand2}
        setOperand1={setOperand1}
        setOperand2={setOperand2}
        operation={operation}
        setOperation={setOperation}
        onCalculate={calculate}
        loading={loading}
      />
      <ResultDisplay result={result} cached={cached} error={error} />
    </div>
  );
}