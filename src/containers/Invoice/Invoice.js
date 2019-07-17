import React, { Component } from 'react';

import styles from './Invoice.module.scss';

import { connect } from 'react-redux';

// import * as actions from '../../store/actions/index';

import Head from '../../components/UI/Head/Head';
import HeadChild from '../../components/UI/HeadChild/HeadChild';
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
    filteredSuppliesState: [],
    searchForm: '',
    focusedItemIndex: ''
  };
  componentDidMount() {
    this.setState({ suppliesState: this.props.supplies });
  }
  onFormChangeHandler = (_, name, e) => {
    console.log(name, e.target.value);
  };

  render() {
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
                data={this.props.supplies}
              />
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
            <POSTable data={this.props.itemsToBuy} />
            <div className={styles.cashierName}>
              <p>Mia Khalifa</p>
              <p>Employee</p>
            </div>
          </div>
          <div className={styles.invoiceForm}>Invoice Form</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  supplies: state.supplySettings.activeSupplies,
  itemsToBuy: state.invoicePOS.itemsToBuy
});

export default connect(mapStateToProps)(Invoice);
