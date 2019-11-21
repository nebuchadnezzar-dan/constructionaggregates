import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { routes } from '../../util/routeHelper';

import styles from './HeadNavigation.module.scss';
import Button from '../../components/UI/Button/Button';

import { ReactComponent as Dasboard } from '../../assets/svg/book.svg';
import { ReactComponent as Notifications } from '../../assets/svg/bell.svg';
import { ReactComponent as Profile } from '../../assets/svg/user.svg';

class HeadNavigation extends Component {

  render() {

    const mappedLink = this.props.children.map((el, i) => {
      if (i === 0) {
        return <NavLink key={i} to={`/${el}`} >{routes[el]}</NavLink>
      } else {
        return <div key={i}>/{routes[el]}</div>
      }
    })

    return (
      <header className={styles.header}>
        <div className={styles.headNavWrapper}>
          <div className={styles.headNav}>
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


export default HeadNavigation;
