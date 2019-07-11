import React, { Component } from 'react';
import styles from './Table.module.scss';
import Button from '../Button/Button';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
class Table extends Component {
  state = {
    data: [],
    dataValue: []
  };
  componentDidMount() {
    const copyProps = this.props.data.map((dat, i) => ({
      ...dat,
      actions: 'view'
    }));
    this.setState({ data: copyProps, dataValue: this.props.data });
  }
  actionButtons = i => (
    <Auxillary>
      <Button
        cName="delete"
        click={this.onButtonClick.bind(null, this.props.from, 'delete', i)}
      >
        &#128465;
      </Button>
      <Button
        cName="edit"
        click={this.onButtonClick.bind(null, this.props.from, 'edit', i)}
      >
        &#9998;
      </Button>
    </Auxillary>
  );

  onTouchEdit = (index, toBeEdited, e) => {
    console.log(toBeEdited);
    const copyData = [...this.state.data];
    copyData[index] = {
      ...copyData[index],
      [toBeEdited]: (
        <input
          value={e.target.value}
          onChange={this.onTouchEdit.bind(this, index, toBeEdited)}
        />
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
    this.setState({ data: copyData });
  };

  onButtonClick = (from, button, index, _) => {
    let copyData;
    if (button === 'edit') {
      copyData = [...this.state.data];
      let copyDataIndex = copyData[index];
      for (let copyData in copyDataIndex) {
        copyDataIndex[copyData] = (
          <input
            value={this.state.data[index][copyData]}
            onChange={this.onTouchEdit.bind(this, index, copyData)}
          />
        );
      }
      // copyDataIndex.actions = (
      //   <Button click={this.onSaveEdit.bind(null, index)}> &#10004;</Button>
      // );
      copyDataIndex.actions = 'save';
    } else {
      copyData = this.state.data.filter((_, i) => i !== index);
    }

    // copyData[index] = {
    //   maxLoad: (
    //     <input
    //       type="number"
    //       value={this.state.data[index].maxLoad}
    //       onChange={this.onTouchEdit.bind(this, index, 'maxLoad')}
    //     />
    //   ),
    //   plateNo: (
    //     <input
    //       value={this.state.data[index].plateNo}
    //       onChange={this.onTouchEdit.bind(this, index, 'plateNo')}
    //     />
    //   ),
    //   status: (
    //     <input
    //       value={this.state.data[index].status}
    //       onChange={this.onTouchEdit.bind(this, index, 'status')}
    //     />
    //   ),
    //   actions: <Button> &#10004;</Button>
    // };
    console.log(this.state.data);
    this.setState({ data: copyData });
  };
  render() {
    let thead;
    let table;
    if (Array.isArray(this.props.data)) {
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
                    <Button click={this.onSaveEdit.bind(null, i)}>
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
    } else {
      thead = [<th key="1">Materials</th>, <th key="2">Amount</th>];
      const tbody = [];
      for (let dataKey in this.props.data) {
        // thead.push(<th key={dataKey}>{dataKey}</th>);
        tbody.push({ [dataKey]: this.props.data[dataKey] });
      }
      table = (
        <table className={[styles.table, styles[this.props.cName]].join(' ')}>
          <thead>
            <tr>{thead}</tr>
          </thead>
          <tbody>
            {tbody.map((dat, i) => {
              let tdHold = [];
              for (let datKey in dat) {
                tdHold.push(
                  <tr
                    key={i}
                    className={
                      i % 2 === 0
                        ? styles.even
                        : styles['odd' + this.props.cName]
                    }
                  >
                    <td>{datKey}</td>
                    <td>{dat[datKey]}</td>
                  </tr>
                );
              }
              return tdHold;
            })}
          </tbody>
        </table>
      );
    }

    return table;
  }
}

export default Table;
