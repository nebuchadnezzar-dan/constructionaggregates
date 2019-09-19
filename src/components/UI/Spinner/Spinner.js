import React from 'react';

import styles from './Spinner.module.scss';

const spinner = props => (<div className={styles.ldsRing}><div className={styles[props.color]}></div><div></div><div></div><div></div></div>);

export default spinner