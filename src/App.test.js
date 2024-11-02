import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('allows user to input total stake', () => {
    const stakeInput = screen.getByLabelText(/Total Stake/i);
    fireEvent.change(stakeInput, { target: { value: '100' } });
    
  });

  test('adds odds input fields based on system type selection', () => {
    const systemTypeSelect = screen.getByLabelText(/System/i);
    
    fireEvent.change(systemTypeSelect, { target: { value: '3/4' } });
    

  });

  test('displays an error message for invalid inputs', () => {
    const computeButton = screen.getByText(/Compute/i);
    fireEvent.click(computeButton);
  });

  test('computes and displays results', () => {
    const stakeInput = screen.getByLabelText(/Total Stake/i);
    const oddsInput1 = screen.getByPlaceholderText(/Odd 1/i);
    const oddsInput2 = screen.getByPlaceholderText(/Odd 2/i);
    
    fireEvent.change(stakeInput, { target: { value: '100' } });
    fireEvent.change(oddsInput1, { target: { value: '2' } });
    fireEvent.change(oddsInput2, { target: { value: '3' } });
    
    
    const computeButton = screen.getByText(/Compute/i);
    fireEvent.click(computeButton);
    
  });
});