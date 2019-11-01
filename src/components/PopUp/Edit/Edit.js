import React from 'react';

import styles from './Edit.module.scss';

import Button from '../../UI/Button/Button';
import Auxillary from '../../../hoc/Auxillary/Auxillary';

const payment = props => {

    return (
        <Auxillary>
            <div className={styles.activeRow}>
                <p>Item: {props.items[props.activeRow].name}</p>
                <p>Qty: {props.items[props.activeRow].quantity}</p>
            </div>
            <div className={styles.discountFormWrapper}>
                <div>Qty</div>
                <div>
                    <input
                        onKeyDown={props.keyDown.bind(this, props.action, null)}
                        placeholder="0"
                        type="number"
                        onChange={props.change.bind(this, props.action)}
                        value={props.payment}
                    />
                </div>
                <div>
                    <Button
                        color="red"
                        click={props.clickButton.bind(null, props.action)}
                    >
                        &#10004; Go
                </Button>
                </div>
            </div>
            <hr style={{ margin: '2rem 0' }} />
            <div className={styles.editButtonWrapper}>
                <Button color="red" click={props.void.bind(null)}>
                    {' '}
                    &#128465; Remove
              </Button>
            </div>
        </Auxillary>
    )

}

export default payment