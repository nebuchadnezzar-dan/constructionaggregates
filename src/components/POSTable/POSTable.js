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
        <tr>
          <td>Cement</td>
          <td>150</td>
          <td>3</td>
          <td>450</td>
        </tr>
        <tr>
          <td>Cement</td>
          <td>150</td>
          <td>3</td>
          <td>450</td>
        </tr>
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
