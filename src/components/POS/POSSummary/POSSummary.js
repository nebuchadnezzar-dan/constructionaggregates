import React from 'react';

import styles from './POSSummary.module.scss';

const posSummary = props => {
  return (
    <div className={styles.customerWrapper}>
      <p className={styles.summaryHead}>{props.children}</p>
      <p className={styles.summaryBody}>{props.number}</p>
    </div>
  );
};

export default posSummary;
