import React, { Component } from 'react';

import styles from './Transaction.module.scss';

import Button from '../../../../components/UI/Button/Button';

class Transaction extends Component {

    render() {
        return (
            <div className={styles.transWrap}>
                <div className={styles.CreditWrapper}>
                    <div>
                        <div>
                            INVOICE
                        </div>
                    </div>
                    <div className={styles.invoiceHeading}>
                        <div>
                            <p>Billed To</p>
                            <p>Sister James</p>
                        </div>
                        <div>
                            <div>
                                <p>Invoice Number</p>
                                <p>0000000012</p>
                            </div>
                            <div>
                                <p>Date Issued</p>
                                <p>10/07/2019</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Invoice Total</p>
                                <p className={styles.total}>42000.00</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.table}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Unit Cost</th>
                                        <th>Qty</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Mineral Water</td>
                                        <td>155</td>
                                        <td>2</td>
                                        <td>300</td>
                                    </tr>
                                    <tr>
                                        <td>Mineral Water</td>
                                        <td>155</td>
                                        <td>2</td>
                                        <td>300</td>
                                    </tr>
                                    <tr>
                                        <td>Mineral Water</td>
                                        <td>155</td>
                                        <td>2</td>
                                        <td>300</td>
                                    </tr>
                                    <tr className={styles.subTotal}>
                                        <td></td>
                                        <td></td>
                                        <td>Subtotal</td>
                                        <td>42000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div>
                        <Button>Pay</Button>
                        <Button>Print</Button>
                        <Button>Back</Button>
                    </div>

                </div>
            </div>
        );
    }

}

export default Transaction;