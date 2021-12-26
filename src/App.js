import React from 'react';
import Timer from './components/Timer';

import './App.css';
import Header from './components/Header';

const App = () => (
  <div className="App">
    <Header />
    <Timer workingDuration={10} breakDuration={8} />
  </div>
);

export default App;
