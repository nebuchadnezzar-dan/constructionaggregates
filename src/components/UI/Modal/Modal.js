import React, { Component } from 'react';

import styles from './Modal.module.scss';

import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import BackgroundModal from '../../PopUp/PopupBack/PopupBack';

import Auxillary from '../../../hoc/Auxillary/Auxillary';

class Modal extends Component {
    render() {
        return this.props.showModal ? <Auxillary>
            <BackgroundModal close={this.props.toggleShowModal} />
            <div className={styles.modal}>
                {this.props.children}
            </div>
        </Auxillary> : null;
    }
}

const mapStateToProps = state => ({
    showModal: state.modal.showGlobalModal
});

const mapDispatchToProps = dispatch => ({
    toggleShowModal: () => dispatch(actions.toggleGlobalModal(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

