import React, { Component } from 'react';

import { formFunction, selectOptions } from '../../../util/inputHelper';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

import styles from './TruckBuilder.module.scss';

class TruckBuilder extends Component {
  state = {
    truckForm: {
      maxLoad: formFunction('input', 'number', '0', null, null, null),
      plateNo: formFunction('input', 'text', 'Plate Numer', null, null, null),
      status: formFunction('select', null, null, [
        selectOptions('maintenance', 'Maintenance'),
        selectOptions('delivering', 'Delivering'),
        selectOptions('other', 'Other')
      ])
    },
    truckForms: [{ maxLoad: '', plateNo: '', status: 'maintenance' }]
  };

  inputParser = value => {
    let input = [];
    for (let formKey in this.state.truckForm) {
      input.push(
        <Input
          key={formKey + Date.now()}
          name={formKey}
          elementInputType={this.state.truckForm[formKey].elementType}
          elementConfig={this.state.truckForm[formKey].elementConfig}
          change={this.onChangeValueHandler}
          value={value}
        />
      );
    }
    return input;
  };
  addTruckHandler = () => {
    this.setState({
      truckForms: [
        ...this.state.truckForms,
        { maxLoad: '', plateNo: '', status: 'maintenance' }
      ]
    });
    console.log(this.state.truckForms);
  };
  removeTruckHandler = async index => {
    console.log(index);
    await this.setState({
      truckForms: this.state.truckForms.filter((_, i) => i !== index)
    });
    console.log(this.state.truckForms);
  };
  onChangeValueHandler = async (index, name, event) => {
    // an index should be able to handle an object that holds the value of each field in an array
    const copiedState = [...this.state.truckForms];
    copiedState[index] = {
      ...copiedState[index],
      [name]: event.target.value
    };

    this.setState({ truckForms: copiedState });
  };

  render() {
    return (
      <div className={styles.truckComponent}>
        <label>TRUCK</label>{' '}
        <div className={styles.truckForm}>
          {' '}
          {this.state.truckForms.map((el, i) => {
            let input = [];
            for (let formKey in this.state.truckForm) {
              input.push(
                <Input
                  key={formKey}
                  name={formKey}
                  elementInputType={this.state.truckForm[formKey].elementType}
                  elementConfig={this.state.truckForm[formKey].elementConfig}
                  change={this.onChangeValueHandler}
                  value={el[formKey]}
                  ind={i}
                />
              );
            }
            return (
              <div key={i} className={styles.rowForm}>
                <Button
                  cName="Close"
                  click={this.removeTruckHandler.bind(null, i)}
                >
                  X
                </Button>
                {input}
              </div>
            );
          })}
        </div>
        <div className={styles.buttonPosition}>
          <Button cName="Main" click={this.addTruckHandler}>
            Add More Truck
          </Button>
        </div>
      </div>
    );
  }
}

export default TruckBuilder;
