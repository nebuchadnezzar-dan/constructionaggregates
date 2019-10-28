import React, { Component } from 'react';

import styles from './CreditSummary.module.scss';

import Button from '../../UI/Button/Button';
import Auxillary from '../../../hoc/Auxillary/Auxillary';

class CreditSummary extends Component {
    render() {
        const { props } = this;
        return (
            <Auxillary>
                <div className={styles.totalWrapper}>
                    <div>Total:</div>
                    <div>{props.totalCredit}</div>
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
            </Auxillary>
        );
    }
}

export default CreditSummary;