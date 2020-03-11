import React, { Component } from 'react';

import styles from './Invoice.module.scss';

import { connect } from 'react-redux';

import axios from '../../axios-orders';

import * as actions from '../../store/actions/index';

import { storeRoute } from '../../util/storeRoute'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
import ErrorBody from '../../components/UI/ErrorBody/ErrorBody';
import Transactions from './Transactions/Transactions';

class Invoice extends Component {
  state = {
    invoiceForm: {
      item: { type: 'text', placeholder: 'Item' },
      'plate no': { type: 'text', placeholder: 'Item' },
      discount: { type: 'number', placeholder: '0' }
    },
    activeView: 'form'
  };
  componentDidMount() {
    const route = this.props.location.pathname.match(/[a-zA-z]+/g);
    storeRoute(this.props.location.pathname)
    this.props.activeRouteDispatch(route);
    this.props.fetchPosDispatch();
    this.props.fetchTruckDispatch();
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
    if (name === 'credit Summary') {
      this.props.fetchCreditSummary(+this.props.activeCustomer.id, null, null, null, 'credit');
    } else {
      this.props.fetchCreditSummary(+this.props.activeCustomer.id, null, null, null, 'purchase');
    }

    this.props.onToggleFinalPopupDispatch({ name, toggle: true });
  };

  onToggleView = view => {
    if (view === 'form') {
      this.props.fetchPosDispatch();
      this.props.fetchTruckDispatch();
    }
    this.setState({ activeView: view });

  };

  render() {
    const disabled = this.props.activeCustomer.length === 0 ? true : false;
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

    let POSbody = <div className={styles.invoiceWrapper}>
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
              disabled={disabled}
              cName="posButton"
              color="orange"
              click={this.buttonSummaryHandler.bind(null, 'credit Summary')}
            >
              Credit
            </Button>
          </div>
          <div className={styles.button}>
            <Button disabled={disabled}
              cName="posButton"
              color="blue"
              click={this.buttonSummaryHandler.bind(null, 'purchase History')}>
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
              // data={this.props.supplies}
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
          <Truck from="invoices" />
        </div>
        <div className={styles.addressWrap}>
          <div className={styles.addressLabel}>Deliver to:</div>
          <div className={styles.addressInput}>
            <input
              disabled={this.props.activeCustomer.length === 0 ? true : false}
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
    </div>;

    let mainBody = <Auxillary>
      {this.props.children}
      <Head classname="blue" svgname="invoice">
        <HeadChild
          forClassName={this.state.activeView}
          dispatchClickView={this.onToggleView.bind(null, 'view')}
          dispatchClickForm={this.onToggleView.bind(null, 'form')}
          childName="Transaction">
          POS
        </HeadChild>
      </Head>
      {this.state.activeView === 'view' ? <Transactions /> : POSbody}
    </Auxillary>;

    let mainBodyError = this.props.fetchError || this.props.fetchErrorTruck ? <ErrorBody>{this.props.children}</ErrorBody> : mainBody;

    const spinner = this.props.fetchLoading || this.props.fetchLoadingTruck ? <Spinner color="grey" /> : mainBodyError;

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
  finalPopup: state.invoicePOS.finalPopup,
  address: state.invoicePOS.address,
  activeRow: state.invoicePOS.activeRow,
  customerNo: state.invoicePOS.customerNo,
  activeCustomer: state.invoicePOS.customer,
  fetchLoading: state.invoicePOS.fetchLoading,
  fetchError: state.invoicePOS.fetchError,
  fetchLoadingTruck: state.truckSettings.loading,
  fetchErrorTruck: state.truckSettings.error
});

const mapDispatchToProps = dispatch => ({
  onPopUpShowDispatch: () => dispatch(actions.togglePopup(false)),
  onChangeQualityDispatch: value => dispatch(actions.onChangeQuantity(value)),
  onToggleFinalPopupDispatch: toggle =>
    dispatch(actions.toggleFinalPopup(toggle)),
  onEditAddressDispatch: value => dispatch(actions.editAddress(value)),
  onRemoveItem: () => dispatch(actions.voidItem()),
  fetchPosDispatch: () => dispatch(actions.fetchPOS()),
  fetchTruckDispatch: () => dispatch(actions.fetchTruck(1)),
  activeRouteDispatch: routes => dispatch(actions.activeRoute(routes)),
  fetchCreditSummary: (id, page, filter, sort, summary) => dispatch(actions.fetchCustomerCreditSummary(id, page, filter, sort, summary))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Invoice, axios));
