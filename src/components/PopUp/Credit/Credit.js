import React, { Component } from 'react';

import styles from './Credit.module.scss';

import Button from '../../UI/Button/Button';
import Auxillary from '../../../hoc/Auxillary/Auxillary';

class Credit extends Component {

    render() {
        const { props } = this;
        return (
            <Auxillary>
                <div className={styles.totalWrapper}>
                    <div>Total:</div>
                    <div>{props.total}</div>
                </div>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead className={styles.tableCredit}>
                            <tr>
                                <th>Item</th>
                                <th>Unit Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.items.map((item, i) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <hr />
                <div className={styles.belowWrapper}>
                    <div>
                        <div>Customer:</div>
                        <div>{`${props.customer.lastName}, ${
                            props.customer.firstName
                            }`}</div>
                    </div>
                    <div>
                        <div>Deliver at:</div>
                        <div>{props.address}</div>
                    </div>
                    <div>
                        <div>Truck:</div>
                        <div>{props.truck.plateNo}</div>
                    </div>
                </div>
                <div className={styles.creditButton}>
                    <Button
                        color="blue"
                        click={props.creditButton.bind(null, props.total)}
                    >
                        Save
              </Button>
                </div>
            </Auxillary>

        );
    }
}

export default Credit;