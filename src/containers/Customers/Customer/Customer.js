import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import styles from './Customer.module.scss';

import Button from '../../../components/UI/Button/Button';
import Auxillary from '../../../hoc/Auxillary/Auxillary';

class Customer extends Component {

    state = {
        mode: 'view',
        form: {
            lastName: '',
            firstName: '',
            contactNo: ''
        }
    }

    onChangeInput = (name, e) => {
        this.setState({ form: { ...this.state.form, [name]: e.target.value } });
    }

    onChangeMode = mode => {
        this.setState({ mode: mode });
    }

    render() {
        let { id, lastName, firstName, contactNo } = this.props.data;
        const name = `${this.props.data.lastName}, ${this.props.data.firstName}`;

        let buttonMode = this.state.mode === 'view' ? <Button color="blue" click={this.onChangeMode.bind(null, 'edit')}>Edit</Button> : <Auxillary>
            <Button color="blue" click={this.onChangeMode.bind(null, 'view')}>Cancel</Button>
            <Button color="green">Save</Button>
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

        return <div>
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
                        <Button color="red">Delete</Button>
                        <Button color="orange">Credits</Button>
                        <Button color="violet">Purchase History</Button>
                    </div>


                </div>

            </div>
        </div>
    }

};

const maptStateToProps = state => ({
    data: state.customer.viewedCustomer
});

const mapDispatchToProps = dispatch => ({
    // fetchCustomer: id => dispatch(actions.fetchCustomer(id))
});

export default connect(maptStateToProps, mapDispatchToProps)(Customer);