import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import styles from './Transactions.module.scss';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class Transactions extends Component {

    state = {
        input: ''
    }

    componentDidMount() {
        const route = window.location.pathname.match(/[a-zA-z]+/g);
        this.props.activeRouteDispatch(route);
    }

    onChangeInput = (e) => {
        this.setState({ input: e.target.value })
    }

    onClickSearch = () => {
        this.props.fetchInvoiceDispatch(this.state.input);
    }

    onClearSearch = () => {
        this.setState({ input: '' });
        this.props.clearInvoiceDispatch();
    }

    render() {
        let result;
        const spinner = <Spinner color="grey" />;
        const clear = typeof this.props.invoiceResult === 'object' && this.props.invoiceResult.length > 0 ?
            <div className={styles.clear}>
                <Button color="blue" click={this.onClearSearch}>CLEAR SEARCH RESULTS</Button>
            </div> : null;

        if (typeof this.props.invoiceResult === 'string') {
            result = <div>{this.props.invoiceResult}</div>
        } else {
            result = this.props.invoiceResult.map((el, i) => (
                <NavLink to={`/pos/${el.id}/invoice`} key={i} >
                    <div className={styles.result}>
                        <div>
                            <p>{`#${el.id}`}</p>
                            <p>{el.date}</p>
                        </div>
                        <div>
                            <p>{`${el.first_name} ${el.last_name}`}</p>
                        </div>
                    </div>
                </NavLink>
            ));
        }

        return (
            <div className={styles.wrapper}>
                <div className={styles.inputSearcher}>
                    <input type="number" name="input" placeholder="Transaction ID number" value={this.state.input} onChange={this.onChangeInput.bind(this)} />
                    <Button color="blue" click={this.onClickSearch}>Go</Button>
                </div>

                <div className={styles.resultsWrapper}>
                    {this.props.loading ? spinner : result}
                </div>
                {clear}

            </div>
        );
    }

}

const mapStateToProps = state => ({
    invoiceResult: state.customer.invoicedSearch,
    loading: state.customer.searchInvoiceLoading,
    error: state.customer.searchInvoiceError
});

const mapDispatchToProps = dispatch => ({
    activeRouteDispatch: routes => dispatch(actions.activeRoute(routes)),
    fetchInvoiceDispatch: id => dispatch(actions.fetchInvoice(id)),
    clearInvoiceDispatch: () => dispatch(actions.clearInvoiceSearch())
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
