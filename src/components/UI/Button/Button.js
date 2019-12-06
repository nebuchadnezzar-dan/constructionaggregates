import React from 'react';
import styles from './Button.module.scss';

const button = props => {
  return (
    <button
      disabled={props.disabled}
      className={[
        styles.button,
        styles.color,
        styles['button' + props.cName],
        styles['button' + props.active],
        styles['color' + props.color],
        styles['hover' + props.hover],
        styles['register' + props.register]
      ].join(' ')}
      onClick={props.click}
    >
      {props.children}
    </button>
  );
};

export default button;
