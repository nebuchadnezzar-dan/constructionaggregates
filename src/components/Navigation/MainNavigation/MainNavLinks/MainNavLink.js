import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/index';

import { ReactComponent as Dashboard } from '../../../../assets/svg/book.svg';
import { ReactComponent as User } from '../../../../assets/svg/user.svg';
import { ReactComponent as Table } from '../../../../assets/svg/clipboard.svg';
import { ReactComponent as Typography } from '../../../../assets/svg/table2.svg';
import { ReactComponent as Icons } from '../../../../assets/svg/location.svg';
import { ReactComponent as Notifications } from '../../../../assets/svg/bell.svg';
import { ReactComponent as Support } from '../../../../assets/svg/sphere.svg';

import styles from './MainNavLink.module.scss';

class MainNavLinks extends Component {
  activeRouteClick = route => {
    this.props.setActiveRoute(route);
  };
  render() {
    const { children, name, link, exact } = this.props;
    const svgName = {
      dashboard: <Dashboard />,
      user: <User />,
      table: <Table />,
      typography: <Typography />,
      icons: <Icons />,
      notifications: <Notifications />,
      support: <Support />
    };
    const SVGComponent = svgName[name];
    return (
      <li>
        <NavLink
          to={link}
          exact={exact}
          activeClassName={styles.active}
          className={styles.linkWrapper}
          onClick={this.activeRouteClick.bind(null, children)}
        >
          <div className={styles.svgWrap}>{SVGComponent}</div>
          <div style={{ marginLeft: '1.5rem' }}>{children}</div>
          {/* <span className={styles.rippleRoot}><span><span></span></span></span> */}
        </NavLink>
      </li>
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
