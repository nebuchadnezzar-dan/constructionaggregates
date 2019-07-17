import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Unordered from '../../../components/UI/Unordered/Unordered';
import Head from '../../../components/UI/Head/Head';
import HeadChild from '../../../components/UI/HeadChild/HeadChild';
import Table from '../../../components/UI/Table/Table';
import Auxillary from '../../../hoc/Auxillary/Auxillary';

import * as actions from '../../../store/actions/index';

import styles from './Supply.module.scss';

class Supply extends Component {
  state = {
    view: 'form',
    activeSupp: '',
    addForm: ''
  };
  // parameters _ is not needed
  onChangeValueHandler = (name, _, __, value, event) => {
    // console.log(name, value);
    if (name === 'add') {
      this.setState({ addForm: event.target.value });
    } else {
      this.props.supplyChangeValueDispatch(name, value, event.target.value);
    }
  };

  onAddSupplyHandler = name => {
    if (name === 'add') {
      this.props.supplyAddMaterials(this.state.addForm);
      this.setState({ addForm: '' });
    } else {
      this.props.supplyOnClickSupplyButtonDispatch(name);
    }
  };
  onToggleView = value => {
    this.setState({ view: value });
  };
  addNewMatt = active => {
    this.setState({ activeSupp: active });
  };

  render() {
    let inputList = [
      <li key="first" className={styles.listHead}>
        Materials
      </li>
    ];
    for (let supplyKey in this.props.supplies) {
      const matExist = this.props.activeSupplies.find(
        supp => supp.materials === supplyKey
      );
      inputList.push(
        <li key={supplyKey}>
          <Button
            disabled={matExist}
            cName="SupplyLink"
            active={
              this.props.activeSupp === supplyKey ? 'SupplyLinkactive' : null
            }
            click={this.props.supplyActiveDispatch.bind(null, supplyKey)}
          >
            {supplyKey}
          </Button>
        </li>
      );
    }
    inputList.push(
      <li key="addMats">
        <Button
          cName="SupplyLinkAdd"
          active={this.props.activeSupp === 'add' ? 'SupplyLinkactive' : null}
          click={this.props.supplyActiveDispatch.bind(null, 'add')}
        >
          New Materials
        </Button>
      </li>
    );
    let supplyInput =
      this.props.activeSupp && this.props.activeSupp !== 'add' ? (
        <Auxillary>
          <div className={styles.supplyLabelActive}>
            {this.props.activeSupp}
          </div>
          <div className={styles.inputSupplyFlex}>
            <Input
              name="amount"
              inputWrapSupply="inputWrapSupply"
              labelWrapSupply="labelWrapSupply"
              formWrapperSupply="formWrapperSupply"
              elementInputType="input"
              elementConfig={{ type: 'number', placeholder: '0' }}
              change={this.onChangeValueHandler.bind(
                null,
                this.props.activeSupp,
                'amount'
              )}
              value={this.props.supplies[this.props.activeSupp].amount}
              ind={0}
              color="orange"
            />
            <Input
              name="price"
              inputWrapSupply="inputWrapSupply"
              labelWrapSupply="labelWrapSupply"
              formWrapperSupply="formWrapperSupply"
              elementInputType="input"
              elementConfig={{ type: 'number', placeholder: '0' }}
              change={this.onChangeValueHandler.bind(
                null,
                this.props.activeSupp,
                'price'
              )}
              value={this.props.supplies[this.props.activeSupp].price}
              ind={0}
              color="orange"
            />
            <Button
              click={this.onAddSupplyHandler.bind(null, this.props.activeSupp)}
              cName="checkMark"
            >
              &#10004;
            </Button>
          </div>
        </Auxillary>
      ) : null;
    supplyInput =
      this.props.activeSupp === 'add' ? (
        <div className={styles.inputSupplyFlex}>
          <Input
            name="add"
            inputWrapSupply="inputWrapSupply"
            labelWrapSupply="labelWrapSupply"
            formWrapperSupply="formWrapperSupply"
            elementInputType="input"
            elementConfig={{ type: 'text', placeholder: 'Material' }}
            change={this.onChangeValueHandler.bind(null, 'add', null)}
            value={this.state.addForm}
            ind={0}
            color="orange"
          />
          <Button
            click={this.onAddSupplyHandler.bind(null, 'add')}
            cName="checkMark"
          >
            &#10004;
          </Button>
        </div>
      ) : (
        supplyInput
      );
    let view = (
      <div className={styles.view}>
        {' '}
        <Table
          data={this.props.activeSupplies}
          cName="orange"
          from="supplySettings"
        />
      </div>
    );
    let tobeShown =
      this.state.view === 'form' ? (
        <div className={styles.supplyWrapper}>
          <Unordered classname="ulDefault">{inputList}</Unordered>
          <div className={styles.inputWrap}>{supplyInput}</div>
        </div>
      ) : (
        view
      );
    return (
      <div className={styles.supplyWrapperHead}>
        <Head classname="orange" svgname="supply">
          <HeadChild
            forClassName={this.state.view}
            dispatchClickView={this.onToggleView.bind(null, 'view')}
            dispatchClickForm={this.onToggleView.bind(null, 'form')}
          >
            SUPPLY
          </HeadChild>
        </Head>
        {tobeShown}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeSupp: state.supplySettings.activeSupp,
  supplies: state.supplySettings.supplies,
  activeSupplies: state.supplySettings.activeSupplies
});

const mapDispatchToProps = dispatch => ({
  supplyActiveDispatch: name => dispatch(actions.activeSupply(name)),
  supplyChangeValueDispatch: (name, inputMod, value) =>
    dispatch(actions.valueChangeSupply(name, inputMod, value)),
  supplyOnClickSupplyButtonDispatch: name =>
    dispatch(actions.addSupplyValue(name)),
  supplyAddMaterials: matName => dispatch(actions.addMaterialToSupply(matName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Supply);
