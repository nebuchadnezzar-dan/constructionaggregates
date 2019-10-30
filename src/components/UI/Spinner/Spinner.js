import React from 'react';

import styles from './Spinner.module.scss';

const spinner = props => {
    const small = props.small ? styles.searchSpinner : null;
    return (<div className={[styles.ldsRing, small].join(' ')}><div className={styles[props.color]}></div><div></div><div></div><div></div></div>)
};

export default spinner