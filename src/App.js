import React from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar/Calendar';

function App() {
  const today = new Date();
  const calData = {
    availableDates: [
      { year: 2020, month: 1, day: 10},
      { year: 2020, month: 2, day: 1},
      { year: 2020, month: 2, day: 13},
      { year: 2020, month: 2, day: 15},
      { year: 2020, month: 2, day: 16},
      { year: 2020, month: 3, day: 1}
    ],
    startDate: {
      year: today.getUTCFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    }
  }

  return (
    <div>
      <Calendar data={calData}/>
    </div>
  );
}

export default App;
