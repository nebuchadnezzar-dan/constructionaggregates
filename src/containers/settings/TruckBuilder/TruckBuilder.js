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

import styles from './TruckBuilder.module.scss';

class TruckBuilder extends Component {
  state = {
    truckForm: {
      maxLoad: formFunction('input', 'number', '0', null, null, null),
      plateNo: formFunction('input', 'text', 'Plate Numer', null, null, null),
      status: formFunction('select', null, null, status)
    },
    view: 'form'
  };

  onChangeValueHandler = async (index, name, event) => {
    this.props.valueChangeDispatch(index, name, event.target.value);
  };
  onToggleView = value => {
    this.setState({ view: value });
  };
  onSendPostRequest = async () => {
    await this.props.saveTrucksDispatch();
    this.props.postTruckDispatch(this.props.toBeSavedTrucks);
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
    const modalBody = (
      <Modal>
        <div className={styles.modalBody}>
          <p>Are you sure you want to proceed?</p>
          <Button color="green" click={this.onSendPostRequest.bind(null)} >Yes</Button>
          <Button color="red" click={this.props.toggleGlobalModal.bind(null, false)}>Cancel</Button>
        </div>
      </Modal>
    );
    let modalConfirmation = this.props.showGlobalModal ? modalBody : null;
    let toBeShown =
      this.state.view === 'form' ? (
        view
      ) : (
          <div className={styles.truckForm}>
            {' '}
            {modalConfirmation}
            {this.props.truckForm.map((el, i) => {
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
            })}
          </div>
        );
    let button =
      this.state.view === 'form' ? null : (
        <div className={styles.buttonPosition}>
          <Button cName="Main" click={this.props.addTruckDispatch}>
            &#9951; Add More Truck
          </Button>
          {/* <Button cName="mainSave" click={this.props.saveTrucksDispatch}>
            {' '}
            &#10004; Save
          </Button> */}
          <Button cName="mainSave" click={this.props.toggleGlobalModal.bind(null, true)}>
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
  toBeSavedTrucks: state.truckSettings.trucksToBeSaved
});

const mapDispatchToProps = dispatch => ({
  addTruckDispatch: () => dispatch(actions.addTruck()),
  removeTruckDispatch: index => dispatch(actions.removeTruck(index)),
  valueChangeDispatch: (index, name, value) =>
    dispatch(actions.valueChangeTruck(index, name, value)),
  saveTrucksDispatch: () => dispatch(actions.saveTruck()),
  toggleGlobalModal: value => dispatch(actions.toggleGlobalModal(value)),
  postTruckDispatch: data => dispatch(actions.postTruck(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TruckBuilder);
