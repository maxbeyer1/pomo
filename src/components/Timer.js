import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import { useBoolean } from '@chakra-ui/react';

import { PlayCircle, PauseCircle } from 'react-feather';

const Timer = ({ workingDuration, breakDuration }) => {
  const [playing, setPlaying] = useBoolean();
  const [isBreak, setIsBreak] = useBoolean();

  const [duration, setDuration] = React.useState(workingDuration);

  // if timer status changes, set current duration
  React.useEffect(() => {
    setDuration(isBreak ? breakDuration : workingDuration);
  }, [isBreak]);

  // use prop from timer to display remainingTime
  const renderTime = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60); // get minutes from remainingTime in seconds
    // eslint-disable-next-line prefer-template
    const seconds = ('0' + (remainingTime % 60)).slice(-2); // use .slice to add 0 before numbers less than 10 (ie. 1:9 -> 1:09)

    let className = 'playpause-wrapper';

    // apply color filter if on break
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
          {playing ? (
            <PauseCircle size={60} color="#FB8484" onClick={setPlaying.toggle} />
          ) : (
            <PlayCircle size={60} color="#FB8484" onClick={setPlaying.toggle} />
          )}
        </div>
      </div>
    );
  };

  // change colors based on timer status
  let colors = [['#FB8484', 1]];

  if (isBreak) {
    colors = [['#323E7D', 1]];
  }

  const [key, setKey] = React.useState(0); // key to reset countdown timer

  return (
    <div className="timer-wrapper">
      <CountdownCircleTimer
        key={key}
        onComplete={() => {
          setIsBreak.toggle();
          setPlaying.toggle();
          setKey((prevKey) => prevKey + 1); // reset timer countdown with new duration
        }}
        isPlaying={playing}
        duration={duration}
        strokeWidth={10}
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
