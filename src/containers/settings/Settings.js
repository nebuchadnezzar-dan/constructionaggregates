import React, { Component } from 'react';

import Auxillary from '../../hoc/Auxillary/Auxillary';
import TruckBuilder from './TruckBuilder/TruckBuilder';
import Supply from './Supply/Supply';

class Settings extends Component {
  render() {
    return (
      <Auxillary>
        <TruckBuilder />
        <Supply />
      </Auxillary>
    );
  }
}

export default Settings;
