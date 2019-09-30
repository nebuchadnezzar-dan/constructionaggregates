import React, { Component } from 'react';

import { connect } from 'react-redux';

import styles from './TruckForm.module.scss';

import * as actions from '../../../../store/actions/index';

import { formFunction, status } from '../../../../util/inputHelper';

import Input from '../../../../components/UI/Input/Input';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Button from '../../../../components/UI/Button/Button';
import Confirmation from '../../../../components/UI/Confirmation/Confirmation';
import Modal from '../../../../components/UI/Modal/Modal';
import Auxillary from '../../../../hoc/Auxillary/Auxillary'

class TruckForm extends Component {

    state = {
        truckForm: {
            maxLoad: formFunction('input', 'number', '0', null, null, null),
            plateNo: formFunction('input', 'text', 'Plate Numer', null, null, null),
            status: formFunction('select', null, null, status)
        },
        confirmation: false,
        feedback: false,
    }

    onChangeValueHandler = async (index, name, event) => {
        this.props.valueChangeDispatch(index, name, event.target.value);
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


        let modalConfirmation = this.props.showGlobalModal && this.props.truckLocalPopup ? modalBody : null;

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


        return (
            <Auxillary>
                {modalConfirmation}
                <div className={styles.truckForm}>
                    {formBodyWithSpinner}
                </div>
                <div className={styles.buttonPosition}>
                    <Button cName="Main" click={this.props.addTruckDispatch}>
                        &#9951; Add More Truck
                </Button>
                    {this.props.truckForm.length > 0 ? <Button cName="mainSave" click={this.onViewModalHandler.bind(null, 'showConfirmation')}>
                        {' '}
                        &#10004; Save
                </Button> : null}
                </div>
            </Auxillary>
        );

    }

}

const mapStateToProps = state => ({
    truckForm: state.truckSettings.trucks,
    toBeSavedTrucks: state.truckSettings.trucksToBeSaved,
    postLoading: state.truckSettings.postLoading,
    postError: state.truckSettings.postError,
    truckLocalPopup: state.modal.localModalTruckSettingsForm,
    showGlobalModal: state.modal.showGlobalModal,
});

const maptDispatchToProps = dispatch => ({
    addTruckDispatch: () => dispatch(actions.addTruck()),
    removeTruckDispatch: index => dispatch(actions.removeTruck(index)),
    valueChangeDispatch: (index, name, value) =>
        dispatch(actions.valueChangeTruck(index, name, value)),
    saveTrucksDispatch: () => dispatch(actions.saveTruck()),
    postTruckDispatch: data => dispatch(actions.postTruck(data)),
    resetRequestDispatch: () => dispatch(actions.truckRequestReset()),
    toggleGlobalModalDispatch: () => dispatch(actions.toggleGlobalModal()),
    toggleLocalPopupDispatch: value => dispatch(actions.toggleLocalPopupSettings(value))
});


export default connect(mapStateToProps, maptDispatchToProps)(TruckForm);