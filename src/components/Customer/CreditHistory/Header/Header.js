import React from 'react';

import styles from './Header.module.scss';

const header = (props) => {

    return <div className={styles.headerWrapper}>
        <div>
            <p>Total: {props.total}</p>
            <p>Date: {props.date}</p>
        </div>
        <p>Partially Paid: {props.payment}</p>
    </div>

}

export default header;