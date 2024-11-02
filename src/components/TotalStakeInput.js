import React from 'react';
import '../styles/TotalStakeInput.css';

const TotalStakeInput = ({ stake, setStake }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    if (value === '' || !isNaN(value)) {
      setStake(value === '' ? '' : parseFloat(value));
    }
  };

  return (
    <div className="total-stake-input">
      <label htmlFor="total-stake">Total Stake</label>
      <input
        type="number"
        id="total-stake"
        value={stake !== '' ? stake : ''}
        onChange={handleChange}
        placeholder="Enter total stake"
        min="0"
      />
      <span className="currency-label">EUR</span>
    </div>
  );
};

export default TotalStakeInput;