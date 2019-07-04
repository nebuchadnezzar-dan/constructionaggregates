import React, { Component } from 'react';

import { formFunction, selectOptions } from '../../../util/inputHelper';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Unordered from '../../../components/UI/Unordered/Unordered';

import styles from './Supply.module.scss';

const supplies = [
  'gravel',
  'riverMixed',
  'crushedSand',
  'riverSand',
  'boulder',
  'hollowBlocks',
  'cement'
];

class Supply extends Component {
  state = {
    activeSupp: '',
    supplies: {
      gravel: {
        active: false
      },
      riverMixed: {
        active: false
      },
      crushedSand: {
        active: false
      },
      riverSand: {
        active: false
      },
      boulder: {
        active: false
      },
      hollowBlocks: {
        active: false
      },
      cement: {
        active: false
      }
    },
    suppliesInput: {},
    supplyForm: {},
    supplyForms: [{ supply: 'gravel' }]
  };
  onChangeValueHandler = (index, name, e) => {
    console.log(index, name);
    const newSuppConf = JSON.parse(JSON.stringify(this.state.suppliesConf));
    newSuppConf[name].elementConfig.disabled = !newSuppConf[name].elementConfig
      .disabled;
    this.setState({ suppliesConf: newSuppConf });
  };
  onSupplyClickHandler = (name, e) => {
    const newSuppInput = JSON.parse(JSON.stringify(this.state.supplies));
    for (let newSuppKey in newSuppInput) {
      newSuppInput[newSuppKey].active = false;
    }
    newSuppInput[name].active = true;
    this.setState({ supplies: newSuppInput, activeSupp: name });
  };
  onAddSupplyHandler = () => {
    console.log('clicked');
  };

  render() {
    // add an add button that adds the supply to one of the stacks available
    // or add status on them
    let inputList = [];
    for (let supplyKey in this.state.supplies) {
      inputList.push(
        <li key={supplyKey}>
          <Button
            cName="SupplyLink"
            active={
              this.state.supplies[supplyKey].active ? 'SupplyLinkactive' : null
            }
            click={this.onSupplyClickHandler.bind(null, supplyKey)}
          >
            {supplyKey}
          </Button>
        </li>
      );
    }
    let supplyInput = this.state.activeSupp ? (
      <div className={styles.inputSupplyFlex}>
        <Input
          name={this.state.activeSupp}
          inputWrapSupply="inputWrapSupply"
          labelWrapSupply="labelWrapSupply"
          formWrapperSupply="formWrapperSupply"
          elementInputType="input"
          elementConfig={{ type: 'number', placeholder: '0' }}
          change={this.onChangeValueHandler}
          ind={0}
        />
        <Button click={this.onAddSupplyHandler} cName="checkMark">
          &#10004;
        </Button>
      </div>
    ) : null;
    return (
      <div style={{ display: 'flex' }}>
        <Unordered>{inputList}</Unordered>
        <div className={styles.inputWrap}>{supplyInput}</div>
      </div>
    );
  }
}

export default Supply;
