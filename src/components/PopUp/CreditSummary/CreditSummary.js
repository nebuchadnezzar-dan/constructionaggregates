import React, { Component } from 'react';

import { connect } from 'react-redux';

import styles from './CreditSummary.module.scss';

import Button from '../../UI/Button/Button';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Spinner from '../../UI/Spinner/Spinner';

import * as actions from '../../../store/actions/index';

class CreditSummary extends Component {
    render() {
        const { props } = this;
        const a = [].reduce
        const preTotal = props.creditRedux.reduce((pre, cur) => pre + cur.total, 0);
        const preTotalPayment = props.creditRedux.reduce((pre, cur) => cur.payment, 0);
        const mainBody = <Auxillary>
            <div className={styles.totalWrapper}>
                <div>Total:</div>
                <div>{preTotal}</div>
            </div>
            <div className={styles.discountWrapper}>
                <div>Partially Paid:</div>
                <div>{preTotalPayment}</div>
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
                            .map((credit, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{credit.date}</td>
                                        <td>{credit.total}</td>
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
        </Auxillary>;
        return props.creditLoading ? <Spinner color="grey" /> : mainBody;
    }
}

const mapStateToProps = state => ({
    creditLoading: state.customer.fetchCreditLoading,
    // creditSum: state.customer.creditSummary,
});


export default connect(mapStateToProps)(CreditSummary);