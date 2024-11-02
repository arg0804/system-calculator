import React from 'react';
import '../styles/OddsInput.css';

const OddsInput = ({ odds, setOdds, statuses, setStatuses }) => {
  const handleChange = (index, value) => {
    const updatedOdds = [...odds];
    updatedOdds[index] = parseFloat(value);
    setOdds(updatedOdds);
  };

  const handleStatusChange = (index, status) => {
    const updatedStatuses = [...statuses];
    updatedStatuses[index] = status;
    setStatuses(updatedStatuses);
  };

  return (
    <div className="odds-input">
      <div className="odds-header">
        <div className="odd-input-header">Odds</div>
        <div className="status-header">Correct</div>
        <div className="status-header incorrect">Incorrect</div>
        <div className="status-header void">Void</div>
      </div>
      {odds.map((odd, index) => (
        <div key={index} className="odd-input-row">
          <input
            type="number"
            value={odd}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`Odd ${index + 1}`}
            min="0"
          />
          <div className="status-buttons">
            <label>
              <input
                type="radio"
                name={`status-${index}`}
                className="status-correct"
                onChange={() => handleStatusChange(index, 'correct')}
              />
            </label>
            <label>
              <input
                type="radio"
                name={`status-${index}`}
                className="status-incorrect"
                onChange={() => handleStatusChange(index, 'incorrect')}
              />
            </label>
            <label>
              <input
                type="radio"
                name={`status-${index}`}
                className="status-void"
                onChange={() => handleStatusChange(index, 'void')}
              />
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OddsInput;