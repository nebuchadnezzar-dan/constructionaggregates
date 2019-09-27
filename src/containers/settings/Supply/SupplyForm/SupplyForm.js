import React, { Component } from 'react';

import styles from './SupplyForm.module.scss';

import Button from '../../../../components/UI/Button/Button';

class SupplyForm extends Component {
    state = {
        materials: '',
        amount: '',
        price: ''
    }

    onChangeInput = (name, e) => {
        // console.log(name, e.target.value);
        this.setState({ [name]: e.target.value });
    }

    render() {
        return (<div className={styles.supplyForm}>
            <div className={styles.title}>New Supply</div>
            <div className={styles.body}>
                <div>
                    <div className={styles.label}>Material</div>
                    <div className={styles.inputWrapper}><input className={styles.input} type="text" value={this.state.materials} onChange={this.onChangeInput.bind(this, 'materials')} /></div>
                </div>
                <div>
                    <div className={styles.label}>Amount</div>
                    <div className={styles.inputWrapper}><input className={styles.input} type="number" value={this.state.amount} onChange={this.onChangeInput.bind(this, 'amount')} /></div>
                </div>
                <div>
                    <div className={styles.label}>Price</div>
                    <div className={styles.inputWrapper}><input className={styles.input} type="number" value={this.state.price} onChange={this.onChangeInput.bind(this, 'price')} /></div>
                </div>
                <Button color="orange">Save</Button>
            </div>
        </div>)
    }

}

export default SupplyForm;