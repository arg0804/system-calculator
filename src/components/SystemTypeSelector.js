import React from 'react';
import '../styles/SystemTypeSelector.css';

const SystemTypeSelector = ({ systemType, setSystemType }) => {
  const handleSelect = (e) => setSystemType(e.target.value);

  return (
    <div className="system-type-selector">
      <label htmlFor="system-type">System</label>
      <select id="system-type" value={systemType} onChange={handleSelect}>
        <option value="2/3">2 from 3</option>
        <option value="3/4">3 from 4</option>
        <option value="4/5">4 from 5</option>
      </select>
    </div>
  );
};

export default SystemTypeSelector;