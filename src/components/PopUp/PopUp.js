import React from 'react';

import styles from './PopUp.module.scss';

const popUp = props => {
  return (
    <div className={styles.popupWrapper}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

export default popUp;
