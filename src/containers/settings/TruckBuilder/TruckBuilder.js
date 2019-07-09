import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import { formFunction, selectOptions } from '../../../util/inputHelper';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Head from '../../../components/UI/Head/Head';

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
    this.props.valueChangeDispatch(index, name, event.target.value);
  };

  render() {
    return (
      <Auxillary>
        <div className={styles.truckComponent}>
          <Head classname="green" svgname="truck">
            TRUCK
          </Head>
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
          <div className={styles.buttonPosition}>
            <Button cName="Main" click={this.props.addTruckDispatch}>
              Add More Truck
            </Button>
          </div>
        </div>
      </Auxillary>
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
