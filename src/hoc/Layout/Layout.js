import React from 'react';

import Auxillary from '../Auxillary/Auxillary';
import MainNavigation from '../../components/Navigation/MainNavigation/MainNavigation';
import HeadNavigation from '../../containers/HeadNavigation/HeadNavigation';

import styles from './Layout.module.scss';

const layout = ({ children }) => {
  return (
    <Auxillary>
      <div className={styles.sideBar}>
        <MainNavigation />
      </div>
      <div className={styles.mainContent}>
        <HeadNavigation>Settings</HeadNavigation>
        <main>{children}</main>
      </div>
    </Auxillary>
  );
};

export default layout;
