import React from 'react';

import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Unordered from '../../UI/Unordered/Unordered';
import NavLinks from './MainNavLinks/MainNavLink';

const mainNavigation = () => {
  return (
    <Auxillary>
      <div style={{ padding: '3.6rem' }}>LOGO</div>
      <div>
        <Unordered classname="ulNavigation">
          <NavLinks name="dashboard" link="/dashboard">
            Dashboard
          </NavLinks>

          <NavLinks name="user" link="/user">
            User Profile
          </NavLinks>

          <NavLinks name="pos" link="/pos">
            Point of Sale
          </NavLinks>

          <NavLinks name="customers" link="/customers">
            Customers
          </NavLinks>

          <NavLinks name="icons" link='/settings' submenu>
            Settings
          </NavLinks>

          <NavLinks name="haul" link="/haul">
            Haul
          </NavLinks>

          <NavLinks name="support" link="/support">
            Support
          </NavLinks>
        </Unordered>
      </div>
    </Auxillary>
  );
};

export default mainNavigation;
