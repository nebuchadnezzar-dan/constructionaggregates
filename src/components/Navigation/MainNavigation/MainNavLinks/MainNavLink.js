import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/index';

import { ReactComponent as Dashboard } from '../../../../assets/svg/stats-dots.svg';
import { ReactComponent as User } from '../../../../assets/svg/user.svg';
import { ReactComponent as POS } from '../../../../assets/svg/barcode.svg';
import { ReactComponent as Customers } from '../../../../assets/svg/users.svg';
import { ReactComponent as Icons } from '../../../../assets/svg/location.svg';
import { ReactComponent as Notifications } from '../../../../assets/svg/bell.svg';
import { ReactComponent as Support } from '../../../../assets/svg/sphere.svg';

import Auxillary from '../../../../hoc/Auxillary/Auxillary';

import styles from './MainNavLink.module.scss';

class MainNavLinks extends Component {
  activeRouteClick = route => {
    this.props.setActiveRoute(route);
  };
  render() {
    const { children, name, link, exact, submenu } = this.props;
    const svgName = {
      dashboard: <Dashboard />,
      user: <User />,
      pos: <POS />,
      customers: <Customers />,
      icons: <Icons />,
      notifications: <Notifications />,
      support: <Support />
    };
    const SVGComponent = svgName[name];
    return (
      <Auxillary>
        <li className={submenu ? styles.submenu : null} >
          <NavLink
            to={link}
            exact={exact}
            activeClassName={styles.active}
            className={styles.linkWrapper}
            onClick={name === 'icons' ? null : this.activeRouteClick.bind(null, children)}
          >
            <div className={styles.svgWrap}>{SVGComponent}</div>
            <div style={{ marginLeft: '1.5rem' }}>{children}</div>
            {/* <span className={styles.rippleRoot}><span><span></span></span></span> */}
          </NavLink>
        </li>
        {submenu ? <div className={styles.submenuBody}>
          <NavLink
            to='/settings/truck'
            exact={exact}
            activeClassName={styles.active}
            className={styles.linkWrapper}
            onClick={this.activeRouteClick.bind(null, 'Truck Settings')}
          >
            {/* <div className={styles.svgWrap}>{SVGComponent}</div> */}
            <div style={{ marginLeft: '1.5rem' }}>Truck Settings</div>
            {/* <span className={styles.rippleRoot}><span><span></span></span></span> */}
          </NavLink>
          <NavLink
            to='/settings/supply'
            exact={exact}
            activeClassName={styles.active}
            className={styles.linkWrapper}
            onClick={this.activeRouteClick.bind(null, 'Supply Settings')}
          >
            {/* <div className={styles.svgWrap}>{SVGComponent}</div> */}
            <div style={{ marginLeft: '1.5rem' }}>Supply Settings</div>
            {/* <span className={styles.rippleRoot}><span><span></span></span></span> */}
          </NavLink>
        </div> : null}
      </Auxillary>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setActiveRoute: route => dispatch(actions.activeRoute(route))
});

export default connect(
  null,
  mapDispatchToProps
)(MainNavLinks);
