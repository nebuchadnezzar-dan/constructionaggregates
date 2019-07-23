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
import Truck from '../../components/Truck/Truck';
import POSButtons from '../../components/POSButtons/POSButtons';

class Invoice extends Component {
  state = {
    invoiceForm: {
      item: { type: 'text', placeholder: 'Item' },
      'plate no': { type: 'text', placeholder: 'Item' },
      discount: { type: 'number', placeholder: '0' }
    }
  };
  componentDidMount() {
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
      if (this.props.finalPopup) this.props.onToggleFinalPopupDispatch();
    }
  };

  render() {
    const popupShow = this.props.popup ? (
      <Auxillary>
        <div className={styles.popup}>
          <PopUp cName="blink" type="simple">
            Item doesn't exist
          </PopUp>
        </div>
        <div
          className={styles.popupBack}
          onClick={this.props.onPopUpShowDispatch.bind(null)}
        />
      </Auxillary>
    ) : null;
    const finalPopup = this.props.finalPopup ? (
      <Auxillary>
        <div className={styles.finalPopup}>
          <PopUp type="final">Item doesn't exist</PopUp>
        </div>
        <div
          className={styles.finalPopupBack}
          onClick={this.props.onToggleFinalPopupDispatch.bind(null)}
        />
      </Auxillary>
    ) : null;
    return (
      <div className={styles.invoiceMain}>
        <Head classname="blue" svgname="invoice">
          <HeadChild>Invoice</HeadChild>
        </Head>
        <div className={styles.invoiceWrapper}>
          {finalPopup}
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
          </div>
          <hr style={{ width: '1', border: ' 0.5px solid #26c6da' }} />
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
          </div>
        </div>
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
  address: state.invoicePOS.address
});

const mapDispatchToProps = dispatch => ({
  onPopUpShowDispatch: () => dispatch(actions.togglePopup(false)),
  onChangeQualityDispatch: value => dispatch(actions.onChangeQuantity(value)),
  onToggleFinalPopupDispatch: () =>
    dispatch(actions.toggleFinalPopup({ toggle: false })),
  onEditAddressDispatch: value => dispatch(actions.editAddress(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoice);
