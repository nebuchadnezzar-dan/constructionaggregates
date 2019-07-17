import React, { Component } from 'react';

import styles from './Invoice.module.scss';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

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
  onSearchFormhandler = e => {
    this.setState({
      searchForm: e.target.value,
      filteredSuppliesState: this.state.suppliesState.filter(material =>
        material.materials.toLowerCase().includes(e.target.value.toLowerCase())
      )
    });
  };
  onKeyPressHandler = e => {
    let copyFiltered = [...this.state.filteredSuppliesState];
    if (
      (e.keyCode === 40 || e.keyCode === 38) &&
      e.target.value.length > 0 &&
      copyFiltered.length > 0
    ) {
      e.preventDefault();
      const itemsLength = this.state.filteredSuppliesState.length - 1;
      let copyFocusedItemIndex = this.state.focusedItemIndex;
      let currentItemIndex;
      if (
        itemsLength === -1 ||
        this.state.searchForm.length === 0 ||
        e.target.value.length <= 0
      )
        copyFocusedItemIndex = 0;
      currentItemIndex = copyFocusedItemIndex === '' ? 0 : copyFocusedItemIndex;
      if (e.keyCode === 40) {
        if (
          copyFocusedItemIndex === itemsLength ||
          copyFocusedItemIndex > itemsLength ||
          copyFocusedItemIndex === ''
        ) {
          currentItemIndex = 0;
        } else {
          currentItemIndex++;
        }
      } else if (e.keyCode === 38) {
        if (currentItemIndex === 0 || copyFocusedItemIndex === 0) {
          currentItemIndex = itemsLength;
        } else {
          currentItemIndex = currentItemIndex-- === -1 ? 0 : currentItemIndex;
        }
      }
      let value = e.target.value;
      if (this.state.filteredSuppliesState.length !== -1) {
        value = copyFiltered[currentItemIndex].materials;
      }

      if (
        this.state.searchForm.length > 0 ||
        this.state.copyFocusedItemIndex !== -1
      ) {
        this.setState({
          focusedItemIndex: currentItemIndex,
          searchForm: value
        });
      }
    }
    if (e.keyCode === 13) {
      console.log(
        this.state.filteredSuppliesState[this.state.focusedItemIndex]
      );
      this.props.onAddItemsToBuyDispatch(
        this.state.filteredSuppliesState[this.state.focusedItemIndex]
      );
    }
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
          {this.state.filteredSuppliesState.map((supply, i) => (
            <div
              key={supply.materials}
              className={[
                styles.suggestItem,
                styles[i === this.state.focusedItemIndex ? 'isActive' : null]
              ].join(' ')}
              // isActive={i === this.state.focusedItemIndex}
            >
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
                keydown={this.onKeyPressHandler}
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
            <POSTable data={this.props.itemsToBuy} />
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
  supplies: state.supplySettings.activeSupplies,
  itemsToBuy: state.invoicePOS.itemsToBuy
});
const mapDispatchToProps = dispatch => ({
  onAddItemsToBuyDispatch: item => dispatch(actions.addItemsToSales(item))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoice);
