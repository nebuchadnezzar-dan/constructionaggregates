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
    feedback: false
  };
  componentDidMount() {
    const copyProps = this.props.data.map((dat, i) => {
      const tempObj = {
        ...dat,
        actions: 'view'
      };
      // delete tempObj.id;
      return tempObj;
    });
    // const copyData = JSON.parse(JSON.stringify(this.props.data));
    // copyData.forEach((dat) => delete dat.id);
    this.setState({ data: copyProps, untouchedValue: copyProps, dataValue: this.props.data });
  }

  onTouchEdit = (index, toBeEdited, e) => {
    // const copyData = JSON.parse(JSON.stringify(this.state.data));
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
    // const val = e.target.value;
    this.setState({ data: copyData, dataValue: copyValue });
  };

  onSaveEdit = async index => {
    const copyData = [...this.state.data];
    const copyValue = [...this.state.dataValue];
    copyData[index] = {
      ...copyValue[index],
      actions: 'view'
    };
    this.props.toggleGlobalPopupDispatch();
    if (this.props.from === 'truckSettings') {
      // this.props.onEditTrucksDispatch(index, copyValue[index]);
      await this.props.putTruckSettingsDispatch(copyValue[index].id, copyValue[index])
    } else {
      this.props.onEditSupplyDispatch(index, copyValue[index]);
    }
    await this.setState({ data: copyData, untouchedValue: copyData, isBeingEdited: false, confirmation: false, feedback: true });
    this.props.toggleLocalPopupTruckDispatch({ from: 'localModalTruckSettingsTable', value: true, global: true });
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
    // if (this.props.from === 'truckSettings') {
    //   this.props.onEditTrucksDispatch(index, copyValue[index]);
    // } else {
    //   this.props.onEditSupplyDispatch(index, copyValue[index]);
    // }
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
      // copyDataIndex.actions = (
      //   <Button click={this.onSaveEdit.bind(null, index)}> &#10004;</Button>
      // );
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

  onClickButtonForConfirmation = (from) => {
    // this.props.toggleGlobalPopupDispatch(true);
    if (from === 'truckSettings') {
      this.props.toggleLocalPopupTruckDispatch({ from: 'localModalTruckSettingsTable', value: true, global: true });
      this.setState({ confirmation: true })
    }

  }

  render() {
    let thead;
    let table;
    let modalConfirmation;
    thead = [];
    console.log(['LOCAL TABLE'], this.props.truckLocalPopup)
    for (let dataKey in this.state.data[0]) {
      if (dataKey !== 'id') {
        thead.push(<th key={dataKey}>{dataKey}</th>);
      }
    }

    if (this.props.from === 'truckSettings' && this.props.globalPopup && this.props.truckLocalPopup) {
      modalConfirmation =
        <Confirmation
          confirmation={this.state.confirmation}
          error={this.props.putError}
          proceed={this.onSaveEdit.bind(null, this.state.activeIndex)}
          feedback={this.state.feedback}
          okClose={this.props.toggleGlobalPopupDispatch}

        />;
    } else if (this.props.from === 'supplySettings' && this.props.globalPopup && this.props.supplyLocalPopup) {
      modalConfirmation = <Confirmation />;
    }

    let modal = <Modal>
      {modalConfirmation}
    </Modal>;
    table = this.props.putLoading ? <Spinner color="grey" /> : (
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
                      click={this.onButtonClick.bind(
                        null,
                        this.props.from,
                        'delete',
                        i
                      )}
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
                        click={this.onClickButtonForConfirmation.bind(null, this.props.from)}
                      // click={this.onSaveEdit.bind(null, i)}
                      >
                        {' '}
                        &#10004;
                  </Button>
                      <Button
                        color="red"
                        // click={this.onClickButtonForConfirmation.bind(null, this.props.from)}
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
  supplyLocalPopup: state.modal.localModalSupplySettingsEdi,
  putLoadingTruck: state.truckSettings.putLoading,
  putErrorTruck: state.truckSettings.putError
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
  putTruckSettingsDispatch: (id, value) => dispatch(actions.putTruck(id, value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
