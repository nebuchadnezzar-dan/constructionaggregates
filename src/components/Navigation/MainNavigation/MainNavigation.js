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
          <NavLinks name="dashboard" link="/" exact>
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

          <NavLinks name="icons" link="/settings">
            Settings
          </NavLinks>

          <NavLinks name="notifications" link="/notifications">
            Notifcations
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
