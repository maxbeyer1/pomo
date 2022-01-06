import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import {
  Box, Flex, Heading, Text, useBoolean,
} from '@chakra-ui/react';

import { PlayCircle, PauseCircle } from 'react-feather';

const Timer = ({ workingDuration, breakDuration, setCompletedPomodoros }) => {
  const [playing, setPlaying] = useBoolean();
  const [isBreak, setIsBreak] = useBoolean();

  const [duration, setDuration] = React.useState(workingDuration);

  // if timer status changes, set current duration
  React.useEffect(() => {
    setDuration(isBreak ? breakDuration : workingDuration);

    if (isBreak) setCompletedPomodoros((prevCount) => prevCount + 1);
  }, [isBreak]);

  // use prop from timer to display remainingTime
  const renderTime = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60); // get minutes from remainingTime in seconds
    // eslint-disable-next-line prefer-template
    const seconds = ('0' + (remainingTime % 60)).slice(-2); // use .slice to add 0 before numbers less than 10 (ie. 1:9 -> 1:09)

    let iconColor = '#FB8484';

    if (isBreak) {
      iconColor = '#323E7D';
    } else {
      iconColor = '#FB8484';
    }

    return (
      <Flex justifyContent="center">
        <Box pos="fixed" top="5" textAlign="center">
          <Heading fontSize="36pt" color="#bbbcc0">{minutes}:{seconds}</Heading>
        </Box>
        <Box pos="fixed" top="75px" fontSize="md" color="#cacbcf">
          {isBreak ? (
            <Text>BREAK</Text>
          ) : (
            <Text>WORKING</Text>
          )}
        </Box>
        <Box _hover={{ cursor: 'pointer' }}>
          {playing ? (
            <PauseCircle size={60} color={iconColor} onClick={setPlaying.toggle} />
          ) : (
            <PlayCircle size={60} color={iconColor} onClick={setPlaying.toggle} />
          )}
        </Box>
      </Flex>
    );
  };

  // change colors based on timer status
  let colors = [['#FB8484', 1]];

  if (isBreak) {
    colors = [['#323E7D', 1]];
  }

  const [key, setKey] = React.useState(0); // key to reset countdown timer

  return (
    <Flex justifyContent="center" pt="110px">
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
    </Flex>
  );
};

export default Timer;
