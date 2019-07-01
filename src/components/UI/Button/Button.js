import React from 'react';
import styles from './Button.module.scss';

const button = props => (
  <button
    className={[styles.button, styles['button' + props.cName]].join(' ')}
    onClick={props.click}
  >
    {props.children}
  </button>
);

export default button;
