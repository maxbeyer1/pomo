import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import Pause from './Pause';
import Play from './Play';

const Timer = ({ workingDuration, breakDuration }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isBreak, setIsBreak] = React.useState(false);

  const [duration, setDuration] = React.useState(workingDuration); // start with working duration
  const [key, setKey] = React.useState(0); // key to reset countdown timer

  // if timer status changes, set current duration
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

  // switch timer status after each completion
  const handleTimerSwitch = () => {
    if (isBreak) {
      setIsBreak(false);
    }

    if (!isBreak) {
      setIsBreak(true);
    }

    setIsPlaying(false);
  };

  // use prop from timer to display remainingTime
  const renderTime = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60); // get minutes from remainingTime in seconds
    // eslint-disable-next-line prefer-template
    const seconds = ('0' + (remainingTime % 60)).slice(-2); // use .slice to add 0 before numbers less than 10 (ie. 1:9 -> 1:09)

    let className = 'playpause-wrapper';

    if (isBreak) className += ' filter-break';

    return (
      <div className="timer">
        <div className="remaining-time">
          <div className="value">{minutes}:{seconds}</div>
        </div>
        <div className="timer-label">
          {isBreak ? (
            <p>BREAK</p>
          ) : (
            <p>WORKING</p>
          )}
        </div>
        <div className={className}>
          {isPlaying ? (
            <Pause onPlayerClick={stopTimer} />
          ) : (
            <Play onPlayerClick={startTimer} />
          )}
        </div>
      </div>
    );
  };

  let colors = [['#FB8484', 1]];

  if (isBreak) {
    colors = [['#222B56', 1]];
  }

  return (
    <div className="timer-wrapper">
      <CountdownCircleTimer
        key={key}
        onComplete={() => {
          handleTimerSwitch();
          setKey((prevKey) => prevKey + 1); // reset timer countdown with new duration
        }}
        isPlaying={isPlaying}
        duration={duration}
        strokeWidth={8}
        size={250}
        trailColor="#D2D3D7"
        colors={colors}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};

export default Timer;
