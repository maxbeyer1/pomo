import React from 'react';

import Timer from './components/Timer';
import Header from './components/Header';
import Pomodoros from './components/Pomodoros';

const App = () => {
  const workingDuration = window.electron.store.get('workTime');
  const breakDuration = window.electron.store.get('breakTime');
  const totalPomodoros = window.electron.store.get('totalPomodoros');

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
