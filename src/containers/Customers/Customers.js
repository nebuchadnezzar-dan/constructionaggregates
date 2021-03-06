import React, { Component } from 'react';

import { connect } from 'react-redux';

import axios from '../../axios-orders';

import * as actions from '../../store/actions/index';
import { storeRoute } from '../../util/storeRoute'

import styles from './Customers.module.scss';

import Head from '../../components/UI/Head/Head';
import HeadChild from '../../components/UI/HeadChild/HeadChild';
import CustomerTable from './CustomerTable/CustomerTable';
import CustomerForm from './CustomerForm/CustomerForm';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorBody from '../../components/UI/ErrorBody/ErrorBody';
import Customer from '../Customers/Customer/Customer';
import Pagination from '../../components/UI/Pagination/Pagination';
import Auxillary from '../../hoc/Auxillary/Auxillary';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Customers extends Component {
  state = {
    activeView: 'form',
    currentpage: 1,
    pageIndex: 5,
  };

  async componentDidMount() {
    storeRoute(this.props.location.pathname)
    const route = this.props.location.pathname.match(/[a-zA-z]+/g);
    this.props.fetchCustomers(1, 'lastName', 'asc');
    this.props.activeRouteDispatch(route);
  }


  onChangePage = (page, pageIndex) => {
    this.setState({ currentpage: page, pageIndex });
    this.props.fetchCustomers(page, this.props.sort, this.props.order);
  }

  onToggleView = view => {
    if (view === 'form') {
      this.props.fetchCustomers(1, 'lastName', 'asc');
    }
    if (this.props.viewMode === 'editing') {
      this.props.toggleViewModeDispatch('editing');
    }
    this.setState({ activeView: view });

  };
  render() {
    const customerView =
      <Auxillary>
        <CustomerTable />
        <Pagination
          currentpage={this.props.pages < this.state.currentpage ? 1 : this.state.currentpage}
          pages={this.props.pages}
          color='red'
          pageIndex={this.state.pageIndex}
          clickButton={this.onChangePage}
        />
      </Auxillary>;
    const customerForm = <CustomerForm />;
    const customerInd = <Customer />;
    let customer;
    if (this.state.activeView === 'form' && this.props.viewMode !== 'editing') {
      customer = customerView;
    } else if (this.state.activeView === 'view') {
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
  error: state.customer.fetchError,
  viewMode: state.customer.viewMode,
  pages: state.customer.pages,
  sort: state.customer.sort,
  order: state.customer.order
});

const maptDispatchToProps = dispatch => ({
  fetchCustomers: (page, sort, order) => dispatch(actions.fetchCustomers(page, sort, order)),
  toggleViewModeDispatch: mode => dispatch(actions.toggleCustomerView(mode)),
  activeRouteDispatch: routes => dispatch(actions.activeRoute(routes))
});

export default connect(mapStateToProps, maptDispatchToProps)(withErrorHandler(Customers, axios));
