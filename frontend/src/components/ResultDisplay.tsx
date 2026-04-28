interface ResultDisplayProps {
  result: number | null;
  cached: boolean | null;
  error: string | null;
}

export function ResultDisplay({ result, cached, error }: ResultDisplayProps) {
  if (error) {
    return (
      <div className="result-display error">
        <span className="error-message">{error}</span>
      </div>
    );
  }

  if (result === null) {
    return (
      <div className="result-display">
        <span className="placeholder">Enter numbers and press Calculate</span>
      </div>
    );
  }

  return (
    <div className="result-display">
      <span className="result-value">Result: {result}</span>
      {cached !== null && (
        <span className={`cached-badge ${cached ? 'cached' : 'fresh'}`}>
          {cached ? 'Cached' : 'Fresh'}
        </span>
      )}
    </div>
  );
}