import React, { Component } from 'react';

import { connect } from 'react-redux';

// import axios from '../../../axios-orders';

import * as actions from '../../../store/actions/index';

import { formFunction, status } from '../../../util/inputHelper';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Head from '../../../components/UI/Head/Head';
import HeadChild from '../../../components/UI/HeadChild/HeadChild';
import Table from '../../../components/UI/Table/Table';
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';

import Auxillary from '../../../hoc/Auxillary/Auxillary';

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
  };

  onChangeValueHandler = async (index, name, event) => {
    this.props.valueChangeDispatch(index, name, event.target.value);
  };
  onToggleView = value => {
    this.setState({ view: value });
  };
  onSendPostRequest = async () => {
    this.props.toggleGlobalModal(false);
    this.setState({ confirmation: false, feedback: true });
    await this.props.saveTrucksDispatch();
    this.props.postTruckDispatch(this.props.toBeSavedTrucks);
    this.props.toggleGlobalModal(true);
  }
  onViewModalHandler = (button) => {
    if (button === 'showConfirmation') {
      this.props.resetRequestDispatch();
      this.props.toggleGlobalModal(true);
      this.setState({ confirmation: true, feedback: false })
    } else if (button === 'closeButton') {
      this.props.toggleGlobalModal(false);
      this.setState({ confirmation: false, feedback: false })
    }
  }

  render() {
    const view = (
      <div className={styles.view}>
        <Table
          data={this.props.availableTrucks}
          cName="green"
          from="truckSettings"
        />
      </div>
    );
    let modalChild;
    if (this.state.confirmation) {
      modalChild = <Auxillary><p>Are you sure you want to proceed?</p>
        <Button color="green" click={this.onSendPostRequest.bind(null)} >Yes</Button>
        <Button color="red" click={this.onViewModalHandler.bind(null, 'closeButton')}>Cancel</Button></Auxillary>;
    } else if (this.state.feedback) {
      modalChild = this.props.postError ? <Auxillary>
        <p>Something went wrong! Please try again.</p>
        <Button color="red" click={this.onViewModalHandler.bind(null, 'closeButton')}>
          OK
      </Button>
      </Auxillary> : <Auxillary>
          <p>Record succesfully updated/saved!</p>
          <Button color="green" click={this.onViewModalHandler.bind(null, 'closeButton')}>
            &#10004;
        </Button>
        </Auxillary>;
    }
    const modalBody = (
      <Modal>
        <div className={styles.modalBody}>
          {modalChild}
        </div>
      </Modal>
    );
    let modalConfirmation = this.props.showGlobalModal && !this.props.postError ? modalBody : null;
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
    return (
      <div className={styles.truckComponent}>
        {this.props.children}
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  truckForm: state.truckSettings.trucks,
  availableTrucks: state.truckSettings.availableTrucks,
  showGlobalModal: state.modal.showGlobalModal,
  toBeSavedTrucks: state.truckSettings.trucksToBeSaved,
  postLoading: state.truckSettings.postLoading,
  postError: state.truckSettings.postError
});

const mapDispatchToProps = dispatch => ({
  addTruckDispatch: () => dispatch(actions.addTruck()),
  removeTruckDispatch: index => dispatch(actions.removeTruck(index)),
  valueChangeDispatch: (index, name, value) =>
    dispatch(actions.valueChangeTruck(index, name, value)),
  saveTrucksDispatch: () => dispatch(actions.saveTruck()),
  toggleGlobalModal: value => dispatch(actions.toggleGlobalModal(value)),
  postTruckDispatch: data => dispatch(actions.postTruck(data)),
  resetRequestDispatch: () => dispatch(actions.truckRequestReset())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TruckBuilder);
