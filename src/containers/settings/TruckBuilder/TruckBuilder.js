import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

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
    }
  };

  onChangeValueHandler = async (index, name, event) => {
    // an index should be able to handle an object that holds the value of each field in an array
    this.props.valueChangeDispatch(index, name, event.target.value);
    // const copiedState = [...this.state.truckForms];
    // copiedState[index] = {
    //   ...copiedState[index],
    //   [name]: event.target.value
    // };

    // this.setState({ truckForms: copiedState });
  };

  render() {
    return (
      <div className={styles.truckComponent}>
        <label>TRUCK</label>{' '}
        <div className={styles.truckForm}>
          {' '}
          {this.props.truckForm.map((el, i) => {
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
                  click={this.props.removeTruckDispatch.bind(null, i)}
                >
                  X
                </Button>
                {input}
              </div>
            );
          })}
        </div>
        <div className={styles.buttonPosition}>
          <Button cName="Main" click={this.props.addTruckDispatch}>
            Add More Truck
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  truckForm: state.truckSettings.trucks
});

const mapDispatchToProps = dispatch => ({
  addTruckDispatch: () => dispatch(actions.addTruck()),
  removeTruckDispatch: index => dispatch(actions.removeTruck(index)),
  valueChangeDispatch: (index, name, value) =>
    dispatch(actions.valueChangeTruck(index, name, value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TruckBuilder);
