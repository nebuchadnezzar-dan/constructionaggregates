import React, { Component } from 'react';

import { connect } from 'react-redux';

import axios from '../../../axios-orders';

import * as actions from '../../../store/actions/index';

import { formFunction, status } from '../../../util/inputHelper';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Head from '../../../components/UI/Head/Head';
import HeadChild from '../../../components/UI/HeadChild/HeadChild';
import Table from '../../../components/UI/Table/Table';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ErrorBody from '../../../components/UI/ErrorBody/ErrorBody';
import Confirmation from '../../../components/UI/Confirmation/Confirmation';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

// import Auxillary from '../../../hoc/Auxillary/Auxillary';

import styles from './TruckBuilder.module.scss';

class TruckBuilder extends Component {
  state = {
    truckForm: {
      maxLoad: formFunction('input', 'number', '0', null, null, null),
      plateNo: formFunction('input', 'text', 'Plate Numer', null, null, null),
      status: formFunction('select', null, null, status)
    },
    view: 'form',
    confirmation: false,
    feedback: false,
    currentpage: 1
  };

  componentDidMount() {
    this.props.fetchTruckDispatch(1);
  }

  onChangePage = (page) => {
    this.setState({ currentpage: page });
    this.props.fetchTruckDispatch(page);
  }

  onChangeValueHandler = async (index, name, event) => {
    this.props.valueChangeDispatch(index, name, event.target.value);
  };
  onToggleView = value => {
    this.setState({ view: value });
  };
  onSendPostRequest = async () => {
    this.props.toggleGlobalModalDispatch();
    this.setState({ confirmation: false, feedback: true });
    await this.props.saveTrucksDispatch();
    this.props.postTruckDispatch(this.props.toBeSavedTrucks);
    this.props.toggleLocalPopupDispatch({ from: 'localModalTruckSettingsForm', value: true, global: true });
  }
  onViewModalHandler = (button) => {
    if (button === 'showConfirmation') {
      this.props.resetRequestDispatch();
      this.props.toggleLocalPopupDispatch({ from: 'localModalTruckSettingsForm', value: true, global: true });
      this.setState({ confirmation: true, feedback: false })
    } else if (button === 'closeButton') {
      this.props.toggleGlobalModalDispatch();
      this.setState({ confirmation: false, feedback: false })
    }
  }

  render() {
    let buttonPages = [];
    for (let i = 0; i < this.props.pages; i++) {
      let ind = i + 1;
      buttonPages.push(<Button key={i} color={this.state.currentpage === ind ? 'green' : null} click={this.onChangePage.bind(null, ind)}>{ind}</Button>);
    }

    const view = (
      <div className={styles.view}>
        <Table
          data={this.props.availableTrucks}
          cName="green"
          from="truckSettings"
        />
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          {buttonPages}
        </div>
      </div>
    );
    const modalBody = (
      <Modal>
        <Confirmation
          confirmation={this.state.confirmation}
          error={this.props.postError}
          proceed={this.onSendPostRequest.bind(null)}
          feedback={this.state.feedback}
          okClose={this.onViewModalHandler.bind(null, 'closeButton')}
        />
      </Modal>
    );
    let modalConfirmation = this.props.showGlobalModal && this.props.truckLocalPopup && !this.props.postError ? modalBody : null;
    let formBodyWithSpinner = this.props.postLoading ? <Spinner color="grey" /> : (this.props.truckForm.map((el, i) => {
      let input = [];
      for (let formKey in this.state.truckForm) {
        input.push(
          <Input
            key={formKey}
            name={formKey}
            elementInputType={this.state.truckForm[formKey].elementType}
            elementConfig={this.state.truckForm[formKey].elementConfig}
            change={this.onChangeValueHandler}
            value={el[formKey]}
            ind={i}
            color="green"
          />
        );
      }
      return (
        <div key={i} className={styles.rowForm}>
          <Button
            cName="Close"
            click={this.props.removeTruckDispatch.bind(null, i)}
          >
            X
        </Button>
          {input}
        </div>
      );
    }));
    let toBeShown =
      this.state.view === 'form' ? (
        view
      ) : (
          <div className={styles.truckForm}>
            {' '}
            {modalConfirmation}
            {formBodyWithSpinner}
          </div>
        );
    let button =
      this.state.view === 'form' ? null : (
        <div className={styles.buttonPosition}>
          <Button cName="Main" click={this.props.addTruckDispatch}>
            &#9951; Add More Truck
          </Button>
          <Button cName="mainSave" click={this.onViewModalHandler.bind(null, 'showConfirmation')}>
            {' '}
            &#10004; Save
          </Button>
        </div>
      );
    let mainBody = <div className={styles.truckComponent}>
      {/* {this.props.children} */}
      <Head classname="green" svgname="truck">
        <HeadChild
          forClassName={this.state.view}
          dispatchClickView={this.onToggleView.bind(null, 'view')}
          dispatchClickForm={this.onToggleView.bind(null, 'form')}
          childName="Form"
        >
          TRUCK
    </HeadChild>
      </Head>
      {toBeShown}
      {button}
    </div>;
    let truckWithError = this.props.fetchError ? <ErrorBody>{this.props.children}</ErrorBody> : mainBody;
    let truckWithSpinner = this.props.fetchLoading ? <Spinner color="grey" /> : truckWithError
    return (truckWithSpinner);
  }
}

const mapStateToProps = state => ({
  truckForm: state.truckSettings.trucks,
  availableTrucks: state.truckSettings.availableTrucks,
  pages: state.truckSettings.pages,
  showGlobalModal: state.modal.showGlobalModal,
  toBeSavedTrucks: state.truckSettings.trucksToBeSaved,
  fetchError: state.truckSettings.error,
  fetchLoading: state.truckSettings.loading,
  postLoading: state.truckSettings.postLoading,
  postError: state.truckSettings.postError,
  truckLocalPopup: state.modal.localModalTruckSettingsForm
});

const mapDispatchToProps = dispatch => ({
  addTruckDispatch: () => dispatch(actions.addTruck()),
  removeTruckDispatch: index => dispatch(actions.removeTruck(index)),
  valueChangeDispatch: (index, name, value) =>
    dispatch(actions.valueChangeTruck(index, name, value)),
  saveTrucksDispatch: () => dispatch(actions.saveTruck()),
  fetchTruckDispatch: (page) => dispatch(actions.fetchTruck(page)),
  postTruckDispatch: data => dispatch(actions.postTruck(data)),
  resetRequestDispatch: () => dispatch(actions.truckRequestReset()),
  toggleGlobalModalDispatch: () => dispatch(actions.toggleGlobalModal()),
  toggleLocalPopupDispatch: value => dispatch(actions.toggleLocalPopupSettings(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(TruckBuilder, axios));
