/* eslint-disable no-unused-vars */
import React from 'react';
import { useLocation } from 'react-router-dom';

import Timer from './components/Timer';
import Header from './components/Header';
import Pomodoros from './components/Pomodoros';

const App = () => {
  const location = useLocation();

  // initialize default variables
  let {
    workingDuration, breakDuration, totalPomodoros,
  } = 0;

  if (!location.state) { // set default values if first load
    workingDuration = 1500;
    breakDuration = 300;
    totalPomodoros = 8;
  } else {
    ({ // get values from settings page
      workingDuration,
      breakDuration,
      totalPomodoros,
    } = location.state.settings);
  }

  const [completedPomodoros, setCompletedPomodoros] = React.useState(0);

  return (
    <div className="App">
      <Header />
      <Timer
        workingDuration={workingDuration}
        breakDuration={breakDuration}
        setCompletedPomodoros={setCompletedPomodoros}
      />
      <Pomodoros totalPomodoros={totalPomodoros} completedPomodoros={completedPomodoros} />
    </div>
  );
};

export default App;
