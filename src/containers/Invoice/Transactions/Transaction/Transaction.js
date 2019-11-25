import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/index';

import styles from './Transaction.module.scss';

import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Modal from '../../../../components/UI/Modal/Modal';
import Confirmation from '../../../../components/UI/Confirmation/Confirmation';

class Transaction extends Component {


    state = {
        pay: false,
        confirmation: false,
        feedback: false,
        loaded: false
    }

    async componentDidMount() {
        const route = this.props.location.pathname.match(/[a-zA-z]+/g);
        const ids = +this.props.location.pathname.match(/\d+/)[0];
        this.props.activeRouteDispatch(route);
        await this.props.fetchInvoiceDispatch(ids);
    }

    onClickShow = () => {
        this.setState({ pay: !this.state.pay })
    }

    onClickPay = () => {
        this.setState({ confirmation: true, feedback: false });
        this.props.localPopupDispatchDispatch({ from: 'localModalTransaction', value: true, global: true });
    }

    onSendPostRequest = () => {
        console.log('Hey')
        // this.props.globalPopupDispatch();
        // this.props.postCustomerDispatch(this.state.form);
        // this.props.localPopupDispatchDispatch({ from: 'localModalCustomerForm', value: true, global: true });
        // this.setState({ form: { lastName: '', firstName: '', contactNo: '' }, confirmation: false, feedback: true });
    }

    onCloseModalHandler = () => {
        this.props.globalPopupDispatch();
        this.setState({ confirmation: false, feedback: false });
    }

    render() {
        // console.log(this.props.invoiceDetails);
        let paymentShown;
        const spinner = <Spinner color="grey" />;
        let paymentButton = <Button color="blue" click={this.onClickShow}>Pay</Button>;

        let id, first_name, last_name, date, purchase, total;
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
                    <input name="payment" placeholder="0" />
                    <Button color="red" click={this.onClickShow}>Cancel</Button>
                    <Button color="orange" click={this.onClickPay}>Pay</Button>
                </div>);
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
                            <p className={styles.total}>{total}</p>
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
        );


        return (
            <div className={styles.transWrap}>
                <Modal>
                    <Confirmation
                        confirmation={this.state.confirmation}
                        error={false}
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
    loading: state.invoice.searchInvoiceLoading
});

const mapDispatchToProps = dispatch => ({
    globalPopupDispatch: () => dispatch(actions.toggleGlobalModal()),
    localPopupDispatchDispatch: local => dispatch(actions.toggleLocalPopupSettings(local)),
    activeRouteDispatch: routes => dispatch(actions.activeRoute(routes)),
    fetchInvoiceDispatch: id => dispatch(actions.fetchinvoice(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);