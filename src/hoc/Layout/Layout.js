import React from 'react';

import { connect } from 'react-redux';

import Auxillary from '../Auxillary/Auxillary';
import MainNavigation from '../../components/Navigation/MainNavigation/MainNavigation';
import HeadNavigation from '../../containers/HeadNavigation/HeadNavigation';

import styles from './Layout.module.scss';

const layout = props => {
  return (
    <Auxillary>
      <div className={styles.sideBar}>
        <MainNavigation />
      </div>
      <div className={styles.mainContent}>
        <HeadNavigation>{props.activeRoute}</HeadNavigation>
        <main>{props.children}</main>
      </div>
    </Auxillary>
  );
};

const mapStateToProps = state => ({
  activeRoute: state.route.activeRoute
});

export default connect(mapStateToProps)(layout);
