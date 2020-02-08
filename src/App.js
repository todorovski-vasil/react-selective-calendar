import React from 'react';
import logo from './logo.svg';
import './App.css';
import Day from './components/Calendar/Day/Day';

function App() {
  return (
    <div>
      <Day day="5" forbidden />
      <Day day="6" />
      <Day day="7" selected />
      <Day day="8" forbidden selected />
    </div>
  );
}

export default App;
