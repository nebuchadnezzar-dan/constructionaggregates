import React, { Component } from 'react';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as actions from '../../../../store/actions/index';

import styles from './Transaction.module.scss';

import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Modal from '../../../../components/UI/Modal/Modal';
import Confirmation from '../../../../components/UI/Confirmation/Confirmation';

class Transaction extends Component {


    state = {
        input: '',
        pay: false,
        confirmation: false,
        feedback: false,
        loaded: false,
        hidden: true,
        id: ''
    }

    componentDidMount() {
        const route = this.props.location.pathname.match(/[a-zA-z]+/g);
        const ids = +this.props.location.pathname.match(/\d+/)[0];
        this.setState({ id: ids });
        this.props.activeRouteDispatch(route);
        this.props.fetchInvoiceDispatch(ids);
    }

    onInputPayment = (e) => {
        this.setState({ input: e.target.value });
    }

    onClickShow = () => {
        this.setState({ pay: !this.state.pay })
    }

    onClickPay = () => {
        this.setState({ confirmation: true, feedback: false });
        this.props.localPopupDispatchDispatch({ from: 'localModalTransaction', value: true, global: true });
    }

    onSendPostRequest = async () => {
        console.log('Hey')
        this.props.globalPopupDispatch();
        await this.props.postInvoiceDispatch(this.state.id, { payment: +this.state.input });
        this.props.fetchInvoiceDispatch(this.state.id);
        this.props.localPopupDispatchDispatch({ from: 'localModalTransaction', value: true, global: true });
        this.setState({ input: '', confirmation: false, feedback: true });
    }

    onCloseModalHandler = () => {
        this.props.globalPopupDispatch();
        this.setState({ confirmation: false, feedback: false });
    }

    toggleHide = () => {
        this.setState({ hidden: !this.state.hidden });
    }

    render() {
        // console.log(this.props.invoiceDetails);
        let paymentShown, paymentTable;
        const spinner = <Spinner color="grey" />;
        let paymentButton = <Button color="blue" click={this.onClickShow}>Pay</Button>;

        const disabled = +this.state.input > 0 ? false : true;

        let id, first_name, last_name, date, purchase, total, paid, discount;
        if (this.props.invoiceDetails.invoice) {
            id = this.props.invoiceDetails.invoice.id;
            first_name = this.props.invoiceDetails.invoice.first_name;
            last_name = this.props.invoiceDetails.invoice.last_name;
            date = this.props.invoiceDetails.invoice.date
        }

        if (this.props.invoiceDetails.purchase) {
            purchase = this.props.invoiceDetails.purchase.map((el, i) => (
                <tr key={i}>
                    <td>{el.description}</td>
                    <td>{el.cost}</td>
                    <td>{el.quantity}</td>
                    <td>{el.amount}</td>
                </tr>
            ));
            total = this.props.invoiceDetails.purchase.reduce((acc, curr) => +curr.amount + acc, 0)
        }

        if (this.state.pay) {
            paymentButton = null;
            paymentShown = (
                <div className={styles.paymentWrap}>
                    <input name="payment" type="number"
                        placeholder="0"
                        onChange={this.onInputPayment.bind(this)}
                        value={this.state.input} />
                    <Button color="red" click={this.onClickShow}>Cancel</Button>
                    <Button color="green" click={this.onClickPay} disabled={disabled}>Pay</Button>
                </div>);
        }
        if (this.props.invoiceDetails.payments) {
            if (this.props.invoiceDetails.payments.length === 0) {
                paymentTable = <div>No payment history found!</div>;
                paid = 0;
                discount = 0;
            } else {
                paymentTable = (
                    <table>
                        <thead>
                            <tr>
                                <th>Payment</th>
                                <th>Discount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.invoiceDetails.payments.map((el, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{el.payment}</td>
                                        <td>{el.discount ? el.discount : 0}</td>
                                        <td>{el.date}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>);

                paid = this.props.invoiceDetails.payments.reduce((acc, curr) => +curr.payment + acc, 0);

                discount = this.props.invoiceDetails.payments.reduce((acc, curr) => +curr.discount + acc, 0);

                if (total - (paid + discount) === 0) paymentButton = null;
            }

        }


        const body = (
            <div className={styles.CreditWrapper}>
                <div>
                    <div>
                        INVOICE
                        </div>
                </div>
                <div className={styles.invoiceHeading}>
                    <div>
                        <p>Billed To</p>
                        <p>{`${first_name} ${last_name}`}</p>
                    </div>
                    <div>
                        <div>
                            <p>Invoice Number</p>
                            <p>{id}</p>
                        </div>
                        <div>
                            <p>Date Issued</p>
                            <p>{date}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>Invoice Total</p>
                            <p className={styles.total}>{total - (paid + discount) ? total - (paid + discount) : 0}</p>
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
                                {purchase}
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th>
                                        <div>Subtotal</div>
                                        <div>Discount</div>
                                        <div>Paid</div>
                                    </th>
                                    <th>
                                        <div>{total}</div>
                                        <div>{discount}</div>
                                        <div>{paid}</div>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={styles.paymentSummary}>
                    <div className={styles.toggleButton}>
                        <button onClick={this.toggleHide} >
                            {this.state.hidden ? <span className={styles.hidden}></span> : <span className={styles.notHidden}></span>}
                            <span>Payment History</span>
                        </button>
                    </div>
                    {this.state.hidden ? null : paymentTable}
                </div>

                <div className={styles.endButtons}>
                    {paymentButton}
                    <Button color="violet">Print</Button>
                    <Button color="orange"><NavLink to="/pos">Back</NavLink></Button>
                </div>

                {paymentShown}

            </div>
        );


        return (
            <div className={styles.transWrap}>
                <Modal>
                    <Confirmation
                        confirmation={this.state.confirmation}
                        error={this.props.postError}
                        proceed={this.onSendPostRequest.bind(null)}
                        feedback={this.state.feedback}
                        okClose={this.onCloseModalHandler.bind(null)}

                    />
                </Modal>
                {this.props.loading ? spinner : body}
            </div>
        );
    }

}

const mapStateToProps = state => ({
    invoiceDetails: state.invoice.invoiceDetails,
    error: state.invoice.searchInvoiceError,
    loading: state.invoice.searchInvoiceLoading,
    postError: state.invoice.postInvError,
    postLoading: state.invoice.postInvLoading
});

const mapDispatchToProps = dispatch => ({
    globalPopupDispatch: () => dispatch(actions.toggleGlobalModal()),
    localPopupDispatchDispatch: local => dispatch(actions.toggleLocalPopupSettings(local)),
    activeRouteDispatch: routes => dispatch(actions.activeRoute(routes)),
    fetchInvoiceDispatch: id => dispatch(actions.fetchinvoice(id)),
    postInvoiceDispatch: (id, body) => dispatch(actions.postInvoice(id, body))
});

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);