import React, { Component } from 'react';

import { formFunction, orderSelect } from '../../../util/inputHelper';

import Input from '../../../components/UI/Input/Input';

class TruckBuilder extends Component {
  state = {
    truckForm: {
      size: formFunction('input', 'number', '0', null, null, null),
      maxLoad: formFunction('input', 'number', '0', null, null, null),
      plateNo: formFunction('input', 'text', 'Plate Numer', null, null, null),
      status: formFunction('select', null, null, [
        orderSelect('maintenance', 'Maintenance'),
        orderSelect('delivering', 'Delivering'),
        orderSelect('other', 'Other')
      ])
    }
  };
  render() {
    let input = [];
    for (let formKey in this.state.truckForm) {
      input.push(
        <Input
          key={formKey}
          elementInputType={this.state.truckForm[formKey].elementType}
          elementConfig={this.state.truckForm[formKey].elementConfig}
        />
      );
    }
    return input;
  }
}

export default TruckBuilder;
