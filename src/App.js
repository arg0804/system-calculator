import React, { useState, useEffect, useCallback } from 'react';
import OddsInput from './components/OddsInput';
import SystemTypeSelector from './components/SystemTypeSelector';
import TotalStakeInput from './components/TotalStakeInput';
import ResultDisplay from './components/ResultDisplay';
import { getCombinations } from './utils/combinations';
import { getAllCombinations } from './utils/combinations';
import './App.css';
import logo from './assets/logo.jpg';

const App = () => {
  const [odds, setOdds] = useState([0, 0, 0]);
  const [statuses, setStatuses] = useState(['incorrect', 'incorrect', 'incorrect']);
  const [systemType, setSystemType] = useState("2/3");
  const [stake, setStake] = useState(0);
  const [results, setResults] = useState([]);
  const [isCalculated, setIsCalculated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const adjustOddsArray = useCallback((systemType) => {
    const numSelections = parseInt(systemType.split("/")[1], 10);
    setOdds((prevOdds) => {
      if (prevOdds.length < numSelections) {
        return [...prevOdds, ...Array(numSelections - prevOdds.length).fill(0)];
      }
      return prevOdds.slice(0, numSelections);
    });
    setStatuses((prevStatuses) => {
      if (prevStatuses.length < numSelections) {
        return [...prevStatuses, ...Array(numSelections - prevStatuses.length).fill('incorrect')];
      }
      return prevStatuses.slice(0, numSelections);
    });
  }, []);

  useEffect(() => {
    adjustOddsArray(systemType);
  }, [systemType, adjustOddsArray]);

  const handleCalculate = () => {
    if (!validateInputs()) return;

    const validIndexes = odds.reduce((acc, _, idx) => {
        if (statuses[idx] === 'correct') return [...acc, idx];
        return acc;
    }, []);

    const combinations = getAllCombinations(validIndexes);
    const payouts = calculatePayout(combinations, odds, stake);
    const resultsData = combinations.map((combo, index) => {
        const comboOdds = combo.map(idx => odds[idx]);
        return { combination: combo, odds: comboOdds, winnings: payouts[index] };
    });

    setResults(resultsData);
    setIsCalculated(true);
};
  

  const validateInputs = () => {
    setErrorMessage('');
    if (odds.length === 0 || odds.some((odd) => odd <= 0)) {
      setErrorMessage('Please enter valid positive odds.');
      return false;
    }
    if (stake <= 0) {
      setErrorMessage('Please enter a valid stake amount.');
      return false;
    }
    if (statuses.every((status) => status !== 'correct')) {
      setErrorMessage('Please mark at least one event as "correct."');
      return false;
    }
    return true;
  };

  const calculatePayout = (combinations, odds, stake) => {
    return combinations.map((combo) => {
      const payout = combo.reduce((acc, idx) => acc * odds[idx], 1);
      return stake * payout;
    });
  };

  return (
    <div className="app">
      <header className="header">
        <img src={logo} alt="logo" className="logo" />
        <h1>System Bets Calculator</h1>
      </header>

      <div className="system-section">
        <SystemTypeSelector systemType={systemType} setSystemType={setSystemType} />
        <p className="system-info">
          A system {systemType} contains {getCombinations(odds, parseInt(systemType.split("/")[0])).length} combinations.
        </p>
      </div>

      <TotalStakeInput stake={stake} setStake={setStake} />

      <div className="odds-section">
        <OddsInput odds={odds} setOdds={setOdds} statuses={statuses} setStatuses={setStatuses} />
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button className="compute-button" onClick={handleCalculate}>Compute</button>

      <ResultDisplay results={results} isCalculated={isCalculated} />
    </div>
  );
};

export default App;