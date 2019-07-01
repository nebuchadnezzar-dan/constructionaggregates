import React from 'react';
import styles from './Input.module.scss';

const input = props => {
  let inputElement;
  switch (props.elementInputType) {
    case 'input':
      // console.log(['INPUT'], props.value);
      inputElement = (
        <input
          className={styles.inputElement}
          name={props.name}
          value={props.value}
          {...props.elementConfig}
          onChange={props.change.bind(this, props.ind, props.name)}
        />
      );
      break;
    case 'textarea':
      inputElement = <textarea {...props.elementConfig} />;
      break;
    case 'select':
      inputElement = (
        <select
          className={styles.select}
          onChange={props.change.bind(this, props.ind, props.name)}
          value={props.value}
        >
          >
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
