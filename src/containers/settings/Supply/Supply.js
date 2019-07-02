import React, { Component } from 'react';

import { formFunction, selectOptions } from '../../../util/inputHelper';

import Input from '../../../components/UI/Input/Input';

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
    supplyForm: {
      supply: formFunction('select', null, null, [
        selectOptions('gravel', 'Gravel'),
        selectOptions('riverMixed', 'River Mixed'),
        selectOptions('crushedSand', 'Crushed Sand'),
        selectOptions('riverSand', 'River Sand'),
        selectOptions('boulder', 'Boulder'),
        selectOptions('hollowBlocks', 'Hollow Blocks'),
        selectOptions('cement', 'Cement')
      ])
    },
    supplyForms: [{ supply: 'gravel' }]
  };
  onChangeValueHandler = e => {
    console.log(e);
  };

  render() {
    // add an add button that adds the supply to one of the stacks available
    // or add status on them
    let input = [];
    for (let inputKey in this.state.supplyForm) {
      input.push(
        <Input
          key={inputKey}
          name={inputKey}
          elementInputType={this.state.supplyForm[inputKey].elementType}
          elementConfig={this.state.supplyForm[inputKey].elementConfig}
          change={this.onChangeValueHandler}
        />
      );
    }
    input = supplies.map(supply => (
      <div key={supply} className={styles.supplyRow}>
        <Input
          name={supply}
          nowrap="noWrap"
          elementInputType="select"
          elementConfig={{
            options: [
              selectOptions('available', 'Available'),
              selectOptions('notAvailable', 'N/A')
            ]
          }}
          change={this.onChangeValueHandler}
        />
        <Input
          name={supply}
          label="noLabel"
          elementInputType="input"
          elementConfig={{ type: 'number', placeholder: '0' }}
          change={this.onChangeValueHandler}
        />
      </div>
    ));
    return input;
  }
}

export default Supply;
