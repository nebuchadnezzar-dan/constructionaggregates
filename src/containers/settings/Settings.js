import React, { Component } from 'react';

import { connect } from 'react-redux';

import axios from '../../axios-orders';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Auxillary from '../../hoc/Auxillary/Auxillary';
import TruckBuilder from './TruckBuilder/TruckBuilder';
import Supply from './Supply/Supply';

class Settings extends Component {
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
    return (
      <Auxillary>
        {this.props.children}
        {bodyWithError}
      </Auxillary>
    );
  }
}

const mapStateToProps = state => ({
  errorTruck: state.truckSettings.error,
  errorSupply: state.supplySettings.error
})

export default connect(mapStateToProps)(withErrorHandler(Settings, axios));
