import React, { Component } from 'react';

import styles from './Invoice.module.scss';

import Head from '../../components/UI/Head/Head';
import HeadChild from '../../components/UI/HeadChild/HeadChild';
import Input from '../../components/UI/Input/Input';

class Invoice extends Component {
  state = {
    invoiceForm: {
      item: { type: 'text', placeholder: 'Item' },
      'plate no': { type: 'text', placeholder: 'Item' },
      discount: { type: 'number', placeholder: '0' }
    },
    value: {
      item: ''
    }
  };

  onFormChangeHandler = (_, name, e) => {
    console.log(name, e.target.value);
  };

  render() {
    let inputForm = Object.keys(this.state.invoiceForm)
      .filter(key => key !== 'item')
      .map(keys => {
        return (
          <div key={keys}>
            <Input
              name={keys}
              elementInputType="input"
              elementConfig={this.state.invoiceForm[keys]}
              change={this.onFormChangeHandler}
              ind={0}
              color="blue"
            />
          </div>
        );
      });
    return (
      <div className={styles.invoiceMain}>
        <Head classname="blue" svgname="invoice">
          <HeadChild>Invoice</HeadChild>
        </Head>
        <div className={styles.sales}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cement</td>
                <td>150</td>
                <td>3</td>
                <td>450</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td />
                <td />
                <th>Total</th>
                <th>450</th>
              </tr>
            </tfoot>
          </table>
        </div>
        <div>
          <form className={styles.form}>
            <div className={styles.item}>
              <Input
                name="Item"
                elementInputType="input"
                elementConfig={this.state.invoiceForm.item}
                change={this.onFormChangeHandler}
                ind={0}
                color="blue"
              />
            </div>
            {inputForm}
          </form>
        </div>
      </div>
    );
  }
}

export default Invoice;
