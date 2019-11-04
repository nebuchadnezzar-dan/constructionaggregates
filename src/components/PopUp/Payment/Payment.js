import React from 'react';

import styles from './Payment.module.scss';
import Button from '../../UI/Button/Button';
import Auxillary from '../../../hoc/Auxillary/Auxillary';

const payment = props => {
    const change = props.payment - props.total < 0
        ? 0
        : props.payment - props.total;
    const disabled = props.total > props.payment ? true : false;
    return (
        <Auxillary>
            <div className={styles.totalWrapper}>
                <div>Total:</div>
                <div>{props.total}</div>
            </div>
            <div className={styles.discountWrapper}>
                <div>Discount:</div>
                <div>{props.discount}</div>
            </div>
            <div className={styles.paymentWrapper}>
                <div>Payment</div>
                <div>
                    <input
                        onKeyDown={props.keyDown.bind(this, props.action, disabled)}
                        placeholder="0"
                        type="number"
                        onChange={props.change.bind(this, props.action)}
                        value={props.payment}
                    />
                </div>
                <div>
                    <Button
                        disabled={disabled}
                        color="green"
                        click={props.clickButton.bind(null, props.action)}
                    >
                        &#10004; Go
                      </Button>
                </div>
            </div>
            <div className={styles.changeWrapper}>
                <div>Change</div>
                <div>
                    {change}
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
                    <div>{props.truck.length === 0 ? 'N/A' : props.truck.map(el => el.plateNo).join(', ')}</div>
                </div>
            </div>
        </Auxillary>
    );
}


export default payment;