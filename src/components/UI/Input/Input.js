import React from 'react';
import styles from './Input.module.scss';

const input = props => {
  let inputElement;
  switch (props.elementInputType) {
    case 'input':
      inputElement = (
        <input className={styles.inputElement} {...props.elementConfig} />
      );
      break;
    case 'textarea':
      inputElement = <textarea {...props.elementConfig} />;
      break;
    case 'select':
      inputElement = (
        <select>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = null;
  }

  return inputElement;
};

export default input;
