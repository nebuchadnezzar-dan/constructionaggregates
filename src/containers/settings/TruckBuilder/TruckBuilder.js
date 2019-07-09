import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import { formFunction, selectOptions } from '../../../util/inputHelper';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Head from '../../../components/UI/Head/Head';
import HeadChild from '../../../components/UI/HeadChild/HeadChild';

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
    view: 'form'
  };

  onChangeValueHandler = async (index, name, event) => {
    this.props.valueChangeDispatch(index, name, event.target.value);
  };

  render() {
    const view = (
      <div className={styles.view}>
        <div>
          {this.props.availableTrucks.map((truck, i) => (
            <div style={{ display: 'flex' }} key={i}>
              <div>Plate No: {truck.plateNo}</div>
              <div>Max Load: {truck.maxLoad}</div>
              <div>Status: {truck.status}</div>
            </div>
          ))}
        </div>
      </div>
    );

    let toBeShown =
      this.props.view === 'form' ? (
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
                  color="green"
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
      ) : (
        view
      );
    let button =
      this.props.view === 'form' ? (
        <div className={styles.buttonPosition}>
          <Button cName="Main" click={this.props.addTruckDispatch}>
            &#9951; Add More Truck
          </Button>
          <Button cName="mainSave" click={this.props.saveTrucksDispatch}>
            {' '}
            &#10004; Save
          </Button>
        </div>
      ) : null;
    return (
      <div className={styles.truckComponent}>
        <Head classname="green" svgname="truck">
          <HeadChild>TRUCK</HeadChild>
        </Head>
        {toBeShown}
        {button}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  truckForm: state.truckSettings.trucks,
  availableTrucks: state.truckSettings.availableTrucks,
  view: state.truckSettings.view
});

const mapDispatchToProps = dispatch => ({
  addTruckDispatch: () => dispatch(actions.addTruck()),
  removeTruckDispatch: index => dispatch(actions.removeTruck(index)),
  valueChangeDispatch: (index, name, value) =>
    dispatch(actions.valueChangeTruck(index, name, value)),
  saveTrucksDispatch: () => dispatch(actions.saveTruck())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TruckBuilder);
