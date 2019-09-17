import React, { Component } from 'react';

import { connect } from 'react-redux';

import axios from '../../axios-orders';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/index';

import Auxillary from '../../hoc/Auxillary/Auxillary';
import TruckBuilder from './TruckBuilder/TruckBuilder';
import Supply from './Supply/Supply';

import Spinner from '../../components/UI/Spinner/Spinner';

class Settings extends Component {
  componentDidMount() {
    this.props.fetchTruckSettings();
    this.props.fetchSupplySettings();
  }

  render() {
    console.log('[Settings]', this.props.children);
    let bodyWithError = this.props.errorTruck || this.props.errorSupply ?
      (<div style={{ padding: '3rem 4.5rem', backgroundColor: '#fff' }}>
        Can't load Settings!
        </div>) :
      (<Auxillary>
        <TruckBuilder />
        <Supply />
      </Auxillary>);
    let bodyWithErrorAndSpinner = this.props.loadingTruck || this.props.loadingSupply ? <div><Spinner /></div> : bodyWithError;
    return (
      <Auxillary>
        {this.props.children}
        {bodyWithErrorAndSpinner}
      </Auxillary>
    );
  }
}

const mapStateToProps = state => ({
  errorTruck: state.truckSettings.error,
  errorSupply: state.supplySettings.error,
  loadingTruck: state.truckSettings.loading,
  loadingSupply: state.supplySettings.loading
});

const mapDispatchToProps = dispatch => ({
  fetchTruckSettings: () => dispatch(actions.fetchTruck()),
  fetchSupplySettings: () => dispatch(actions.fetchSupply())
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Settings, axios));
