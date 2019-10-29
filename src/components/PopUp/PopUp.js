import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import Button from '../UI/Button/Button';
import Payment from './Payment/Payment';
import Edit from './Edit/Edit';
import Credit from './Credit/Credit';
import Discount from './Discount/Discount';
import CreditSummary from './CreditSummary/CreditSummary';

import styles from './PopUp.module.scss';

class PopUp extends Component {
  state = {
    change: '',
    payment: ''
  };

  onPaymentHandler = (action, e) => {
    this.setState({ payment: e.target.value });
  };

  keyDownHandler = (action, e) => {
    if (e.keyCode === 13) {
      if (action === 'discount') {
        this.props.addDiscountDispatch(e.target.value);
      } else if (action === 'edit') {
        this.props.editQuantityDispatch(e.target.value);
      }
    }
  };
  onEditButtonHandler = action => {
    // console.log(action);
    if (action === 'edit') this.props.editQuantityDispatch(this.state.payment);
    if (action === 'discount')
      this.props.addDiscountDispatch(this.state.payment);
    if (action === 'pay') {
      this.props.postPosDispatch(this.props.customer.id, {
        purchased: this.props.items.map(el => ({ id: el.id, quantity: +el.quantity })),
        mode: this.props.discount === 0 ? 'fully paid' : 'discounted',
        trucks: [{ id: this.props.truck.id }],
        address: this.props.address,
        payment: +this.state.payment
      });
      this.props.resetPosDispatch();
      this.props.fetchPosDispatch();
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
        action = <div className={styles.actionWrapper}>
          <div className={[styles.header, styles.headerGreen].join(' ')}>
            {props.action}
          </div>
          <Payment total={total}
            action={props.action}
            discount={props.discount}
            customer={props.customer}
            address={props.address}
            truck={props.truck}
            payment={this.state.payment}
            keyDown={this.keyDownHandler}
            change={this.onPaymentHandler}
            clickButton={this.onEditButtonHandler} />
        </div>;
        break;
      case 'edit':
        action = <div className={styles.actionWrapper}>
          <div className={[styles.header, styles.headerRed].join(' ')}>
            {props.action}
          </div>
          <Edit action={props.action}
            items={props.items}
            activeRow={props.activeRow}
            payment={this.state.payment}
            keyDown={this.keyDownHandler}
            change={this.onPaymentHandler}
            clickButton={this.onEditButtonHandler}
            void={this.props.onVoidItem}
          />
        </div>;
        break;
      case 'credit':
        action = (
          <div className={styles.actionWrapper}>
            <div className={[styles.header, styles.headerBlue].join(' ')}>
              {props.action}
            </div>
            <Credit action={props.action}
              total={total}
              items={props.items}
              customer={props.customer}
              address={props.address}
              truck={props.truck}
              creditButton={this.onCreditButtonHandler}
            />
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
            <Discount action={props.action}
              payment={this.state.payment}
              keyDown={this.keyDownHandler}
              change={this.onPaymentHandler}
              clickButton={this.onEditButtonHandler}
            />
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
            <CreditSummary totalCredit={totalCredit}
              customer={props.customer}
              creditRedux={props.creditRedux}
            />
          </div>
        );
        break;
      default:
        console.log('none were satisfied');
    }

    const toBeShown = props.type === 'simple' ? props.children : action;
    return (
      <div className={styles.popupWrapper}>
        <Button
          cName="Close"
          color="red"
          click={this.props.close}
        >
          X
        </Button>
        {/* <div className={styles.closeButton}>X</div> */}
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
  creditRedux: state.customer.credit,
  activeRow: state.invoicePOS.activeRow
});

const mapDispatchToProps = dispatch => ({
  onVoidItem: () => dispatch(actions.voidItem()),
  resetPosDispatch: () => dispatch(actions.resetPos()),
  addDiscountDispatch: value => dispatch(actions.addDiscount(value)),
  addCreditDispatch: (customer, credit) =>
    dispatch(actions.addCredit(customer, credit)),
  editQuantityDispatch: value => dispatch(actions.editQuantity(value)),
  postPosDispatch: (id, data) => dispatch(actions.postPos(id, data)),
  fetchPosDispatch: () => dispatch(actions.fetchPOS())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopUp);
