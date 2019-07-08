import React from 'react';

import Auxillary from '../Auxillary/Auxillary';

import styles from './Layout.module.scss';

const layout = ({ children }) => {
  return (
    <Auxillary>
      <div className={styles.sideBar}>Side Navigation, Toolbar</div>
      <div className={styles.mainContent}>
        <div>Page Navigation</div>
        <main>{children}</main>
      </div>
    </Auxillary>
  );
};

export default layout;
