import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/index';

import styles from './Transaction.module.scss';

import Button from '../../../../components/UI/Button/Button';
import Modal from '../../../../components/UI/Modal/Modal';

class Transaction extends Component {


    state = {
        pay: false
    }

    componentDidMount() {
        const route = this.props.location.pathname.match(/[a-zA-z]+/g);
        this.props.activeRouteDispatch(route);
    }

    onClickShow = () => {
        this.setState({ pay: !this.state.pay })
    }

    onClickPay = () => {
        this.props.localPopupDispatchDispatch({ from: 'localModalTransaction', value: true, global: true });
    }

    render() {

        let paymentButton = <Button color="blue" click={this.onClickShow}>Pay</Button>;
        let paymentShown;

        if (this.state.pay) {
            paymentButton = null;
            paymentShown = (
                <div className={styles.paymentWrap}>
                    <input name="payment" placeholder="0" />
                    <Button color="red" click={this.onClickShow}>Cancel</Button>
                    <Button color="orange" click={this.onClickPay}>Pay</Button>
                </div>);
        }

        return (
            <div className={styles.transWrap}>
                <Modal>
                    Hi Sisters
                </Modal>
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
                        {paymentButton}
                        <Button>Print</Button>
                        <Button>Back</Button>
                    </div>

                    {paymentShown}

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    localPopupDispatchDispatch: local => dispatch(actions.toggleLocalPopupSettings(local)),
    activeRouteDispatch: routes => dispatch(actions.activeRoute(routes))
});

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);