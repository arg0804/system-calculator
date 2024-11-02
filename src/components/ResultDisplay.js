import React from 'react';
import '../styles/ResultDisplay.css';

const ResultDisplay = ({ results, isCalculated }) => {
  return (
    <div className="result-display">
      <h2>Results</h2>
      {isCalculated && results.length > 0 ? (
        <table className="result-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Combination</th>
              <th>Payout (€)</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{`Combination ${index + 1}`}</td>
                <td>€{result.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results to display.</p>
      )}
    </div>
  );
};

export default ResultDisplay;