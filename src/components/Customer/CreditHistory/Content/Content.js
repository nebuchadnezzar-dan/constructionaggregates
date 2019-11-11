import React, { Component } from 'react';

import styles from './Content.module.scss';

import Button from '../../../UI/Button/Button';

class Content extends Component {

    state = {
        hidden: true
    }

    toggleHide = () => {
        this.setState({ hidden: !this.state.hidden });
    }
    render() {

        const table = <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Water</td>
                    <td>200</td>
                    <td>300</td>
                </tr>
            </tbody>
        </table>;

        return <div className={styles.creditSummary}>
            <div className={styles.toggleButton}>
                <button onClick={this.toggleHide} >
                    {this.state.hidden ? <span className={styles.hidden}></span> : <span className={styles.notHidden}></span>}
                    <span>Show Contents</span>
                </button>
            </div>
            {this.state.hidden ? null : table}
        </div>
    }

}

export default Content;