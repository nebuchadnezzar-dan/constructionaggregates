import React, { Component } from 'react';

import { Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux'

import Auxillary from './hoc/Auxillary/Auxillary';
import Layout from './hoc/Layout/Layout';
import Invoice from './containers/Invoice/Invoice';
import Customers from './containers/Customers/Customers';
import Truck from './containers/settings/TruckBuilder/TruckBuilder';
import Supply from './containers/settings/Supply/Supply';
import Transaction from './containers/Invoice/Transactions/Transaction/Transaction';
import Auth from './containers/Auth/Auth';

class App extends Component {
  constructor() {
    super()
    this.state = {
      isAuthenticated: false
    }
    this.token = window.sessionStorage.getItem('token')
  }


  componentDidMount() {
    if (this.token) {
      this.setState({ isAuthenticated: true })
      this.props.history.push({ pathname: sessionStorage.getItem('route') })
    } else {
      this.props.history.push({ pathname: '/' })
    }
    console.log(this.state.isAuthenticated)
  }



  render() {
    const display = (
      <Layout>
        <Route path="/dashboard" render={() => <div>Dashboard</div>} />
        {/* <Route path="/settings" component={Settings} /> */}
        <Route path="/settings/truck" component={Truck} />
        <Route path="/settings/supply" component={Supply} />
        <Route path="/user" render={() => <div>User</div>} />
        <Route path="/pos" exact component={Invoice} />
        <Route path="/pos/:id/invoice" component={Transaction} />
        <Route path="/customers" component={Customers} />
        <Route path="/notifications" render={() => <div>Notifications</div>} />
        <Route path="/support" render={() => <div>Support</div>} />
        {/* <Settings /> */}
      </Layout>
    );
    return (
      <Auxillary>
        {this.token || this.props.isAuthenticated || this.state.isAuthenticated ? display : <Route path="/" exact component={Auth} />}

        {/* <button onClick={this.onSwitch}>Switch</button> */}
      </Auxillary>
    );
  }

};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.authenticated
})

export default connect(mapStateToProps)(withRouter(App));
