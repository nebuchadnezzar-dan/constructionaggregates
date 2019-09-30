import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import { status as statusFromInput } from '../../../util/inputHelper';

import styles from './Table.module.scss';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Spinner from '../Spinner/Spinner';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Confirmation from '../Confirmation/Confirmation';

class Table extends Component {
  state = {
    data: [],
    dataValue: [],
    untouchedValue: [],
    activeIndex: '',
    isBeingEdited: false,
    confirmation: false,
    feedback: false,
    buttonMode: '',
    clickedIndex: ''
  };
  componentDidMount() {
    const copyProps = this.props.data.map((dat, i) => {
      const tempObj = {
        ...dat,
        actions: 'view'
      };
      return tempObj;
    });
    this.setState({ data: copyProps, untouchedValue: copyProps, dataValue: this.props.data });
  }

  onTouchEdit = (index, toBeEdited, e) => {
    const copyData = [...this.state.data];
    copyData[index] =
      toBeEdited !== 'status'
        ? {
          ...copyData[index],
          [toBeEdited]: (
            <input
              value={e.target.value}
              onChange={this.onTouchEdit.bind(this, index, toBeEdited)}
            />
          )
        }
        : {
          ...copyData[index],
          status: (
            <select
              value={e.target.value}
              onChange={this.onTouchEdit.bind(this, index, 'status')}
            >
              {statusFromInput.map(st => (
                <option value={st.value} key={st.value}>
                  {st.displayValue}
                </option>
              ))}
            </select>
          )
        };
    const copyValue = [...this.state.dataValue];
    copyValue[index][toBeEdited] = e.target.value;
    this.setState({ data: copyData, dataValue: copyValue });
  };

  onProceed = async (button) => {
    const index = this.state.activeIndex;
    const copyData = [...this.state.data];
    const copyValue = [...this.state.dataValue];
    copyData[index] = {
      ...copyValue[index],
      actions: 'view'
    };
    if (button === 'edit') {
      await this.setState({ data: copyData, untouchedValue: copyData, isBeingEdited: false, confirmation: false, feedback: true });
      this.props.toggleGlobalPopupDispatch();
      if (this.props.from === 'truckSettings') {
        await this.props.putTruckSettingsDispatch(copyValue[index].id, copyValue[index]);
      } else {
        await this.props.putSupplySettingsDispatch(copyValue[index].id, copyValue[index]);
      }
      this.props.toggleLocalPopupTruckDispatch({ from: this.props.from === 'supplySettings' ? 'localModalSupplySettingsTable' : 'localModalTruckSettingsTable', value: true, global: true });
    } else if (button === 'delete') {
      this.props.toggleGlobalPopupDispatch();
      if (this.props.from === 'truckSettings') {
        await this.props.deleteTruckProceedDispatch(copyValue[index].id);
        await this.props.toggleLocalPopupTruckDispatch({ from: 'localModalDeleteSettings', value: true, global: true });
        this.props.reloadTruckDispatch();
      } else {
        await this.props.deleteSupplySettingsDispatch(copyValue[index].id);
        await this.props.toggleLocalPopupTruckDispatch({ from: 'localModalDeleteSettings', value: true, global: true });
        this.props.reloadSupplyDispatch();
      }
    }
  };

  onCLoseModal = () => {
    this.props.toggleGlobalPopupDispatch();
    this.setState({ confirmation: false, feedback: false })
  }

  onCancelEdit = (index) => {
    const copyData = [...this.state.data];
    const copyValue = [...this.state.untouchedValue];
    copyData[index] = {
      ...copyValue[index],
      actions: 'view'
    };
    this.setState({ data: copyData, isBeingEdited: false });
  }

  onButtonClick = async (from, button, index, _) => {
    let copyData;

    if (this.state.isBeingEdited) {
      await this.onCancelEdit(this.state.activeIndex);
    }

    if (button === 'edit') {
      copyData = JSON.parse(JSON.stringify(this.state.data));
      let copyDataIndex = copyData[index];
      for (let copyData in copyDataIndex) {
        copyDataIndex[copyData] = (
          <input
            value={this.state.data[index][copyData]}
            onChange={this.onTouchEdit.bind(this, index, copyData)}
          />
        );
      }
      if (copyDataIndex.status) {
        copyDataIndex.status = (
          <select
            value={this.state.dataValue[index].status}
            onChange={this.onTouchEdit.bind(this, index, 'status')}
          >
            {statusFromInput.map(st => (
              <option value={st.value} key={st.value}>
                {st.displayValue}
              </option>
            ))}
          </select>
        );
      } else if (copyDataIndex.materials) {
        copyDataIndex.materials = this.state.dataValue[index].materials;
      }
      copyDataIndex.actions = 'save';
    } else {
      if (this.props.from === 'truckSettings') {
        this.props.deleteTruckDispatch(index);
      } else {
        this.props.deleteSupplyDispatch(index);
      }

      copyData = this.state.data.filter((_, i) => i !== index);
    }

    this.setState({ data: copyData, isBeingEdited: true, activeIndex: index });
  };

