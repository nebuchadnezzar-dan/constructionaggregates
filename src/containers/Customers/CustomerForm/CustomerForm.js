import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import styles from './CustomerForm.module.scss';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Confirmation from '../../../components/UI/Confirmation/Confirmation';
import Modal from '../../../components/UI/Modal/Modal';
import Auxillary from '../../../hoc/Auxillary/Auxillary';

class CustomerForm extends Component {
  state = {
    form: {
      lastName: '',
      firstName: '',
      contactNo: ''
    },
    confirmation: false,
    feedback: false
  };

  onInputChangeHandler = (name, e) => {
    this.setState({ form: { ...this.state.form, [name]: e.target.value } });
  };
  onClickSaveHandler = () => {
    this.setState({ confirmation: true, feedback: false });
    this.props.localPopupDispatchDispatch({ from: 'localModalCustomerForm', value: true, global: true });
  };

  onSendPostRequest = () => {
    this.props.globalPopupDispatch();
    this.props.postCustomerDispatch(this.state.form);
    this.props.localPopupDispatchDispatch({ from: 'localModalCustomerForm', value: true, global: true });
    this.setState({ form: { lastName: '', firstName: '', contactNo: '' }, confirmation: false, feedback: true });
  }

  onCloseModalHandler = () => {
    this.props.globalPopupDispatch();
    this.setState({ confirmation: false, feedback: false });
  }

  render() {
    const modalBody = this.props.localPopup && this.props.globalPopup ?
      <Modal>
        <Confirmation
          confirmation={this.state.confirmation}
          error={this.props.error}
          proceed={this.onSendPostRequest.bind(null)}
          feedback={this.state.feedback}
          okClose={this.onCloseModalHandler.bind(null)}

        />
      </Modal>
      : null;
    const spinner = this.props.loading ? <Spinner color="grey" /> : (
      <Auxillary>
        {modalBody}
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
                  type="text"
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
      </Auxillary>
    );
    return spinner;
  }
}

const mapStateToProps = state => ({
  loading: state.customer.postLoading,
  error: state.customer.postError,
  localPopup: state.modal.localModalCustomerForm,
  globalPopup: state.modal.showGlobalModal
});

const mapDispatchToProps = dispatch => ({
  addCustomerDispatch: customer => dispatch(actions.addCustomer(customer)),
  postCustomerDispatch: data => dispatch(actions.postCustomer(data)),
  globalPopupDispatch: () => dispatch(actions.toggleGlobalModal()),
  localPopupDispatchDispatch: local => dispatch(actions.toggleLocalPopupSettings(local))

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerForm);
