/* eslint-disable no-unused-vars */
import React from 'react';
import { useLocation } from 'react-router-dom';

import Timer from './components/Timer';
import Header from './components/Header';
import Pomodoros from './components/Pomodoros';

import './App.css';

const App = () => {
  const location = useLocation();

  // initialize default variables
  let {
    workingDuration, breakDuration, totalPomodoros, completedPomodoros,
  } = 0;

  if (!location.state) { // set default values if first load
    workingDuration = 1500;
    breakDuration = 300;
    totalPomodoros = 8;
    completedPomodoros = 5;
  } else {
    ({ // get values from settings page
      workingDuration,
      breakDuration,
      totalPomodoros,
      completedPomodoros,
    } = location.state.settings);
  }

  return (
    <div className="App">
      <Header />
      <Timer workingDuration={workingDuration} breakDuration={breakDuration} />
      <Pomodoros totalPomodoros={totalPomodoros} completedPomodoros={completedPomodoros} />
    </div>
  );
};

export default App;
