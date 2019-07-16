import React, { Component } from 'react';

import styles from './Invoice.module.scss';

import { connect } from 'react-redux';

import Head from '../../components/UI/Head/Head';
import HeadChild from '../../components/UI/HeadChild/HeadChild';
import Input from '../../components/UI/Input/Input';
import POSTable from '../../components/POSTable/POSTable';
import InputSearch from '../../components/UI/InputSearch/InputSearch';
import POSCustomer from '../../components/POSCustomer/POSCustomer';
import POSSummary from '../../components/POSSummary/POSSummary';
import Button from '../../components/UI/Button/Button';

class Invoice extends Component {
  state = {
    invoiceForm: {
      item: { type: 'text', placeholder: 'Item' },
      'plate no': { type: 'text', placeholder: 'Item' },
      discount: { type: 'number', placeholder: '0' }
    },
    value: {
      item: ''
    },
    suppliesState: [],
    searchForm: ''
  };
  componentDidMount() {
    this.setState({ suppliesState: this.props.supplies });
  }
  onFormChangeHandler = (_, name, e) => {
    console.log(name, e.target.value);
  };
  onSearchFormhandler = e => {
    // console.log(e.target.value);
    this.setState({ searchForm: e.target.value });
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

    let suggestion =
      this.state.searchForm.length > 0 ? (
        <div className={styles.autosuggest}>
          {' '}
          {this.state.suppliesState
            .filter(material =>
              material.materials.includes(this.state.searchForm)
            )
            .map(supply => (
              <div key={supply.materials} className={styles.suggestItem}>
                {supply.materials}
              </div>
            ))}
        </div>
      ) : null;
    return (
      <div className={styles.invoiceMain}>
        <Head classname="blue" svgname="invoice">
          <HeadChild>Invoice</HeadChild>
        </Head>
        <div className={styles.invoiceWrapper}>
          <div className={styles.sales}>
            <div className={styles.searchWrapper}>
              <InputSearch elementConfig={{ placeholder: 'Customer' }} />
              <InputSearch
                elementConfig={{ placeholder: 'Item' }}
                value={this.state.searchForm}
                edit={this.onSearchFormhandler}
              />
              {suggestion}
            </div>
            <POSCustomer />
            <div className={styles.summaryWrapper}>
              <POSSummary>Customer No.</POSSummary>
              <hr style={{ width: '1' }} />
              <POSSummary>Visit</POSSummary>
            </div>
            <div className={styles.buttonWrapper}>
              <div className={styles.button}>
                <Button cName="posButton" color="orange">
                  Credit
                </Button>
              </div>
              <div className={styles.button}>
                <Button cName="posButton" color="blue">
                  Cash
                </Button>
              </div>
            </div>
            <POSTable />
            <div className={styles.cashierName}>
              <p>Mia Khalifa</p>
              <p>Employee</p>
            </div>
          </div>
          <div className={styles.invoiceForm}>Invoice Form</div>
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

const mapStateToProps = state => ({
  supplies: state.supplySettings.activeSupplies
});

export default connect(mapStateToProps)(Invoice);
