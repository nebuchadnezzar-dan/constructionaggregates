import React, { Component } from 'react';

import Auxillary from '../../hoc/Auxillary/Auxillary';
import TruckBuilder from './TruckBuilder/TruckBuilder';

class Settings extends Component {
  render() {
    return (
      <Auxillary>
        <TruckBuilder />
        <div>SUPPLY</div>
      </Auxillary>
    );
  }
}

export default Settings;
