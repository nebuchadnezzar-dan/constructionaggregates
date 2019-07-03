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
    supplyForm: {},
    supplyForms: [{ supply: 'gravel' }],
    // refactor this later
    suppliesConf: {
      gravel: {
        elementConfig: {
          type: 'number',
          placeholder: '0',
          disabled: true
        },
        value: ''
      },
      riverMixed: {
        elementConfig: {
          type: 'number',
          placeholder: '0',
          disabled: true
        },
        value: ''
      },
      crushedSand: {
        elementConfig: {
          type: 'number',
          placeholder: '0',
          disabled: true
        },
        value: ''
      },
      riverSand: {
        elementConfig: {
          type: 'number',
          placeholder: '0',
          disabled: true
        },
        value: ''
      },
      boulder: {
        elementConfig: {
          type: 'number',
          placeholder: '0',
          disabled: true
        },
        value: ''
      },
      hollowBlocks: {
        elementConfig: {
          type: 'number',
          placeholder: '0',
          disabled: true
        },
        value: ''
      },
      cement: {
        elementConfig: {
          type: 'number',
          placeholder: '0',
          disabled: true
        },
        value: ''
      }
    },
    hollowBlocksForm: {
      fourInches: {
        elementConfig: {
          type: 'number',
          placeholder: '0',
          disabled: true
        },
        value: ''
      },
      fiveInches: {
        elementConfig: {
          type: 'number',
          placeholder: '0',
          disabled: true
        },
        value: ''
      }
    }
  };
  onChangeValueHandler = (index, name, e) => {
    console.log(index, name);
    const newSuppConf = JSON.parse(JSON.stringify(this.state.suppliesConf));
    newSuppConf[name].elementConfig.disabled = !newSuppConf[name].elementConfig
      .disabled;
    this.setState({ suppliesConf: newSuppConf });
  };

  render() {
    // add an add button that adds the supply to one of the stacks available
    // or add status on them
    let input = [];
    let i = 0;
    for (let supply in this.state.suppliesConf) {
      input.push(
        <div key={supply} className={styles.supplyRow}>
          <Input
            name={supply}
            nowrap="noWrap"
            elementInputType="select"
            elementConfig={{
              options: [
                selectOptions('notAvailable', 'N/A'),
                selectOptions('available', 'Available')
              ]
            }}
            change={this.onChangeValueHandler}
            ind={i}
          />
          <Input
            name={supply}
            label="noLabel"
            elementInputType="input"
            elementConfig={this.state.suppliesConf[supply].elementConfig}
            change={this.onChangeValueHandler}
            ind={i}
          />
        </div>
      );
      i++;
    }
    for (let hollow in this.state.hollowBlocksForm) {
      input.push(
        <div key={hollow} className={styles.supplyRow}>
          <Input
            name={hollow}
            nowrap="noWrap"
            elementInputType="select"
            elementConfig={{
              options: [
                selectOptions('notAvailable', 'N/A'),
                selectOptions('available', 'Available')
              ]
            }}
            change={this.onChangeValueHandler}
            ind={i}
          />
          <Input
            name={hollow}
            label="noLabel"
            elementInputType="input"
            elementConfig={this.state.hollowBlocksForm[hollow].elementConfig}
            change={this.onChangeValueHandler}
            ind={i}
          />
        </div>
      );
    }
    // input = supplies.map((supply, i) => (
    //   <div key={supply} className={styles.supplyRow}>
    //     <Input
    //       name={supply}
    //       nowrap="noWrap"
    //       elementInputType="select"
    //       elementConfig={{
    //         options: [
    //           selectOptions('notAvailable', 'N/A'),
    //           selectOptions('available', 'Available')
    //         ]
    //       }}
    //       change={this.onChangeValueHandler}
    //       ind={i}
    //     />
    //     <Input
    //       name={supply}
    //       label="noLabel"
    //       elementInputType="input"
    //       elementConfig={{ type: 'number', placeholder: '0', disabled: true }}
    //       change={this.onChangeValueHandler}
    //       ind={i}
    //     />
    //   </div>
    // ));
    return input;
  }
}

export default Supply;
