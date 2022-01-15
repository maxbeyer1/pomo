import React from 'react';
import { NavLink } from 'react-router-dom';

import {
  Box,
  Flex,
  Link,
  Heading,
  IconButton,
  Spacer,
  Divider,
  Center,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

import { Home } from 'react-feather';

const settingsReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_BREAK_TIME':
      return {
        ...state,
        breakDuration: action.payload * 60, // convert mins to seconds
      };
    case 'CHANGE_WORK_TIME':
      return {
        ...state,
        workingDuration: action.payload * 60,
      };
    case 'CHANGE_TOTAL_POMODOROS':
      return {
        ...state,
        totalPomodoros: action.payload,
      };
    default:
      throw new Error();
  }
};

const Settings = () => {
  const [settings, dispatchSettings] = React.useReducer(
    settingsReducer,
    { // default values
      breakDuration: 300, workingDuration: 1500, totalPomodoros: 8,
    },
  );

  // handle changes for settings inputs
  const handleWorkingChange = (event) => {
    dispatchSettings({
      type: 'CHANGE_WORK_TIME',
      payload: event,
    });

    // store.set('workTime', event);

    window.electron.store.set('workTime', parseInt(event, 10) * 60);
  };

  const handleBreakChange = (event) => {
    dispatchSettings({
      type: 'CHANGE_BREAK_TIME',
      payload: event,
    });

    // store.set('breakTime', event);

    window.electron.store.set('breakTime', parseInt(event, 10) * 60);
  };

  const handlePomodorosChange = (event) => {
    dispatchSettings({
      type: 'CHANGE_TOTAL_POMODOROS',
      payload: event,
    });

    // store.set('totalPomodoros', event);

    window.electron.store.set('totalPomodoros', parseInt(event, 10));
  };

  return (
    <Box>
      <Flex>
        <Box p="2" pl="5">
          <Heading color="gray.600">Settings</Heading>
        </Box>
        <Spacer />
        <Link p="2" as={NavLink} to="/" state={{ settings }}>
          <IconButton aria-label="Home" bgColor="transparent" color="brand.200" icon={<Home />} />
        </Link>
      </Flex>

      <Divider size="md" width="90%" border="none" borderBottomWidth="0" />

      <Center>
        <Heading p="2" color="gray.600" size="md" fontFamily="body" fontWeight="semibold">Times (min)</Heading>
      </Center>

      <Flex justify="space-evenly">
        <Box>
          <Heading pl="2" pb="1" color="gray.500" size="sm" fontFamily="body" fontWeight="semibold">Pomodoro</Heading>
          <NumberInput onChange={handleWorkingChange} variant="filled" color="#7d7d7d" maxW={100} value={window.electron.store.get('workTime') / 60} min={0} max={60}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>

        <Box pb="3">
          <Heading pl="0.5" pb="1" color="gray.500" size="sm" fontFamily="body" fontWeight="semibold">Short Break</Heading>
          <NumberInput onChange={handleBreakChange} variant="filled" color="#7d7d7d" maxW={100} value={window.electron.store.get('breakTime') / 60} min={0} max={60}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
      </Flex>

      <Divider width="90%" />

      <Flex>
        <Heading p="5" color="gray.500" size="sm" fontFamily="body" fontWeight="semibold"># of Pomodoros</Heading>
        <Spacer />
        <Box pt="3" pr="4">
          <NumberInput onChange={handlePomodorosChange} variant="filled" color="#7d7d7d" maxW={100} value={window.electron.store.get('totalPomodoros')} min={0} max={10}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
      </Flex>
    </Box>
  );
};

export default Settings;
