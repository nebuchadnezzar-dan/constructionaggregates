import React from 'react';

import styles from './InputSearch.module.scss';

const inputSearch = props => {
  return (
    <div className={styles.search}>
      <span className={styles.searchIcon}>&#9906;</span>
      <input
        className={styles.input}
        placeholder={props.elementConfig.placeholder}
        type="text"
        value={props.value}
        onChange={props.edit}
      />
    </div>
  );
};

export default inputSearch;
