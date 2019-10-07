import React, { Component } from 'react';

import { connect } from 'react-redux';

import axios from '../../axios-orders';

import * as actions from '../../store/actions/index';

import styles from './Customers.module.scss';

import Head from '../../components/UI/Head/Head';
import HeadChild from '../../components/UI/HeadChild/HeadChild';
import CustomerTable from './CustomerTable/CustomerTable';
import CustomerForm from './CustomerForm/CustomerForm';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorBody from '../../components/UI/ErrorBody/ErrorBody';
import Customer from '../Customers/Customer/Customer';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Customers extends Component {
  state = {
    activeView: 'form'
  };

  async componentDidMount() {
    this.props.fetchCustomers(1);
  }

  onToggleView = view => {
    // this.setState({ activeView: view });
    this.props.toggleViewModeDispatch(view);
  };
  render() {
    const customerView = <CustomerTable />;
    const customerForm = <CustomerForm />;
    const customerInd = <Customer />;
    let customer;
    if (this.props.viewMode === 'table') {
      customer = customerView;
    } else if (this.props.viewMode === 'form') {
      customer = customerForm;
    } else {
      customer = customerInd;
    }
    const mainBody = (
      <div className={styles.cutomerMain}>
        {this.props.children}
        <Head classname="red" svgname="customer">
          <HeadChild
            forClassName={this.state.activeView}
            dispatchClickView={this.onToggleView.bind(null, 'form')}
            dispatchClickForm={this.onToggleView.bind(null, 'table')}
            childName="Form"
          >
            Customers
          </HeadChild>
        </Head>
        <div className={styles.customerBody}>{customer}</div>
      </div>
    );
    const spinner = this.props.loading ? <Spinner color="grey" /> : mainBody;
    const errorRequest = this.props.error ? <ErrorBody>{this.props.children}</ErrorBody> : spinner;
    return errorRequest;
  }
}

const mapStateToProps = state => ({
  loading: state.customer.fetchLoading,
  error: state.customer.fetchError,
  viewMode: state.customer.viewMode
});

const maptDispatchToProps = dispatch => ({
  fetchCustomers: page => dispatch(actions.fetchCustomers(page)),
  toggleViewModeDispatch: mode => dispatch(actions.toggleCustomerView(mode))
});

export default connect(mapStateToProps, maptDispatchToProps)(withErrorHandler(Customers, axios));
