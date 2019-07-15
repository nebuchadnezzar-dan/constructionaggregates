import React from 'react';

import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Unordered from '../../UI/Unordered/Unordered';
import NavLinks from './MainNavLinks/MainNavLink';

const mainNavigation = () => {
  return (
    <Auxillary>
      <div>LOGO</div>
      <div>
        <Unordered classname="ulNavigation">
          <NavLinks name="dashboard" link="/" exact>
            Invoice
          </NavLinks>

          <NavLinks name="user" link="/user">
            User Profile
          </NavLinks>

          <NavLinks name="table" link="/table">
            Table List
          </NavLinks>

          <NavLinks name="typography" link="/typography">
            Typography
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
