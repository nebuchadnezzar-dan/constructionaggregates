import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import { routes } from '../../util/routeHelper';

import styles from './HeadNavigation.module.scss';
import Button from '../../components/UI/Button/Button';

import { ReactComponent as Dasboard } from '../../assets/svg/book.svg';
import { ReactComponent as Notifications } from '../../assets/svg/bell.svg';
import { ReactComponent as Profile } from '../../assets/svg/user.svg';

class HeadNavigation extends Component {

  onSideClick = () => {
    this.props.toggleSideBarDispatch();
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
              <Button cName="nav">
                <Profile />
              </Button>
            </div>
          </div>
        </div>
      </header>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  toggleSideBarDispatch: () => dispatch(actions.toggleSideBar(true))
});

export default connect(null, mapDispatchToProps)(HeadNavigation);
