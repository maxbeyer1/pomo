import { CountdownCircleTimer } from "react-countdown-circle-timer";

import Timer from "./components/Timer";

import './App.css';


const renderTime = ({ remainingTime }) => {
  return (
    <div className="timer">
      <div className="value">{remainingTime}</div>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <Timer />
    </div>
  );
}

export default App;
