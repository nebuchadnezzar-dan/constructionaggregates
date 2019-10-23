import React, { Component } from 'react';

import styles from './Invoice.module.scss';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import Head from '../../components/UI/Head/Head';
import HeadChild from '../../components/UI/HeadChild/HeadChild';
import POSTable from '../../components/POS/POSTable/POSTable';
import InputSearch from '../../components/UI/InputSearch/InputSearch';
import POSCustomer from '../../components/POS/POSCustomer/POSCustomer';
import POSSummary from '../../components/POS/POSSummary/POSSummary';
import Button from '../../components/UI/Button/Button';
import PopUp from '../../components/PopUp/PopUp';
import PopupBack from '../../components/PopUp/PopupBack/PopupBack';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import Truck from '../../components/POS/Truck/Truck';
import POSButtons from '../../components/POS/POSButtons/POSButtons';
import Spinner from '../../components/UI/Spinner/Spinner';

class Invoice extends Component {
  state = {
    invoiceForm: {
      item: { type: 'text', placeholder: 'Item' },
      'plate no': { type: 'text', placeholder: 'Item' },
      discount: { type: 'number', placeholder: '0' }
    }
  };
  componentDidMount() {
    this.props.fetchPosDispatch();
    this.setState({ suppliesState: this.props.supplies });
    document.addEventListener('keydown', this.onKeyDownHandler, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDownHandler, false);
  }
  onClosePopUp = () => {
    this.props.onPopUpShowDispatch();
  };
  onQuantityChangeHandler = e => {
    this.props.onChangeQualityDispatch(e.target.value);
  };
  onAddressChangehandler = e => {
    this.props.onEditAddressDispatch(e.target.value);
  };
  onKeyDownHandler = e => {
    if (e.keyCode === 27) {
      if (this.props.popup) this.props.onPopUpShowDispatch();
      if (this.props.finalPopup) this.props.onToggleFinalPopupDispatch(false);
    } else if (e.keyCode === 46) {
      if (typeof this.props.activeRow === 'number') this.props.onRemoveItem();
    }
  };
  buttonSummaryHandler = name => {
    // console.log(toggle);
    this.props.onToggleFinalPopupDispatch({ name, toggle: true });
  };

  render() {
    const popupShow = this.props.popup ? (
      <Auxillary>
        <div className={styles.popup}>
          <PopUp cName="blink" type="simple" close={this.props.onPopUpShowDispatch.bind(null)}>
            Entry doesn't exist
          </PopUp>
        </div>
        <PopupBack close={this.props.onPopUpShowDispatch.bind(null)} />
      </Auxillary>
    ) : null;
    const finalPopup = this.props.finalPopup ? (
      <Auxillary>
        <div className={styles.popup}>
          <PopUp type="final" close={this.props.onToggleFinalPopupDispatch.bind(null)} />
        </div>
        <PopupBack close={this.props.onToggleFinalPopupDispatch.bind(null, false)} />
      </Auxillary>
    ) : null;

    let mainBody = <Auxillary>
      <Head classname="blue" svgname="invoice">
        <HeadChild>Invoice</HeadChild>
      </Head>
      <div className={styles.invoiceWrapper}>
        {finalPopup}
        <div className={styles.sales}>
          <POSCustomer />
          <div className={styles.summaryWrapper}>
            <POSSummary mode="customer" number={this.props.customerNo}>Customer No.</POSSummary>
            <hr style={{ width: '1' }} />
            <POSSummary mode="visit" activeNum={this.props.activeCustomer ? this.props.activeCustomer.timesPurchased : 0}>Visit</POSSummary>
          </div>
          <div className={styles.buttonWrapper}>
            <div className={styles.button}>
              <Button
                cName="posButton"
                color="orange"
                click={this.buttonSummaryHandler.bind(null, 'creditSummary')}
              >
                Credit
                </Button>
            </div>
            <div className={styles.button}>
              <Button cName="posButton" color="blue">
                Cash
                </Button>
            </div>
          </div>
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
                component="supplies"
              />
            </div>
          </div>
          <POSTable data={this.props.itemsToBuy} />
          {popupShow}
        </div>
        <div className={styles.hr} />
        <div className={styles.invoiceForm}>
          <div className={styles.truckComponentWrapper}>
            <Truck trucks={this.props.trucks} />
          </div>
          <div className={styles.addressWrap}>
            <div className={styles.addressLabel}>Deliver to:</div>
            <div className={styles.addressInput}>
              <input
                placeholder="Address"
                className={styles.address}
                value={this.props.address}
                onChange={this.onAddressChangehandler}
              />
            </div>
          </div>
          <div className={styles.buttonActionsWrapper}>
            <POSButtons />
          </div>
          <div className={styles.cashierName}>
            <p>Mia Khalifa</p>
            <p>Employee</p>
          </div>
        </div>
      </div>
    </Auxillary>;

    const spinner = this.props.fetchLoading ? <Spinner color="grey" /> : mainBody;

    return (
      <div className={styles.invoiceMain}>
        {spinner}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  supplies: state.supplySettings.activeSupplies,
  itemsToBuy: state.invoicePOS.itemsToBuy,
  popup: state.invoicePOS.popup,
  quantityRedux: state.invoicePOS.quantityForm,
  trucks: state.truckSettings.availableTrucks,
  finalPopup: state.invoicePOS.finalPopup,
  address: state.invoicePOS.address,
  activeRow: state.invoicePOS.activeRow,
  customerNo: state.invoicePOS.customerNo,
  activeCustomer: state.invoicePOS.customer,
  fetchLoading: state.invoicePOS.fetchLoading,
  fetchError: state.invoicePOS.fetchError
});

const mapDispatchToProps = dispatch => ({
  onPopUpShowDispatch: () => dispatch(actions.togglePopup(false)),
  onChangeQualityDispatch: value => dispatch(actions.onChangeQuantity(value)),
  onToggleFinalPopupDispatch: toggle =>
    dispatch(actions.toggleFinalPopup(toggle)),
  onEditAddressDispatch: value => dispatch(actions.editAddress(value)),
  onRemoveItem: () => dispatch(actions.voidItem()),
  fetchPosDispatch: () => dispatch(actions.fetchPOS())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoice);
