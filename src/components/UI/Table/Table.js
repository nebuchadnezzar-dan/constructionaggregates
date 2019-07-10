import React from 'react';
import styles from './Table.module.scss';
const table = props => {
  let thead;
  let table;
  if (Array.isArray(props.data)) {
    thead = [];
    for (let dataKey in props.data[0]) {
      thead.push(<th key={dataKey}>{dataKey}</th>);
    }
    table = (
      <table className={[styles.table, styles[props.cName]].join(' ')}>
        <thead>
          <tr>{thead}</tr>
        </thead>
        <tbody>
          {props.data.map((dat, i) => {
            let tdHold = [];
            for (let datKey in dat) {
              tdHold.push(<td key={datKey + i}>{dat[datKey]}</td>);
            }
            return (
              <tr
                key={i}
                className={
                  i % 2 === 0 ? styles.even : styles['odd' + props.cName]
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
    for (let dataKey in props.data) {
      // thead.push(<th key={dataKey}>{dataKey}</th>);
      tbody.push({ [dataKey]: props.data[dataKey] });
    }
    table = (
      <table className={[styles.table, styles[props.cName]].join(' ')}>
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
                    i % 2 === 0 ? styles.even : styles['odd' + props.cName]
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
};

export default table;
