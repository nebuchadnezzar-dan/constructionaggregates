import React, { Component } from 'react';

import { connect } from 'react-redux';

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
        confirmation: false,
        button: ''
    }


    onChangeInput = (name, e) => {
        this.setState({ form: { ...this.state.form, [name]: e.target.value } });
    }

    onChangeMode = mode => {
        this.setState({ mode: mode, form: { ...this.form, lastName: this.props.data.lastName, firstName: this.props.data.firstName, contactNo: this.props.data.contactNo } });
    }

    onSendPostRequest = async () => {
        this.props.globalPopupDispatch();
        if (this.state.button === 'edit') {
            this.props.putCustomerDispatch(this.props.data.id, this.state.form);
            this.props.localPopupDispatchDispatch({ from: 'localModalCustomerTable', value: true, global: true });
        } else {
            await this.props.deleteCustomerDispatch(this.props.data.id);
            await this.props.localPopupDispatchDispatch({ from: 'localModalDeleteSettings', value: true, global: true });
            // await this.props.fetchCustomers(1);
            // this.props.toggleViewModeDispatch('table');


        }
        this.setState({ form: { lastName: '', firstName: '', contactNo: '' }, confirmation: false, feedback: true, mode: 'view' });
    }

    onCloseModalHandler = () => {
        this.props.globalPopupDispatch();
        this.setState({ confirmation: false, feedback: false });
    }

    onConfirm = button => {
        this.setState({ confirmation: true, feedback: false, button: button });
        this.props.localPopupDispatchDispatch({ from: 'localModalCustomerTable', value: true, global: true });

    }

    onClickBack = () => {
        this.props.toggleViewModeDispatch('table');
        this.props.fetchCustomers(1);
    }


    render() {
        let { id, lastName, firstName, contactNo, dateRegistered } = this.props.data;
        const name = `${this.props.data.lastName}, ${this.props.data.firstName}`;

        let buttonMode = this.state.mode === 'view' ? <Auxillary>
            <Button color="blue" click={this.onChangeMode.bind(null, 'edit')}>Edit</Button>
            <Button color="red" click={this.onConfirm.bind(null, 'delete')}>Delete</Button>
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

        const modalBody = (this.props.localPopup && this.props.globalPopup) || this.props.deletedModal ?
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

        let mainBody = <div className={styles.customerWrapper}>
            <div className={styles.title}>{id} | {name} </div>
            <div className={styles.body}>
                <div>
                    <div className={styles.label}>Date Registered</div>
                    <div className={styles.value}>{dateRegistered}</div>
                </div>
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
        </div>;

        if (this.props.deleted) {
            mainBody = <Auxillary>
                <div className={styles.deleted}>
                    <span>&#10004;</span>
                    <div>CUSTOMER SUCCESSFULLY REMOVED!</div></div>
                <hr />
            </Auxillary>;
        }
        if (this.props.error) {
            mainBody = <Auxillary>
                <div className={styles.deleted}>
                    <span>&#10006;</span>
                    <div>SOMETHING WENT WRONG!</div></div>
                <hr />
            </Auxillary>;
        }

        const tempBody = <Auxillary>
            <div className={styles.smallHead}>
                <Button cName="flat" color="red" click={this.onClickBack.bind(null)}><span>&#171;</span> Go Back</Button>
            </div>
            <div className={styles.smallBody}>
                {modalBody}
                {mainBody}
            </div>
        </Auxillary>

        let spinner = this.props.loading ? <Spinner color="grey" /> : tempBody;

        return spinner;
    }

};

const maptStateToProps = state => ({
    data: state.customer.viewedCustomer,
    loading: state.customer.putLoading,
    error: state.customer.putError,
    localPopup: state.modal.localModalCustomerTable,
    globalPopup: state.modal.showGlobalModal,
    deletedModal: state.modal.localModalDeleteSettings,
    deleted: state.customer.deleted
});

const mapDispatchToProps = dispatch => ({
    globalPopupDispatch: () => dispatch(actions.toggleGlobalModal()),
    localPopupDispatchDispatch: local => dispatch(actions.toggleLocalPopupSettings(local)),
    putCustomerDispatch: (id, customer) => dispatch(actions.putCustomer(id, customer)),
    deleteCustomerDispatch: id => dispatch(actions.deleteCustomer(id)),
    toggleViewModeDispatch: mode => dispatch(actions.toggleCustomerView(mode)),
    fetchCustomers: page => dispatch(actions.fetchCustomers(page))
});

export default connect(maptStateToProps, mapDispatchToProps)(Customer);