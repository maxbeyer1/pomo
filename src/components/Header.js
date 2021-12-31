import React from 'react';
import { NavLink } from 'react-router-dom';

import { Settings } from 'react-feather';

const Header = () => (
  <div className="header">
    <NavLink to="/settings">
      <Settings color="#FB8484" className="settings-icon" />
    </NavLink>
  </div>
);

export default Header;
