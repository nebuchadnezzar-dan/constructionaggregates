import React from 'react';

import { ReactComponent as Dashboard } from '../../../../assets/svg/book.svg';
import { ReactComponent as User } from '../../../../assets/svg/user.svg';
import { ReactComponent as Table } from '../../../../assets/svg/clipboard.svg';
import { ReactComponent as Typography } from '../../../../assets/svg/table2.svg';
import { ReactComponent as Icons } from '../../../../assets/svg/location.svg';
import { ReactComponent as Notifications } from '../../../../assets/svg/bell.svg';
import { ReactComponent as Support } from '../../../../assets/svg/sphere.svg';

import styles from './MainNavLink.module.scss';

const mainNavLinks = ({ children, name, active }) => {
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
    <div className={[styles.linkWrapper, styles[active]].join(' ')}>
      <div className={styles.svgWrap}>{SVGComponent}</div>
      <div style={{ marginLeft: '1.5rem' }}>{children}</div>
      {/* <span className={styles.rippleRoot}><span><span></span></span></span> */}
    </div>
  );
};

export default mainNavLinks;
