/* eslint-disable no-unused-vars */
import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const Timer = ({ workingDuration, breakDuration }) => {
  // create isPlaying state
  const [isPlaying, setIsPlaying] = React.useState(false);

  const [isBreak, setIsBreak] = React.useState(false);

  const [duration, setDuration] = React.useState(workingDuration);

  const [key, setKey] = React.useState(0);

  React.useEffect(() => {
    setDuration(isBreak ? breakDuration : workingDuration);
  }, [isBreak]);

  // functions for starting/stopping the timer
  const startTimer = () => {
    setIsPlaying(true);
  };

  const stopTimer = () => {
    setIsPlaying(false);
  };

  const handleTimerSwitch = () => {
    if (isBreak) {
      setIsBreak(false);
    }

    if (!isBreak) {
      setIsBreak(true);
    }
  };

  // use prop from timer to display remainingTime
  const renderTime = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60); // get minutes from remainingTime in seconds
    // eslint-disable-next-line prefer-template
    const seconds = ('0' + (remainingTime % 60)).slice(-2); // use .slice to add 0 before numbers less than 10 (ie. 1:9 -> 1:09)

    return (
      <div className="timer">
        <div className="remainingTime">
          <div className="value">{minutes}:{seconds}</div>
        </div>
        <div className="playpause-wrapper">
          {isPlaying ? (
            <button type="button" onClick={stopTimer}>
              Pause
            </button>
          ) : (
            <button type="button" onClick={startTimer}>
              Start
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="timer-wrapper">
      <CountdownCircleTimer
        key={key}
        onComplete={() => {
          handleTimerSwitch();
          setKey((prevKey) => prevKey + 1);
        }}
        isPlaying={isPlaying}
        duration={duration}
        colors={[
          ['#FB8484', 1],
        ]}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};

export default Timer;
