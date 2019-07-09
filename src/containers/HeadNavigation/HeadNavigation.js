import React, { Component } from 'react';

import styles from './HeadNavigation.module.scss';
import Button from '../../components/UI/Button/Button';

import { ReactComponent as Dasboard } from '../../assets/svg/book.svg';
import { ReactComponent as Notifications } from '../../assets/svg/bell.svg';
import { ReactComponent as Profile } from '../../assets/svg/user.svg';

class HeadNavigation extends Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={styles.headNavWrapper}>
          <div>
            <a href="#">{this.props.children}</a>
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
