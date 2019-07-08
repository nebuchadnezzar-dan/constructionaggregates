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
          <a href="#">
            <NavLinks name="dashboard" active="active">
              Dashboard
            </NavLinks>
          </a>
          <a href="#">
            <NavLinks name="user">User Profile</NavLinks>
          </a>
          <a href="#">
            <NavLinks name="table">Table List</NavLinks>
          </a>
          <a href="#">
            <NavLinks name="typography">Typography</NavLinks>
          </a>
          <a href="#">
            <NavLinks name="icons">Icons</NavLinks>
          </a>
          <a href="#">
            <NavLinks name="notifications">Notifcations</NavLinks>
          </a>
          <a href="#">
            <NavLinks name="support">Support</NavLinks>
          </a>
        </Unordered>
      </div>
    </Auxillary>
  );
};

export default mainNavigation;
