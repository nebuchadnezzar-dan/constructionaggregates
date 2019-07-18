import React, { Component } from 'react';

import styles from './Invoice.module.scss';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import Head from '../../components/UI/Head/Head';
import HeadChild from '../../components/UI/HeadChild/HeadChild';
import POSTable from '../../components/POSTable/POSTable';
import InputSearch from '../../components/UI/InputSearch/InputSearch';
import POSCustomer from '../../components/POSCustomer/POSCustomer';
import POSSummary from '../../components/POSSummary/POSSummary';
import Button from '../../components/UI/Button/Button';
import PopUp from '../../components/PopUp/PopUp';
import Auxillary from '../../hoc/Auxillary/Auxillary';

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
  componentDidMount() {
    this.setState({ suppliesState: this.props.supplies });
    document.addEventListener('keydown', this.onKeyDownHandler, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDownHandler, false);
  }
  onFormChangeHandler = (_, name, e) => {
    console.log(name, e.target.value);
  };
  onClosePopUp = () => {
    this.props.onPopUpShowDispatch();
  };
  onQuantityChangeHandler = e => {
    this.props.onChangeQualityDispatch(e.target.value);
  };
  onKeyDownHandler = e => {
    if (e.keyCode === 27 && this.props.popup) {
      console.log('pressed');
      this.props.onPopUpShowDispatch();
    }
  };

  render() {
    const popupShow = this.props.popup ? (
      <Auxillary>
        <div className={styles.popup}>
          <PopUp>Item doesn't exist</PopUp>
        </div>
        <div
          className={styles.popupBack}
          onClick={this.props.onPopUpShowDispatch.bind(null)}
        />
      </Auxillary>
    ) : null;
    return (
      <div className={styles.invoiceMain}>
        <Head classname="blue" svgname="invoice">
          <HeadChild>Invoice</HeadChild>
        </Head>
        <div className={styles.invoiceWrapper}>
          <div className={styles.sales}>
            <div className={styles.searchWrapper}>
              {/* <InputSearch elementConfig={{ placeholder: 'Customer' }} /> */}
              <div className={styles.quantityWrap}>
                {' '}
                <input
                  type="number"
                  placeholder="Quantity"
                  className={styles.quantity}
                  value={this.props.quantityRedux}
                  onChange={this.onQuantityChangeHandler}
                />
              </div>
              <div className={styles.itemInvoice}>
                <InputSearch
                  elementConfig={{ placeholder: 'Item' }}
                  data={this.props.supplies}
                />
              </div>
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
            {popupShow}
            {/* <div className={styles.popup}>
              <PopUp />
            </div>
            <div className={styles.popupBack} /> */}
          </div>
          <div className={styles.invoiceForm}>Invoice Form</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  supplies: state.supplySettings.activeSupplies,
  itemsToBuy: state.invoicePOS.itemsToBuy,
  popup: state.invoicePOS.popup,
  quantityRedux: state.invoicePOS.quantityForm
});

const mapDispatchToProps = dispatch => ({
  onPopUpShowDispatch: () => dispatch(actions.togglePopup(false)),
  onChangeQualityDispatch: value => dispatch(actions.onChangeQuantity(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoice);
