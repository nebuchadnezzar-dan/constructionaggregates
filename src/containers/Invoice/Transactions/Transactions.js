import React, { Component } from 'react';

import { NavLink } from 'react-router-dom'

import styles from './Transactions.module.scss';

import Button from '../../../components/UI/Button/Button';

class Transactions extends Component {

    render() {
        return (
            // body
            // header 
            // id transaction searcher | button
            // results that are clickable
            <div className={styles.wrapper}>
                <div className={styles.inputSearcher}>
                    <input name="input" placeholder="Transaction ID number" />
                    <Button color="blue">Go</Button>
                </div>

                <div className={styles.resultsWrapper}>
                    <NavLink to={`/pos/${6}/invoice`} >
                        <div className={styles.result}>
                            <div>
                                <p>#123</p>
                                <p>12/25/2019</p>
                            </div>
                            <div>
                                <p>James Charles</p>
                            </div>
                        </div>
                    </NavLink>

                    <NavLink to={`/pos/${6}/invoice`} >
                        <div className={styles.result}>
                            <div>
                                <p>#123</p>
                                <p>12/25/2019</p>
                            </div>
                            <div>
                                <p>James Charles</p>
                            </div>
                        </div>
                    </NavLink>

                    <NavLink to={`/pos/${6}/invoice`} >
                        <div className={styles.result}>
                            <div>
                                <p>#123</p>
                                <p>12/25/2019</p>
                            </div>
                            <div>
                                <p>James Charles</p>
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>
        );
    }

}

export default Transactions;
