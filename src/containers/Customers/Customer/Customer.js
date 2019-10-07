import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import styles from './Customer.module.scss';

class Customer extends Component {

    componentDidMount() {
        // console.log(+this.props.location.pathname.match(/\d+/)[0]);
        // this.props.fetchCustomer(+this.props.location.pathname.match(/\d+/)[0]);

    }

    render() {
        console.log(this.props.data);
        return <div>Customer</div>
    }

};

const maptStateToProps = state => ({
    data: state.customer.viewedCustomer
});

const mapDispatchToProps = dispatch => ({
    // fetchCustomer: id => dispatch(actions.fetchCustomer(id))
});

export default connect(maptStateToProps, mapDispatchToProps)(Customer);