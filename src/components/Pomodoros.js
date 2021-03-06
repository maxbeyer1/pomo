// eslint-disable-next-line no-unused-vars
import React from 'react';

import { Flex, Icon } from '@chakra-ui/react';

const Pomodoros = ({ totalPomodoros, completedPomodoros }) => {
  const circles = [];
  const totalCircles = totalPomodoros; // TODO: change based on settings input
  const completedCircles = completedPomodoros;

  for (let i = 0; i < completedCircles; i += 1) {
    circles.push(<CircleIcon key={i} color="brand.200" />);
  }

  for (let i = 0; i < totalCircles - completedCircles; i += 1) {
    circles.push(<CircleIcon key={i + completedCircles} color="#D2D3D7" />);
  }

  return (
    <Flex p="8" justify="space-evenly">
      {circles}
    </Flex>
  );
};

const CircleIcon = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon viewBox="0 0 10 10" {...props}>
    <circle
      r="5"
      cx="5"
      cy="5"
      strokeWidth="2"
      fill="currentColor"
    />
  </Icon>
);

export default Pomodoros;
