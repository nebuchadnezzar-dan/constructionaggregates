import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import styles from './Customer.module.scss';

import Button from '../../../components/UI/Button/Button';

class Customer extends Component {


    render() {
        const { id, lastName, firstName, contactNo } = this.props.data;
        return <div>
            <div className={styles.customerWrapper}>
                <div className={styles.title}>{id} | {`${lastName}, ${firstName}`} </div>
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
                        <Button color="blue">Edit</Button>
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