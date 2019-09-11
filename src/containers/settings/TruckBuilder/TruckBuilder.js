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
import Spinner from '../../../components/UI/Spinner/Spinner';

import Auxillary from '../../../hoc/Auxillary/Auxillary';
import PopUp from '../../../components/PopUp/PopUp';
import PopupBack from '../../../components/PopUp/PopupBack/PopupBack';

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
  async componentDidMount() {
    this.props.fetchTrucksDispatch();
    // const data = await axios.get('/settings/truck');
    // console.log(data.data);
  }
  onChangeValueHandler = async (index, name, event) => {
    this.props.valueChangeDispatch(index, name, event.target.value);
  };
  onToggleView = value => {
    this.setState({ view: value });
  };

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

    let toBeShown =
      this.state.view === 'form' ? (
        view
      ) : (
          <div className={styles.truckForm}>
            {' '}
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
          <Button cName="mainSave" click={this.props.saveTrucksDispatch}>
            {' '}
            &#10004; Save
          </Button>
        </div>
      );
    let showPopup = this.props.popup ? <Auxillary>
      <div className={styles.popup}>
        <PopUp type="simple" close={this.props.closePopup.bind(null)}>Test</PopUp>
      </div>
      <PopupBack close={this.props.closePopup.bind(null)} />
    </Auxillary> : null;
    return this.props.loading ? <Spinner /> : (
      <div className={styles.truckComponent}>
        {showPopup}
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
  loading: state.truckSettings.loading,
  popup: state.truckSettings.popup
});

const mapDispatchToProps = dispatch => ({
  addTruckDispatch: () => dispatch(actions.addTruck()),
  removeTruckDispatch: index => dispatch(actions.removeTruck(index)),
  valueChangeDispatch: (index, name, value) =>
    dispatch(actions.valueChangeTruck(index, name, value)),
  saveTrucksDispatch: () => dispatch(actions.saveTruck()),
  fetchTrucksDispatch: () => dispatch(actions.fetchTruck()),
  closePopup: () => dispatch(actions.togglePopupSettings())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TruckBuilder);
