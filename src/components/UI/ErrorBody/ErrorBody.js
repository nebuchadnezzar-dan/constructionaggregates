import React from 'react';

import styles from './ErrorBody.module.scss';

const errorBody = (props) => (
    <div className={styles.body}>
        {props.children}
        <p>Error</p>
        <hr />
        <div className={styles.errorMessage}>Something went wrong! Try reloading...</div>
    </div>
);

export default errorBody;