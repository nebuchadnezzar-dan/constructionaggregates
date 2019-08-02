import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import styles from './POSTable.module.scss';

class POSTable extends Component {
  activerRowClickHandler = index => {
    this.props.setActiveRowDipatch(index);
  };
  render() {
    const { props } = this;
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
            <tr
              key={i}
              className={i === props.activeRowRedux ? styles.activeRow : null}
              onClick={this.activerRowClickHandler.bind(null, i)}
            >
              <td>{td.materials}</td>
              <td>{td.price}</td>
              <td>{td.quantity}</td>
              <td>{td.price * td.quantity}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td />
            <td />
            <th>Total</th>
            <th>
              {props.data.reduce(
                (acc, current) => acc + +current.price * current.quantity,
                0
              )}
            </th>
          </tr>
        </tfoot>
      </table>
    );
  }
}

const mapStateToProps = state => ({
  activeRowRedux: state.invoicePOS.activeRow
});

const mapDispatchToProps = dispatch => ({
  setActiveRowDipatch: index => dispatch(actions.setActiveItemRow(index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(POSTable);
