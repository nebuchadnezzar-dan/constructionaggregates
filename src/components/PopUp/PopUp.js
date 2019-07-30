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
  onCreditButtonHandler = credit => {
    this.props.addCreditDispatch(
      {
        customer: this.props.customer.lastName,
        truck: this.props.truck,
        items: this.props.items,
        address: this.props.address
      },
      credit
    );
    this.props.resetPosDispatch();
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
      case 'credit':
        action = (
          <div className={styles.actionWrapper}>
            <div className={[styles.header, styles.headerBlue].join(' ')}>
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
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead className={styles.tableCredit}>
                  <tr>
                    <th>Item</th>
                    <th>Unit Price</th>
                  </tr>
                </thead>
                <tbody>
                  {props.items.map((item, i) => (
                    <tr key={item.materials}>
                      <td>{item.materials}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            <div className={styles.creditButton}>
              <Button
                color="blue"
                click={this.onCreditButtonHandler.bind(null, total)}
              >
                Save
              </Button>
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
      case 'creditSummary':
        const totalCredit =
          props.creditRedux
            .filter(
              customerCred => customerCred.customer === props.customer.lastName
            )
            .reduce(
              (acc, customerFilter) =>
                acc +
                customerFilter.items.reduce(
                  (accItem, item) => accItem + +item.price * +item.quantity,
                  0
                ),
              0
            ) - props.customer.partialPaid;
        action = (
          <div className={styles.actionWrapper}>
            <div className={[styles.header, styles.headerOrange].join(' ')}>
              {props.action}
            </div>
            <div className={styles.totalWrapper}>
              <div>Total:</div>
              <div>{totalCredit}</div>
            </div>
            <div className={styles.discountWrapper}>
              <div>Partially Paid:</div>
              <div>{props.customer.partialPaid}</div>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.tableCreditSummaryTable}>
                <thead className={styles.tableCreditSummary}>
                  <tr>
                    <th>Date</th>
                    <th>Credit</th>
                  </tr>
                </thead>
                <tbody className={styles.creditSummaryBody}>
                  {props.creditRedux
                    .filter(cred => cred.customer === props.customer.lastName)
                    .map((credit, i) => {
                      const totalCred = credit.items.reduce(
                        (acc, accItem) =>
                          acc + +accItem.price * +accItem.quantity,
                        0
                      );
                      return (
                        <tr key={i}>
                          <td>{credit.date}</td>
                          <td>{totalCred}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <hr />
            <div className={styles.belowWrapper}>
              <div>
                <div>Customer:</div>
                <div>{`${props.customer.lastName}, ${
                  props.customer.firstName
                }`}</div>
              </div>
            </div>
            <div className={styles.creditButton}>
              <Button
                color="orange"
                // click={this.onCreditButtonHandler.bind(null, total)}
              >
                Print
              </Button>
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
  customer: state.invoicePOS.customer,
  creditRedux: state.customer.credit
});

const mapDispatchToProps = dispatch => ({
  onVoidItem: index => dispatch(actions.voidItem(index)),
  resetPosDispatch: () => dispatch(actions.resetPos()),
  addDiscountDispatch: value => dispatch(actions.addDiscount(value)),
  addCreditDispatch: (customer, credit) =>
    dispatch(actions.addCredit(customer, credit)),
  resetDispatch: () => dispatch(actions.resetPos())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopUp);
