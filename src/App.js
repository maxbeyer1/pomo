import React from 'react';
import Timer from './components/Timer';

import './App.css';
import Header from './components/Header';
import Pomodoros from './components/Pomodoros';

const App = () => (
  <div className="App">
    <Header />
    <Timer workingDuration={10} breakDuration={8} />
    <Pomodoros />
  </div>
);

export default App;
