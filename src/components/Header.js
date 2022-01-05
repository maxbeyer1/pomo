import React from 'react';
import { NavLink } from 'react-router-dom';

import { Settings } from 'react-feather';
import { Box, IconButton, Link } from '@chakra-ui/react';

const Header = () => (
  <Box>
    <Link pos="fixed" top="2" right="2" as={NavLink} to="/settings">
      <IconButton aria-label="Settings" bgColor="transparent" color="brand.200" icon={<Settings />} />
    </Link>
  </Box>
);

export default Header;
