import React from 'react';
import styles from './Button.module.scss';

const button = props => {
  return (
    <button
      disabled={props.disabled}
      className={[
        styles.button,
        styles['button' + props.cName],
        styles['button' + props.active]
      ].join(' ')}
      onClick={props.click}
    >
      {props.children}
    </button>
  );
};

export default button;
