import React, { Component } from 'react';

import styles from './Discount.module.scss';

import Button from '../../UI/Button/Button';

class Discount extends Component {
    render() {
        const { props } = this;
        return (
            <div className={styles.discountFormWrapper}>
                <div>Discount</div>
                <div>
                    <input
                        onKeyDown={props.keyDown.bind(this, props.action)}
                        placeholder="0"
                        type="number"
                        onChange={props.change.bind(this, props.action)}
                        value={props.payment}
                    />
                </div>
                <div>
                    <Button
                        color="violet"
                        click={props.clickButton.bind(null, props.action)}
                    >
                        &#10004; Go
                </Button>
                </div>
            </div>
        );
    }
}

export default Discount;