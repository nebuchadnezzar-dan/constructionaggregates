import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import styles from './CustomerForm.module.scss';

import Button from '../../../components/UI/Button/Button';

class CustomerForm extends Component {
  state = {
    form: {
      lastName: '',
      firstName: '',
      contactNo: ''
    }
  };

  onInputChangeHandler = (name, e) => {
    this.setState({ form: { ...this.state.form, [name]: e.target.value } });
  };
  onClickSaveHandler = () => {
    this.props.addCustomerDispatch({
      lastName: this.state.form.lastName,
      firstName: this.state.form.firstName,
      contactNo: this.state.form.contactNo
    });
    this.setState({ form: { lastName: '', firstName: '', contactNo: '' } });
  };
  render() {
    return (
      <div>
        <div className={styles.customer}>
          <div className={styles.title}>New Customer</div>
          <div className={styles.customerBody}>
            <div>
              <div className={styles.customerName}>Last Name</div>
              <div className={styles.customerInputWrapper}>
                <input
                  type="text"
                  placeholder="Last Name"
                  className={styles.customerInput}
                  onChange={this.onInputChangeHandler.bind(this, 'lastName')}
                  value={this.state.form.lastName}
                />
              </div>
            </div>
            <div>
              <div className={styles.customerName}>First Name</div>
              <div className={styles.customerInputWrapper}>
                <input
                  type="text"
                  placeholder="First Name"
                  className={styles.customerInput}
                  onChange={this.onInputChangeHandler.bind(this, 'firstName')}
                  value={this.state.form.firstName}
                />
              </div>
            </div>
            <div>
              <div className={styles.customerName}>Contact No.</div>
              <div className={styles.customerInputWrapper}>
                <input
                  type="number"
                  placeholder="Contact Number"
                  className={styles.customerInput}
                  onChange={this.onInputChangeHandler.bind(this, 'contactNo')}
                  value={this.state.form.contactNo}
                />
              </div>
            </div>
            <Button color="red" click={this.onClickSaveHandler}>
              Save
          </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addCustomerDispatch: customer => dispatch(actions.addCustomer(customer))
});

export default connect(
  null,
  mapDispatchToProps
)(CustomerForm);
