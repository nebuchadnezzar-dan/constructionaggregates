import React from 'react';

import { connect } from 'react-redux';

import styles from './PopUp.module.scss';

const popUp = props => {
  let action;
  const total = props.items.reduce(
    (acc, item) => acc + +item.price * +item.quantity,
    0
  );

  action = (
    <div className={styles.actionWrapper}>
      <div className={styles.header}>{props.action}</div>
      <div className={styles.totalWrapper}>
        <div>Total:</div>
        <div>{total}</div>
      </div>
      <div className={styles.paymentWrapper}>
        <div>Payment</div>
        <div>
          <input placeholder="0" type="number" />
        </div>
      </div>
      <div className={styles.changeWrapper}>
        <div>Change</div>
        <div>0.00</div>
      </div>
      <hr />
      <div className={styles.belowWrapper}>
        <div>
          <div>Customer:</div>
          <div>Customer name</div>
        </div>
        <div>
          <div>Truck:</div>
          <div>{props.truck.plateNo}</div>
        </div>
        <div>
          <div>Deliver at:</div>
          <div>Address Here</div>
        </div>
      </div>
    </div>
  );
  const toBeShown = props.type === 'simple' ? props.children : action;
  return (
    <div className={styles.popupWrapper}>
      <div className={styles[props.cName]}>{toBeShown}</div>
    </div>
  );
};

const mapStateToProps = state => ({
  items: state.invoicePOS.itemsToBuy,
  truck: state.invoicePOS.truck,
  action: state.invoicePOS.actionButton
});

export default connect(mapStateToProps)(popUp);
