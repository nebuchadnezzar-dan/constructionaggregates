import React from 'react';
import styles from './List.module.scss';

const list = props => <li className={styles.listdefault}>{props.children}</li>;

export default list;
