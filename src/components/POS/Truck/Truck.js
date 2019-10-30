import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import styles from './Truck.module.scss';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Spinner from '../../../components/UI/Spinner/Spinner';

class Truck extends Component {
  _isMounted = false;
  state = {
    copyTrucks: []
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.setTruck();
  }


  componentWillUnmount() {
    this._isMounted = false;
  }

  setTruck = () => {
    this.setState({
      copyTrucks: this.props.trucks.map((truck, i) => ({
        ...truck,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        index: i
      }))
    });

  }

  onTruckHandler = e => {
    this.props.editTruckSearchFormDispatch(e.target.value);
  };

  onTruckClickHandler = i => {
    this.props.setTruckDispatch(this.state.copyTrucks[i]);
  };

  render() {
    const disabled = this.props.activeCustomer.length === 0 ? true : false;
    return (
      <Auxillary>
        <div className={styles.search}>
          <div />
          <span className={styles.searchIcon}>&#9906;</span>
          <input
            disabled={disabled}
            className={styles.input}
            placeholder="Truck"
            type="text"
            value={this.props.truckSearchForm}
            onChange={this.onTruckHandler}
          />
        </div>
        <div className={styles.truckLabel}>
          {'Plate No: '}
          {this.props.activeTruck !== '' ? (
            <span>{this.props.activeTruck.plateNo}</span>
          ) : (
              <span>Please choose a Truck to deliver the goods</span>
            )}
        </div>
        {disabled ? null : <div className={styles.truckWrapper}>
          {this.state.copyTrucks
            .filter(tr =>
              tr.plateNo
                .toLowerCase()
                .includes(this.props.truckSearchForm.toLowerCase())
            )
            .map((truck, i) => {
              return (
                <div
                  key={i}
                  onClick={this.onTruckClickHandler.bind(null, truck.index)}
                  className={[
                    styles.truck,
                    this.props.activeTruck.index === truck.index
                      ? styles.activeTruck
                      : null
                  ].join(' ')}
                  style={{ backgroundColor: truck.color.padEnd(7, 0) }}
                >
                  {'Plate No: ' + truck.plateNo + ' ' + truck.color}
                </div>
              );
            })}
        </div>}
      </Auxillary>
    );
  }
}

const mapStateToProps = state => ({
  trucks: state.truckSettings.availableTrucks,
  activeTruck: state.invoicePOS.truck,
  truckSearchForm: state.invoicePOS.truckSearchInput,
  activeCustomer: state.invoicePOS.customer
});

const mapDispatchToProps = dispatch => ({
  setTruckDispatch: truck => dispatch(actions.setTruck(truck)),
  editTruckSearchFormDispatch: value =>
    dispatch(actions.editTruckSearchForm(value)),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Truck);
