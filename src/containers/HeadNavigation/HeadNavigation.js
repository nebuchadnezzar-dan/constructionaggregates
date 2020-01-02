import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import { routes } from '../../util/routeHelper';

import styles from './HeadNavigation.module.scss';
import Button from '../../components/UI/Button/Button';

import { ReactComponent as Dasboard } from '../../assets/svg/book.svg';
import { ReactComponent as Notifications } from '../../assets/svg/bell.svg';
import { ReactComponent as Profile } from '../../assets/svg/user.svg';

class HeadNavigation extends Component {

  state = {
    profileClicked: false
  }

  onSideClick = () => {
    this.props.toggleSideBarDispatch();
  }

  onNavButtonsClicked = (from) => {
    if (from === 'profile') this.setState({ profileClicked: !this.state.profileClicked })
  }

  subHeadClicked = async (from) => {
    if (from === 'logout') {
      await this.props.logoutDispatch()
      this.props.history.push({ pathname: '/' })
    }
  }

  render() {

    const mappedLink = this.props.children.map((el, i) => {
      if (i === 0) {
        return <NavLink key={i} to={`/${el}`} >{routes[el]}</NavLink>
      } else {
        return <div key={i}><span style={{ margin: '0 0.5rem', fontSize: '2rem' }}>/</span>{routes[el]}</div>
      }
    })

    return (
      <header className={styles.header}>
        <div className={styles.headNavWrapper}>
          <div className={styles.headNav}>
            <div className={styles.hamBurger} onClick={this.onSideClick} ><div className={styles.ham} /></div>
            {mappedLink}
          </div>
          <div className={styles.svgWrapper}>
            <div>
              <Button cName="nav">
                <Dasboard />
              </Button>
            </div>
            <div>
              <Button cName="nav">
                <Notifications />
              </Button>
            </div>
            <div>
              <Button cName="nav" click={this.onNavButtonsClicked.bind(null, 'profile')}>
                <Profile className={this.state.profileClicked ? styles.svgActive : null} />
              </Button>
            </div>
          </div>
        </div>
        <div className={[styles.subhead, this.state.profileClicked ? null : styles.notClicked].join(' ')}>
          <div className={styles.subheadContainer}>
            <ul>
              <li> <div>Profile</div></li>
              <li className={styles.separator} />
              <li> <div onClick={this.subHeadClicked.bind(null, 'logout')}>Logout</div></li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  toggleSideBarDispatch: () => dispatch(actions.toggleSideBar(true)),
  logoutDispatch: () => dispatch(actions.logout())
});

export default connect(null, mapDispatchToProps)(withRouter(HeadNavigation));
