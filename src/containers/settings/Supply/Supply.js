import React, { Component } from 'react';
import { connect } from 'react-redux';

import { formFunction, selectOptions } from '../../../util/inputHelper';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Unordered from '../../../components/UI/Unordered/Unordered';
import Auxillary from '../../../hoc/Auxillary/Auxillary';

import * as actions from '../../../store/actions/index';

import styles from './Supply.module.scss';

class Supply extends Component {
  state = {};
  // parameters _ is not needed
  onChangeValueHandler = (name, _, __, event) => {
    // console.log(name, event);
    this.props.supplyChangeValueDispatch(name, event.target.value);
  };

  onAddSupplyHandler = name => {
    // console.log(name);
    this.props.supplyOnClickSupplyButtonDispatch(name);
  };

  render() {
    // add an add button that adds the supply to one of the stacks available
    // or add status on them
    let inputList = [];
    for (let supplyKey in this.props.supplies) {
      inputList.push(
        <li key={supplyKey}>
          <Button
            cName="SupplyLink"
            active={
              this.props.supplies[supplyKey].active ? 'SupplyLinkactive' : null
            }
            click={this.props.supplyActiveDispatch.bind(null, supplyKey)}
          >
            {supplyKey}
          </Button>
        </li>
      );
    }
    let supplyInput = this.props.activeSupp ? (
      <div className={styles.inputSupplyFlex}>
        <Input
          name={this.props.activeSupp}
          inputWrapSupply="inputWrapSupply"
          labelWrapSupply="labelWrapSupply"
          formWrapperSupply="formWrapperSupply"
          elementInputType="input"
          elementConfig={{ type: 'number', placeholder: '0' }}
          change={this.onChangeValueHandler.bind(null, this.props.activeSupp)}
          value={this.props.supplies[this.props.activeSupp].value}
          ind={0}
        />
        <Button
          click={this.onAddSupplyHandler.bind(null, this.props.activeSupp)}
          cName="checkMark"
        >
          &#10004;
        </Button>
      </div>
    ) : null;
    return (
      <Auxillary>
        <label>SUPPLY</label>{' '}
        <div className={styles.supplyWrapper}>
          <Unordered>{inputList}</Unordered>
          <div className={styles.inputWrap}>{supplyInput}</div>
        </div>
      </Auxillary>
    );
  }
}

const mapStateToProps = state => ({
  activeSupp: state.supplySettings.activeSupp,
  supplies: state.supplySettings.supplies
});

const mapDispatchToProps = dispatch => ({
  supplyActiveDispatch: name => dispatch(actions.activeSupply(name)),
  supplyChangeValueDispatch: (name, value) =>
    dispatch(actions.valueChangeSupply(name, value)),
  supplyOnClickSupplyButtonDispatch: name =>
    dispatch(actions.addSupplyValue(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Supply);
