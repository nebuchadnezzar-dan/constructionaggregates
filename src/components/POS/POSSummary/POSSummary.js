import React from 'react';

import styles from './POSSummary.module.scss';

const posSummary = props => {
  const number = props.mode === 'customer' ? props.number : props.activeNum;
  return (
    <div className={styles.customerWrapper}>
      <p className={styles.summaryHead}>{props.children}</p>
      <p className={styles.summaryBody}>{number}</p>
    </div>
  );
};

export default posSummary;
