import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/index';

import styles from './SupplyForm.module.scss';

import Button from '../../../../components/UI/Button/Button';
import Confirmation from '../../../../components/UI/Confirmation/Confirmation';
import Auxillary from '../../../../hoc/Auxillary/Auxillary';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Modal from '../../../../components/UI/Modal/Modal';

class SupplyForm extends Component {
    state = {
        name: '',
        amount: '',
        price: '',
        confirmation: false,
        feedback: false
    }

    onChangeInput = (name, e) => {
        // console.log(name, e.target.value);
        this.setState({ [name]: e.target.value });
    }

    onClickConfirmation = () => {
        console.log('clicked');
        this.setState({ confirmation: true, feedback: false });
        this.props.localPopupDispatchDispatch({ from: 'localModalSupplySettingsForm', value: true, global: true });
    }

    onSendPostRequest = async () => {
        this.setState({ confirmation: false, feedback: true, name: '', amount: '', price: '' });
        this.props.globalPopupDispatch();
        await this.props.postSupplyDispatch({ name: this.state.name, amount: this.state.amount, price: this.state.price });
        this.props.localPopupDispatchDispatch({ from: 'localModalSupplySettingsForm', value: true, global: true });
    }

    onCloseModalHandler = () => {
        this.setState({ confirmation: false, feedback: false });
        this.props.globalPopupDispatch();
    }

    render() {
        const modalBody = this.props.localPopup && this.props.globalPopup ?
            <Modal>
                <Confirmation
                    confirmation={this.state.confirmation}
                    error={this.props.error}
                    proceed={this.onSendPostRequest.bind(null)}
                    feedback={this.state.feedback}
                    okClose={this.onCloseModalHandler.bind(null)}

                />
            </Modal>
            : null;
        const spinnerBody = this.props.loading ? <Spinner color="grey" /> : (
            <div className={styles.supplyForm}>
                <div className={styles.title}>New Supply</div>
                <div className={styles.body}>
                    <div>
                        <div className={styles.label}>Material</div>
                        <div className={styles.inputWrapper}><input className={styles.input} type="text" value={this.state.name} onChange={this.onChangeInput.bind(this, 'name')} /></div>
                    </div>
                    <div>
                        <div className={styles.label}>Amount</div>
                        <div className={styles.inputWrapper}><input className={styles.input} type="number" value={this.state.amount} onChange={this.onChangeInput.bind(this, 'amount')} /></div>
                    </div>
                    <div>
                        <div className={styles.label}>Price</div>
                        <div className={styles.inputWrapper}><input className={styles.input} type="number" value={this.state.price} onChange={this.onChangeInput.bind(this, 'price')} /></div>
                    </div>
                    <Button color="orange" click={this.onClickConfirmation}>Save</Button>
                </div>
            </div>
        )
        return (
            <Auxillary>
                {modalBody}
                {spinnerBody}
            </Auxillary>
        )
    }

}

const mapStateToProps = state => ({
    localPopup: state.modal.localModalSupplySettingsForm,
    globalPopup: state.modal.showGlobalModal,
    loading: state.supplySettings.postLoading,
    error: state.supplySettings.postError
});

const mapDispatchToProps = dispatch => ({
    postSupplyDispatch: data => dispatch(actions.postSupply(data)),
    globalPopupDispatch: () => dispatch(actions.toggleGlobalModal()),
    localPopupDispatchDispatch: local => dispatch(actions.toggleLocalPopupSettings(local))
});

export default connect(mapStateToProps, mapDispatchToProps)(SupplyForm);