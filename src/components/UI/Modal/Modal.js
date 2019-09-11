import React, { Component } from 'react';

import styles from './Modal.module.scss';

import Auxillary from '../../../hoc/Auxillary/Auxillary';

class Modal extends Component {

    render() {
        return <Auxillary>
            <div className={styles.modal}>
                {this.props.children}
            </div>
        </Auxillary>
    }
}

export default Modal;

