import React from 'react';

import styles from './Header.module.scss';

const header = (props) => {

    return <div className={styles.headerWrapper}>
        <div>
            <p>Total:</p>
            <p>Date: </p>
        </div>
        <p>Partially Paid:</p>
    </div>

}

export default header;