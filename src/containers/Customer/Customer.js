import React, { Component } from 'react';

import { connect } from 'react-redux';

import axios from '../../axios-orders';

import * as actions from '../../store/actions/index';

import styles from './Customer.module.scss';

import Head from '../../components/UI/Head/Head';
import HeadChild from '../../components/UI/HeadChild/HeadChild';
import CustomerTable from './CustomerTable/CustomerTable';
import CustomerForm from './CustomerForm/CustomerForm';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorBody from '../../components/UI/ErrorBody/ErrorBody';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Customer extends Component {
  state = {
    activeView: 'form'
  };

  async componentDidMount() {
    this.props.fetchCustomers(1);
  }

  onToggleView = view => {
    this.setState({ activeView: view });
  };
  render() {
    const customerView = <CustomerTable />;
    const customerForm = <CustomerForm />;
    const customer =
      this.state.activeView === 'form' ? customerView : customerForm;
    const mainBody = (
      <div className={styles.cutomerMain}>
        {this.props.children}
        <Head classname="red" svgname="customer">
          <HeadChild
            forClassName={this.state.activeView}
            dispatchClickView={this.onToggleView.bind(null, 'view')}
            dispatchClickForm={this.onToggleView.bind(null, 'form')}
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
  error: state.customer.fetchError
});

const maptDispatchToProps = dispatch => ({
  fetchCustomers: page => dispatch(actions.fetchCustomer(page))
});

export default connect(mapStateToProps, maptDispatchToProps)(withErrorHandler(Customer, axios));
