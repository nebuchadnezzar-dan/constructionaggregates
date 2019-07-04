import React from 'react';

import styles from './Unordered.module.scss';

const unordered = props => (
  <ul className={styles.ulDefault}>{props.children}</ul>
);

export default unordered;
