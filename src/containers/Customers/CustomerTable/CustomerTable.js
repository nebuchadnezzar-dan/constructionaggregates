import React, { Component } from 'react';

import styles from './CustomerTable.module.scss';

import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import Button from '../../../components/UI/Button/Button';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Spinner from '../../../components/UI/Spinner/Spinner';

const tableHead = [
  { display: 'customer', sort: 'lastName' },
  { display: 'contact no', sort: 'contactNo' },
  { display: 'credit', sort: 'credit' },
  { display: 'date registered', sort: 'dateRegistered' },
  { display: 'no. of times purchased', sort: 'timesPurchased' }
];

class CustomerTable extends Component {
  state = {
    localCustomers: [],
    localCustomersFilter: [],
    customerSearchForm: ''
  };
  componentDidMount() {
    this.setState({ localCustomers: this.props.customersRedux });
  }

  searchFormHandler = e => {
    this.setState({ customerSearchForm: e.target.value });
  };

  onSearchPress = e => {
    if (e.keyCode === 13) {
      this.onSearchClick();
    }
  }

  sortClick = (direction, head) => {
    this.props.sortDispatch(head, direction === 'down' ? 'desc' : 'asc');
    this.props.fetchCustomersDispatch(1, head, direction === 'down' ? 'desc' : 'asc');
  };

  onViewClick = (index) => {
    this.props.fetchCustomer(this.state.localCustomers[index].id);
    this.props.toggleViewModeDispatch('editing');
  }

  onSearchClick = () => {
    this.props.searchCustomerDispatch(1, this.state.customerSearchForm);
  }

  render() {

    let body = <div className={styles.cutomerTable}>
      <table>
        <thead>
          <tr>
            {tableHead.map((head, i) => (
              <th key={i}>
                <div className={styles.sortButtonWrapper}>
                  <div>{head.display}</div>
                  <div className={styles.sortButton}>
                    <Button
                      cName="smallUp"
                      click={this.sortClick.bind(null, 'up', head.sort)}
                    >
                      {' '}
                      &#9650;
                </Button>
                    <Button
                      cName="smallDown"
                      click={this.sortClick.bind(null, 'down', head.sort)}
                    >
                      {' '}
                      &#9650;
                </Button>
                  </div>
                </div>
              </th>
            ))}
            <th>
              <div className={styles.sortButtonWrapper}>
                <div>Action</div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.customersRedux
            .map((customer, i) => {
              return (
                <tr
                  key={i}
                  className={i % 2 === 0 ? styles.even : styles.odd}
                >
                  <td>{`${customer.lastName}, ${customer.firstName}`}</td>
                  <td>{customer.contactNo}</td>
                  <td>{customer.credit}</td>
                  <td>{customer.dateRegistered}</td>
                  <td>{customer.timesPurchased}</td>
                  <td>
                    <Button cName="delete" click={this.onViewClick.bind(null, i)}>&#128065;</Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>;

    if (this.props.pages < 1) {
      body = <div>
        Sorry, no matches found...
    </div>
    }

    return (
      <Auxillary>
        {' '}
        <div className={styles.searchWrapper}>
          <div className={styles.search}>
            <span className={styles.searchIcon}>&#9906;</span>
            <input
              className={styles.input}
              placeholder="Customer"
              type="text"
              value={this.state.customerSearchForm}
              onChange={this.searchFormHandler}
              onKeyDown={this.onSearchPress}
            />
          </div>
          <Button color="red" click={this.onSearchClick} disabled={this.state.customerSearchForm.length < 3 ? true : false}>Search</Button>
        </div>
        {this.props.loading ? <Spinner color="grey" /> : body}
      </Auxillary>
    );
  }
}

const mapStateToProps = state => ({
  customersRedux: state.customer.customer,
  customerCreditRedux: state.customer.creditSummary,
  loading: state.customer.searchLoading,
  pages: state.customer.pages
});

const mapDispatchToProps = dispatch => ({
  fetchCustomer: id => dispatch(actions.fetchCustomer(id)),
  toggleViewModeDispatch: mode => dispatch(actions.toggleCustomerView(mode)),
  searchCustomerDispatch: (page, data) => dispatch(actions.searchCustomer(page, data)),
  sortDispatch: (sort, order) => dispatch(actions.setCustomerSorting(sort, order)),
  fetchCustomersDispatch: (page, sort, order) => dispatch(actions.fetchCustomers(page, sort, order))
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerTable);
