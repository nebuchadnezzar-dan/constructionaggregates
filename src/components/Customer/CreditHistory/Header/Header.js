import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

const header = (props) => {

    return <div className={styles.headerWrapper}>
        <div>
            <p>{`#${props.id} | Total: ${props.total} `}</p>
            <p>Date: {props.date}</p>
        </div>
        <div>
            <p>Paid: {props.payment}</p>
            <p><NavLink to={`/pos/${props.id}/invoice`}>&#9656;Go To Transaction</NavLink></p>
        </div>

    </div>

}

export default header;