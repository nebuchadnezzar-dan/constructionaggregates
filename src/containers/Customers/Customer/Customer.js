import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as axios from '../../../axios-orders';

import * as actions from '../../../store/actions/index';

import styles from './Customer.module.scss';

import Button from '../../../components/UI/Button/Button';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Modal from '../../../components/UI/Modal/Modal';
import Confirmation from '../../../components/UI/Confirmation/Confirmation';
import Spinner from '../../../components/UI/Spinner/Spinner';

class Customer extends Component {

    state = {
        mode: 'view',
        form: {
            lastName: '',
            firstName: '',
            contactNo: ''
        },
        feedback: false,
        confirmation: false
    }


    onChangeInput = (name, e) => {
        this.setState({ form: { ...this.state.form, [name]: e.target.value } });
    }

    onChangeMode = mode => {
        this.setState({ mode: mode, form: { ...this.form, lastName: this.props.data.lastName, firstName: this.props.data.firstName, contactNo: this.props.data.contactNo } });
    }

    onSendPostRequest = () => {
        this.props.globalPopupDispatch();
        this.props.putCustomerDispatch(this.props.data.id, this.state.form);
        // console.log(this.props.data.id, this.state.form)
        this.props.localPopupDispatchDispatch({ from: 'localModalCustomerTable', value: true, global: true });
        this.setState({ form: { lastName: '', firstName: '', contactNo: '' }, confirmation: false, feedback: true, mode: 'view' });
    }

    onCloseModalHandler = () => {
        this.props.globalPopupDispatch();
        this.setState({ confirmation: false, feedback: false });
    }

    onConfirm = button => {
        if (button === 'edit') {
            this.setState({ confirmation: true, feedback: false });
            this.props.localPopupDispatchDispatch({ from: 'localModalCustomerTable', value: true, global: true });
        }
    }



    render() {
        let { id, lastName, firstName, contactNo } = this.props.data;
        const name = `${this.props.data.lastName}, ${this.props.data.firstName}`;

        let buttonMode = this.state.mode === 'view' ? <Auxillary>
            <Button color="blue" click={this.onChangeMode.bind(null, 'edit')}>Edit</Button>
            <Button color="red">Delete</Button>
        </Auxillary> : <Auxillary>
                <Button color="blue" click={this.onChangeMode.bind(null, 'view')}>Cancel</Button>
                <Button color="green" click={this.onConfirm.bind(null, 'edit')}>Save</Button>
            </Auxillary>;

        if (this.state.mode === 'edit') {
            lastName = <input type="text" placeholder="Last Name" value={this.state.form.lastName} onChange={this.onChangeInput.bind(this, 'lastName')} />;
            firstName = <input type="text" placeholder="First Name" value={this.state.form.firstName} onChange={this.onChangeInput.bind(this, 'firstName')} />;
            contactNo = <input type="text" placeholder="Customer Number" value={this.state.form.contactNo} onChange={this.onChangeInput.bind(this, 'contactNo')} />;
        } else {
            lastName = this.props.data.lastName;
            firstName = this.props.data.firstName;
            contactNo = this.props.data.contactNo;
        }

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

        const spinner = this.props.loading ? <Spinner color="grey" /> : <div>
            {modalBody}
            <div className={styles.customerWrapper}>
                <div className={styles.title}>{id} | {name} </div>
                <div className={styles.body}>
                    <div>
                        <div className={styles.label}>Last Name</div>
                        <div className={styles.value}>{lastName}</div>
                    </div>
                    <div>
                        <div className={styles.label}>First Name</div>
                        <div className={styles.value}>{firstName}</div>
                    </div>
                    <div>
                        <div className={styles.label}>Contact No.</div>
                        <div className={styles.value}>{contactNo}</div>
                    </div>

                    <hr className={styles.line} />

                    <div>
                        {buttonMode}
                        <Button color="orange">Credits</Button>
                        <Button color="violet">Purchase History</Button>
                    </div>


                </div>

            </div>
        </div>;

        return spinner;
    }

};

const maptStateToProps = state => ({
    data: state.customer.viewedCustomer,
    loading: state.customer.putLoading,
    error: state.customer.putError,
    localPopup: state.modal.localModalCustomerTable,
    globalPopup: state.modal.showGlobalModal
});

const mapDispatchToProps = dispatch => ({
    globalPopupDispatch: () => dispatch(actions.toggleGlobalModal()),
    localPopupDispatchDispatch: local => dispatch(actions.toggleLocalPopupSettings(local)),
    putCustomerDispatch: (id, customer) => dispatch(actions.putCustomer(id, customer))
});

export default connect(maptStateToProps, mapDispatchToProps)(Customer);