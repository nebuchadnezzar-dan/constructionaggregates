import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import Button from '../UI/Button/Button';

import styles from './PopUp.module.scss';

class PopUp extends Component {
  state = {
    change: '',
    payment: ''
  };

  onPaymentHandler = (action, e) => {
    console.log(action);
    this.setState({ payment: e.target.value });
  };

  keyDownHandler = (action, e) => {
    if (e.keyCode === 13) {
      if (action === 'discount') {
        this.props.addDiscountDispatch(e.target.value);
      }
    }
  };

  render() {
    const { props } = this;
    let action;
    const total =
      props.items.reduce((acc, item) => acc + +item.price * +item.quantity, 0) -
      +props.discount;
    switch (props.action) {
      case 'pay':
        action = (
          <div className={styles.actionWrapper}>
            <div className={[styles.header, styles.headerGreen].join(' ')}>
              {props.action}
            </div>
            <div className={styles.totalWrapper}>
              <div>Total:</div>
              <div>{total}</div>
            </div>
            <div className={styles.discountWrapper}>
              <div>Discount:</div>
              <div>{props.discount}</div>
            </div>
            <div className={styles.paymentWrapper}>
              <div>Payment</div>
              <div>
                <input
                  onKeyDown={this.keyDownHandler.bind(this, props.action)}
                  placeholder="0"
                  type="number"
                  onChange={this.onPaymentHandler.bind(this, props.action)}
                  value={this.state.payment}
                />
              </div>
            </div>
            <div className={styles.changeWrapper}>
              <div>Change</div>
              <div>
                {this.state.payment - total < 0
                  ? 0
                  : this.state.payment - total}
              </div>
            </div>
            <hr />
            <div className={styles.belowWrapper}>
              <div>
                <div>Customer:</div>
                <div>{`${props.customer.lastName}, ${
                  props.customer.firstName
                }`}</div>
              </div>
              <div>
                <div>Deliver at:</div>
                <div>{props.address}</div>
              </div>
              <div>
                <div>Truck:</div>
                <div>{props.truck.plateNo}</div>
              </div>
            </div>
          </div>
        );
        break;
      case 'void':
        action = (
          <div className={styles.actionWrapper}>
            <div className={[styles.header, styles.headerRed].join(' ')}>
              {props.action}
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead className={styles.tableHead}>
                  <tr>
                    <th>Item</th>
                    <th>Unit Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {props.items.map((item, i) => (
                    <tr key={item.materials}>
                      <td>{item.materials}</td>
                      <td>{item.price}</td>
                      <td>
                        <Button
                          cName="delete"
                          click={props.onVoidItem.bind(null, i)}
                        >
                          &#128465;
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
        break;
      case 'cancel':
        props.resetPosDispatch();
        break;
      case 'discount':
        action = (
          <div className={styles.actionWrapper}>
            <div className={[styles.header, styles.headerViolet].join(' ')}>
              {props.action}
            </div>
            <div className={styles.discountFormWrapper}>
              <div>Discount</div>
              <div>
                <input
                  onKeyDown={this.keyDownHandler.bind(this, props.action)}
                  placeholder="0"
                  type="number"
                  onChange={this.onPaymentHandler.bind(this, props.action)}
                  value={this.state.payment}
                />
              </div>
            </div>
          </div>
        );
        break;
      default:
        console.log('none were satisfied');
    }

    const toBeShown = props.type === 'simple' ? props.children : action;
    return (
      <div className={styles.popupWrapper}>
        <div className={styles[props.cName]}>{toBeShown}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.invoicePOS.itemsToBuy,
  truck: state.invoicePOS.truck,
  action: state.invoicePOS.actionButton,
  address: state.invoicePOS.address,
  discount: state.invoicePOS.discount,
  customer: state.invoicePOS.customer
});

const mapDispatchToProps = dispatch => ({
  onVoidItem: index => dispatch(actions.voidItem(index)),
  resetPosDispatch: () => dispatch(actions.resetPos()),
  addDiscountDispatch: value => dispatch(actions.addDiscount(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopUp);
