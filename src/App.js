import React from 'react';
import Timer from './components/Timer';

import './App.css';

const App = () => (
  <div className="App">
    <Timer workingDuration={10} breakDuration={8} />
  </div>
);

export default App;
