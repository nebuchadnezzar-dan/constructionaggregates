import React, { Component } from 'react';

import styles from './CustomerTable.module.scss';

import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Auxillary from '../../../hoc/Auxillary/Auxillary';

const tableHead = [
  { display: 'customer', sort: 'lastName' },
  { display: 'credit', sort: 'credit' },
  { display: 'date registered', sort: 'dateRegistered' },
  { display: 'no. of times purchased', sort: 'timesPurchased' }
];

const sort = (arr, property, dir) => {
  return arr.sort((a, b) => {
    const prev =
      typeof a[property] === 'string' ? a[property].toLowerCase() : a[property];
    const next =
      typeof b[property] === 'string' ? b[property].toLowerCase() : b[property];
    if (typeof a[property] === 'string') {
      if (dir === 'up') {
        if (prev < next) {
          return -1;
        } else if (prev > next) {
          return 1;
        }
        return 0;
      } else if (dir === 'down') {
        if (prev < next) {
          return 1;
        } else if (prev > next) {
          return -1;
        }
        return 0;
      }
    } else {
      if (dir === 'up') {
        return prev - next;
      } else if (dir === 'down') {
        return next - prev;
      }
    }
  });
};

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

  sortClick = (direction, head) => {
    let customerCopy = [...this.state.localCustomers];
    this.setState({ localCustomers: sort(customerCopy, head, direction) });
  };

  render() {
    return (
      <Auxillary>
        {' '}
        <div className={styles.search}>
          <div />
          <span className={styles.searchIcon}>&#9906;</span>
          <input
            className={styles.input}
            placeholder="Customer"
            type="text"
            value={this.state.customerSearchForm}
            onChange={this.searchFormHandler}
          />
        </div>
        <div className={styles.cutomerTable}>
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
              {this.state.localCustomers
                .filter(
                  customer =>
                    customer.lastName
                      .toLowerCase()
                      .includes(this.state.customerSearchForm.toLowerCase()) ||
                    customer.firstName
                      .toLowerCase()
                      .includes(this.state.customerSearchForm.toLowerCase()) ||
                    customer.dateRegistered
                      .toLowerCase()
                      .includes(this.state.customerSearchForm.toLowerCase())
                )
                .map((customer, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? styles.even : styles.odd}
                  >
                    <td>{`${customer.lastName}, ${customer.firstName}`}</td>
                    <td>{customer.credit}</td>
                    <td>{customer.dateRegistered}</td>
                    <td>{customer.timesPurchased}</td>
                    <td>
                      <Button cName="delete">&#128465;</Button>
                      <Button cName="edit">&#9998;</Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className={styles.tableButtons}>
          <div>
            <Button> &#171;</Button>
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
            <Button>4</Button>
            <Button>&#187;</Button>
          </div>
        </div>
      </Auxillary>
    );
  }
}

const mapStateToProps = state => ({
  customersRedux: state.customer.customer
});

export default connect(mapStateToProps)(CustomerTable);
