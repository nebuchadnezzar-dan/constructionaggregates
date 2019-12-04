import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Auxillary from '../Auxillary/Auxillary';
import MainNavigation from '../../components/Navigation/MainNavigation/MainNavigation';
import HeadNavigation from '../../containers/HeadNavigation/HeadNavigation';

import styles from './Layout.module.scss';

class Layout extends Component {

  componentDidMount() {
    window.addEventListener("resize", this.updateDimension)
  }
  componentWillMount() {
    window.removeEventListener("resize", this.updateDimension);
  }

  updateDimension = () => {
    if (window.innerWidth > 1138) {
      this.props.toggleSideBarDispatch(false)
    }
  }

  render() {
    return (
      <Auxillary>
        <div className={this.props.sideBar ? styles.smallScreenSide : styles.sideBar}>
          <div className={styles.sidebarInside}>
            <MainNavigation />
          </div>
        </div>
        <div className={this.props.sideBar ? styles.smallNavRight : styles.navRight} onClick={this.props.toggleSideBarDispatch.bind(null, false)} />
        <div className={styles.mainContent}>
          <HeadNavigation>{this.props.activeRoute}</HeadNavigation>
          <main>{this.props.children}</main>
        </div>
      </Auxillary>
    );
  }

};

const mapStateToProps = state => ({
  activeRoute: state.route.activeRoute,
  sideBar: state.route.sideBar
});

const mapDispatchToProps = dispatch => ({
  toggleSideBarDispatch: (val) => dispatch(actions.toggleSideBar(val))
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
