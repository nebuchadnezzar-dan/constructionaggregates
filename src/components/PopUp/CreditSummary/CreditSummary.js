import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import styles from './CreditSummary.module.scss';

import Button from '../../UI/Button/Button';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Spinner from '../../UI/Spinner/Spinner';


class CreditSummary extends Component {

    onClickedRow = (id) => {
        this.props.history.push({ pathname: `/pos/${id}/invoice` });
    }

    render() {
        const { props } = this;
        let preTotal, preTotalPayment, tableHead, tableBody, partDiv;
        if (props.summary === "credit") {
            preTotal = props.creditRedux.reduce((pre, cur) => pre + cur.total, 0);
            preTotalPayment = props.creditRedux.reduce((pre, cur) => cur.payment + pre, 0);

            partDiv = <div className={styles.discountWrapper}>
                <div>Partially Paid:</div>
                <div>{preTotalPayment}</div>
            </div>;

            tableHead = <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Credit</th>
            </tr>;
            tableBody = props.creditRedux
                .map((credit, i) => {
                    return (
                        <tr key={i} onClick={this.onClickedRow.bind(null, credit.id)} className={[styles.rowClick, styles.rowClickCredit].join(' ')}>
                            <td>{credit.id}</td>
                            <td>{credit.date}</td>
                            <td>{credit.total - credit.payment}</td>
                        </tr>
                    );
                });
        } else {
            preTotal = props.purchase.reduce((pre, cur) => pre + cur.total, 0);
            const discount = props.purchase.reduce((pre, cur) => pre + cur.discount, 0);
            preTotalPayment = discount;

            partDiv = <div className={styles.discountWrapper}>
                <div>Discount:</div>
                <div>{preTotalPayment}</div>
            </div>;

            tableHead = <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Purchased Total</th>
            </tr>;

            tableBody = props.purchase
                .map((credit, i) => {
                    return (
                        <tr key={i} onClick={this.onClickedRow.bind(null, credit.id)} className={[styles.rowClick, styles.rowClickPurchase].join(' ')}>
                            <td>{credit.id}</td>
                            <td>{credit.date}</td>
                            <td>{credit.total - credit.discount}</td>
                        </tr>
                    );
                });
        }

        const mainBody = <Auxillary>
            <div className={styles.totalWrapper}>
                <div>Total:</div>
                <div>{preTotal - preTotalPayment}</div>
            </div>
            {partDiv}
            <div className={styles.tableWrapper}>
                <table className={styles.tableCreditSummaryTable}>
                    <thead className={props.summary === 'credit' ? styles.tableCreditSummary : styles.tablePurchaseSummary}>
                        {tableHead}
                    </thead>
                    <tbody className={styles.creditSummaryBody}>
                        {tableBody}
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
                <Button color={props.summary === "credit" ? "orange" : "blue"}>Print</Button>
            </div>
        </Auxillary>;
        return props.creditLoading ? <Spinner color="grey" /> : mainBody;
    }
}

const mapStateToProps = state => ({
    creditLoading: state.customer.fetchCreditLoading,
    // creditSum: state.customer.creditSummary,
});


export default connect(mapStateToProps)(withRouter(CreditSummary));