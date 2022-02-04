/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React from 'react';
import * as workerTimers from 'worker-timers';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import {
  Box, Flex, Heading, Text, IconButton, useBoolean,
} from '@chakra-ui/react';

import { PlayCircle, PauseCircle, RotateCcw } from 'react-feather';
import { usePageVisibility } from '../hooks/usePageVisibility';

const Timer = ({ workingDuration, breakDuration, setCompletedPomodoros }) => {
  // track playing/timer status
  const [playing, setPlaying] = useBoolean();
  const [isBreak, setIsBreak] = useBoolean();

  const [duration, setDuration] = React.useState(workingDuration);

  // track time remaining in timer
  const [timeRemaining, setTimeRemaining] = React.useState(0);

  const [key, setKey] = React.useState(0); // key to reset countdown timer

  // if timer status changes, set current duration
  React.useEffect(() => {
    setDuration(isBreak ? breakDuration : workingDuration);

    if (isBreak) setCompletedPomodoros((prevCount) => prevCount + 1);
  }, [isBreak]);

  // track whether app is visible (controls whether timer updates)
  const isVisible = usePageVisibility();

  // push notification to desktop
  const handleNotification = (title, body) => {
    const notif = new Notification(title, { body });
  };

  // this is required because Electron will not update time remaining if page is hidden
  React.useEffect(() => {
    let time = 0;

    const intervalId = workerTimers.setInterval(() => {
      // when page is not visible and timer is playing, track time in background
      if (!isVisible && playing) {
        time += 1;
        console.log(time);
      }

      if (time === timeRemaining - 300 && !isVisible && playing) {
        handleNotification('5 minutes remaining!');
      }

      if (time === timeRemaining && !isVisible && playing) {
        handleNotification('Timer completed!');
      }
    }, 1000);

    return () => {
      try {
        workerTimers.clearInterval(intervalId);
      } catch {
        // Ignore error, return statement is called sometimes before interval created
      }
    };
  }, [isVisible]);

  // use prop from timer to display remainingTime
  const renderTime = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60); // get minutes from remainingTime in seconds
    // eslint-disable-next-line prefer-template
    const seconds = ('0' + (remainingTime % 60)).slice(-2); // use .slice to add 0 before numbers less than 10 (ie. 1:9 -> 1:09)

    React.useEffect(() => {
      setTimeRemaining(remainingTime);
    }, [remainingTime]);

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
        {/* <IconButton pos="fixed" top="8" right="14" aria-label="Restart" bgColor="transparent" variant="unstyled" color="brand.200" icon={<RotateCcw />} _focus={{ outline: '0' }} /> */}
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
