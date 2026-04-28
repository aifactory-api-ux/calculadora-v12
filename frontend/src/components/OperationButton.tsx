interface OperationButtonProps {
  operation: 'add' | 'subtract';
  selected: boolean;
  onClick: () => void;
}

export function OperationButton({ operation, selected, onClick }: OperationButtonProps) {
  const symbol = operation === 'add' ? '+' : '−';
  return (
    <button
      className={`operation-btn ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {symbol}
    </button>
  );
}