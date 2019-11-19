import React, { Component } from 'react';

import styles from './Transactions.module.scss';

import Button from '../../../components/UI/Button/Button';

class Transactions extends Component {

    render() {
        return (
            // body
            // header 
            // id transaction searcher | button
            // results that are clickable
            <div className={styles.wrapper}>
                <div className={styles.inputSearcher}>
                    <input name="input" placeholder="Transaction ID number" />
                    <Button color="blue">Go</Button>
                </div>

                <div className={styles.resultsWrapper}>
                    <div className={styles.result}>
                        <div>
                            <p>#123</p>
                            <p>12/25/2019</p>
                        </div>
                        <div>
                            <p>James Charles</p>
                        </div>
                    </div>

                    <div className={styles.result}>
                        <div>
                            <p>#123</p>
                            <p>12/25/2019</p>
                        </div>
                        <div>
                            <p>James Charles</p>
                        </div>
                    </div>

                    <div className={styles.result}>
                        <div>
                            <p>#123</p>
                            <p>12/25/2019</p>
                        </div>
                        <div>
                            <p>James Charles</p>
                        </div>
                    </div>
                </div>

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

                </div>
            </div>
        );
    }

}

export default Transactions;