  onClickButtonForConfirmation = (from, button, i) => {
    // this.props.toggleGlobalPopupDispatch(true);
    if (from === 'truckSettings') {
      this.props.toggleLocalPopupTruckDispatch({ from: 'localModalTruckSettingsTable', value: true, global: true });
      this.setState({ confirmation: true, buttonMode: button, activeIndex: i });
    } else if (from === 'supplySettings') {
      this.props.toggleLocalPopupTruckDispatch({ from: 'localModalSupplySettingsTable', value: true, global: true });
      this.setState({ confirmation: true, buttonMode: button, activeIndex: i });
    }

  }

  render() {
    let thead;
    let table;
    let modalConfirmation;
    thead = [];
    for (let dataKey in this.state.data[0]) {
      if (dataKey !== 'id') {
        thead.push(<th key={dataKey}>{dataKey}</th>);
      }
    }

    if (this.props.from === 'truckSettings' && this.props.globalPopup && (this.props.truckLocalPopup || this.props.deleteLocalPopup)) {
      modalConfirmation =
        <Confirmation
          confirmation={this.state.confirmation}
          error={this.props.putErrorTruck}
          proceed={this.onProceed.bind(null, this.state.buttonMode)}
          feedback={this.state.feedback}
          okClose={this.props.toggleGlobalPopupDispatch}

        />;
    } else if (this.props.from === 'supplySettings' && this.props.globalPopup && (this.props.supplyLocalPopup || this.props.deleteLocalPopup)) {
      modalConfirmation =
        <Confirmation
          confirmation={this.state.confirmation}
          error={this.props.putErrorSupply}
          proceed={this.onProceed.bind(null, this.state.buttonMode)}
          feedback={this.state.feedback}
          okClose={this.props.toggleGlobalPopupDispatch}

        />;
    }

    let modal = <Modal>
      {modalConfirmation}
    </Modal>;
    table = this.props.putLoadingTruck || this.props.putLoadingSupply ? <Spinner color="grey" /> : (
      <Auxillary>
        {modal}
        <table className={[styles.table, styles[this.props.cName]].join(' ')}>
          <thead>
            <tr>{thead}</tr>
          </thead>
          <tbody>
            {this.state.data.map((dat, i) => {
              let tdHold = [];
              for (let datKey in dat) {
                if (datKey !== 'id') {
                  tdHold.push(<td key={datKey + i}>{dat[datKey]}</td>);
                }
              }
              // console.log(tdHold[tdHold.length - 1].props.children);
              tdHold[tdHold.length - 1] =
                tdHold[tdHold.length - 1].props.children === 'view' ? (
                  <td key={'actions' + i}>
                    <Button
                      cName="delete"
                      click={this.onClickButtonForConfirmation.bind(null, this.props.from, 'delete', i)}
                    >
                      &#128465;
                  </Button>
                    <Button
                      cName="edit"
                      click={this.onButtonClick.bind(
                        null,
                        this.props.from,
                        'edit',
                        i
                      )}
                    >
                      &#9998;
                  </Button>
                  </td>
                ) : (
                    <td key={'actions' + i}>
                      <Button
                        cName="saveEdit"
                        click={this.onClickButtonForConfirmation.bind(null, this.props.from, 'edit', i)}
                      >
                        {' '}
                        &#10004;
                      </Button>
                      <Button
                        color="red"
                        click={this.onCancelEdit.bind(null, i)}
                      >
                        {' '}
                        &#10006;
                      </Button>
                    </td>
                  );
              return (
                <tr
                  key={i}
                  className={
                    i % 2 === 0 ? styles.even : styles['odd' + this.props.cName]
                  }
                >
                  {tdHold}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Auxillary>
    );
    return table;
  }
}

const mapStateToProps = state => ({
  truckLocalPopup: state.modal.localModalTruckSettingsTable,
  globalPopup: state.modal.showGlobalModal,
  supplyLocalPopup: state.modal.localModalSupplySettingsTable,
  putLoadingTruck: state.truckSettings.putLoading,
  putErrorTruck: state.truckSettings.putError,
  deleteLocalPopup: state.modal.localModalDeleteSettings,
  putLoadingSupply: state.supplySettings.putLoading,
  putErrorSupply: state.supplySettings.putError
});

const mapDispatchToProps = dispatch => ({
  onEditTrucksDispatch: (index, value) =>
    dispatch(actions.editTruckSettings(index, value)),
  deleteTruckDispatch: index => dispatch(actions.deleteTruckSettings(index)),
  onEditSupplyDispatch: (index, value) =>
    dispatch(actions.editSupplySettings(index, value)),
  deleteSupplyDispatch: index => dispatch(actions.deleteSupplySettings(index)),
  toggleLocalPopupTruckDispatch: value => dispatch(actions.toggleLocalPopupSettings(value)),
  toggleGlobalPopupDispatch: () => dispatch(actions.toggleGlobalModal()),
  putTruckSettingsDispatch: (id, value) => dispatch(actions.putTruck(id, value)),
  deleteTruckProceedDispatch: (id) => dispatch(actions.deleteTruck(id)),
  reloadTruckDispatch: () => dispatch(actions.fetchTruck(1)),
  putSupplySettingsDispatch: (id, value) => dispatch(actions.putSupply(id, value)),
  deleteSupplySettingsDispatch: id => dispatch(actions.deleteSupply(id)),
  reloadSupplyDispatch: () => dispatch(actions.fetchSupply())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
