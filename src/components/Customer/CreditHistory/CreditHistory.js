import React, { Component } from 'react';

import styles from './CreditHistory.module.scss';

import Header from './Header/Header';
import Content from './Content/Content';

class CreditHistory extends Component {


    render() {
        return <div className={styles.creditContent}>
            <Header />
            <Content />
        </div>
        //div wrapper for loading and stuff

        //header

        //content
    }

}

export default CreditHistory;