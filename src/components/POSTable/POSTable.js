import React from 'react';

import styles from './POSTable.module.scss';

const posTable = props => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Item</th>
          <th>Unit Price</th>
          <th>Qty</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((td, i) => (
          <tr key={i}>
            <td>{td.materials}</td>
            <td>{td.price}</td>
            <td>2</td>
            <td>{td.price * 2}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td />
          <td />
          <th>Total</th>
          <th>450</th>
        </tr>
      </tfoot>
    </table>
  );
};

export default posTable;
