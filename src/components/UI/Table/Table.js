import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import { status as statusFromInput } from '../../../util/inputHelper';

import styles from './Table.module.scss';

import Button from '../Button/Button';

class Table extends Component {
  state = {
    data: [],
    dataValue: []
  };
  componentDidMount() {
    const copyProps = this.props.data.map((dat, i) => {
      const tempObj = {
        ...dat,
        actions: 'view'
      };
      delete tempObj.id;
      return tempObj;
    });
    // const copyData = JSON.parse(JSON.stringify(this.props.data));
    // copyData.forEach((dat) => delete dat.id);
    this.setState({ data: copyProps, dataValue: this.props.data });
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
    // const val = e.target.value;
    this.setState({ data: copyData, dataValue: copyValue });
  };

  onSaveEdit = index => {
    const copyData = [...this.state.data];
    const copyValue = [...this.state.dataValue];
    copyData[index] = {
      ...copyValue[index],
      actions: 'view'
    };
    delete copyData[index].id;
    this.setState({ data: copyData });
    if (this.props.from === 'truckSettings') {
      this.props.onEditTrucksDispatch(index, copyValue[index]);
    } else {
      this.props.onEditSupplyDispatch(index, copyValue[index]);
    }
  };

  onButtonClick = (from, button, index, _) => {
    let copyData;
    if (button === 'edit') {
      copyData = [...this.state.data];
      let copyDataIndex = copyData[index];
      for (let copyData in copyDataIndex) {
        if (copyData !== 'id')
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
    this.setState({ data: copyData });
  };
  render() {
    let thead;
    let table;
    thead = [];
    for (let dataKey in this.state.data[0]) {
      thead.push(<th key={dataKey}>{dataKey}</th>);
    }
    table = (
      <table className={[styles.table, styles[this.props.cName]].join(' ')}>
        <thead>
          <tr>{thead}</tr>
        </thead>
        <tbody>
          {this.state.data.map((dat, i) => {
            let tdHold = [];
            for (let datKey in dat) {
              tdHold.push(<td key={datKey + i}>{dat[datKey]}</td>);
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
                      click={this.onSaveEdit.bind(null, i)}
                    >
                      {' '}
                      &#10004;
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
    );
    return table;
  }
}

const mapDispatchToProps = dispatch => ({
  onEditTrucksDispatch: (index, value) =>
    dispatch(actions.editTruckSettings(index, value)),
  deleteTruckDispatch: index => dispatch(actions.deleteTruckSettings(index)),
  onEditSupplyDispatch: (index, value) =>
    dispatch(actions.editSupplySettings(index, value)),
  deleteSupplyDispatch: index => dispatch(actions.deleteSupplySettings(index))
});

export default connect(
  null,
  mapDispatchToProps
)(Table);
