import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import styles from './POSCustomer.module.scss';

import Button from '../../UI/Button/Button';
import InputSearch from '../../UI/InputSearch/InputSearch';

class POSCustomer extends Component {
  state = {
    customer: 'display'
  };

  toggleSearch = display => {
    // this.setState({ customer: display });
    this.props.toggleSearchDispatch(display);
  };

  render() {
    const name =
      typeof this.props.activeCustomer === 'string'
        ? 'Choose a Customer'
        : `${this.props.activeCustomer.lastName}, ${
        this.props.activeCustomer.firstName
        }`;
    const display =
      this.props.displayCustomer === 'display' ? (
        <div className={styles.customerNameDisplay}>{name}</div>
      ) : (
          <div className={styles.customerName}>
            <InputSearch
              elementConfig={{ placeholder: 'Customer Name' }}
              data={this.props.customersRedux}
              component="customer"
            />
          </div>
        );
    const disabled = this.props.fetchLoadingTruck ? true : false;
    return (
      <div className={styles.customerWrapper}>
        <div className={styles.customerImgWrapper}>
          <img
            src="https://img2.thejournal.ie/inline/3656556/original/?width=400&version=3656556"
            alt="ph hub"
            className={styles.customerImg}
          />
          {/* <div className={styles.customerImg} /> */}
        </div>
        <div className={styles.customerNameWrapper}>
          <div className={styles.customerInputWrapper}>
            {display}
            {this.props.displayCustomer === 'display' ? (
              <Button
                disabled={disabled}
                color="blue"
                cName="searchCustomerPOS"
                click={this.toggleSearch.bind(null, 'input')}
              >
                <span className={styles.searchIconButton}>&#9906;</span>
              </Button>
            ) : (
                <Button
                  color="orange"
                  cName="searchCustomerPOS"
                  click={this.toggleSearch.bind(null, 'display')}
                >
                  X
              </Button>
              )}
          </div>
          <p>
            {this.props.activeCustomer.totalPurchased - this.props.activeCustomer.totalPayment > 0
              ? 'Customer with Credit'
              : 'Customer without Credit'}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  customersRedux: state.customer.customer,
  activeCustomer: state.invoicePOS.customer,
  displayCustomer: state.invoicePOS.displayCustomer,
  fetchLoadingTruck: state.truckSettings.loading,
});

const mapDispatchToProps = dispatch => ({
  toggleSearchDispatch: toggle =>
    dispatch(actions.toggleCustomerDisplay(toggle))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(POSCustomer);
