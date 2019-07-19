import React, { Component } from 'react';

import styles from './Truck.module.scss';
import Auxillary from '../../hoc/Auxillary/Auxillary';

class Truck extends Component {
  state = {
    truckValue: '',
    copyTrucks: [],
    activeTruck: ''
  };

  componentDidMount() {
    this.setState({
      copyTrucks: this.props.trucks.map((truck, i) => ({
        ...truck,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        index: i
      }))
    });
  }
  onTruckHandler = e => {
    this.setState({ truckValue: e.target.value });
  };

  onTruckClickHandler = i => {
    this.setState({ activeTruck: i });
  };

  render() {
    return (
      <Auxillary>
        <div className={styles.search}>
          <div />
          <span className={styles.searchIcon}>&#9906;</span>
          <input
            className={styles.input}
            placeholder="Truck"
            type="text"
            value={this.state.truckValue}
            onChange={this.onTruckHandler}
          />
        </div>
        <div className={styles.truckLabel}>
          {'Plate No: '}
          {this.state.activeTruck !== '' ? (
            <span>{this.state.copyTrucks[this.state.activeTruck].plateNo}</span>
          ) : (
            <span>Please choose a Truck to deliver the goods</span>
          )}
        </div>
        <div className={styles.truckWrapper}>
          {this.state.copyTrucks
            .filter(tr =>
              tr.plateNo
                .toLowerCase()
                .includes(this.state.truckValue.toLowerCase())
            )
            .map((truck, i) => {
              return (
                <div
                  key={i}
                  onClick={this.onTruckClickHandler.bind(null, truck.index)}
                  className={[
                    styles.truck,
                    this.state.activeTruck === truck.index
                      ? styles.activeTruck
                      : null
                  ].join(' ')}
                  style={{ backgroundColor: truck.color.padEnd(7, 0) }}
                >
                  {'Plate No: ' + truck.plateNo + ' ' + truck.color}
                </div>
              );
            })}
        </div>
      </Auxillary>
    );
  }
}

export default Truck;
