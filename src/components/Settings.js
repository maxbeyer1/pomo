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

const Settings = () => (
  <Box>
    <Flex>
      <Box p="2" pl="5">
        <Heading>Settings</Heading>
      </Box>
      <Spacer />
      <Link p="2" as={NavLink} to="/">
        <IconButton aria-label="Home" variant="unstyled" color="#FB8484" icon={<Home />} />
      </Link>
    </Flex>

    <Divider />

    <Center>
      <Heading p="2" size="md">Times (min)</Heading>
    </Center>

    <Flex justify="space-evenly">
      <Box>
        <Heading pl="2.5" size="sm">Pomodoro</Heading>
        <NumberInput maxW={100} defaultValue={15} min={0} max={60}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>

      <Box pb="3">
        <Heading pl="1" size="sm">Short Break</Heading>
        <NumberInput maxW={100} defaultValue={5} min={0} max={60}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
    </Flex>

    <Divider />
  </Box>
);

export default Settings;
