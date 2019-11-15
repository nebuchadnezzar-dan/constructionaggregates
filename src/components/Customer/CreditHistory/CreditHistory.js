import React, { Component } from 'react';

import styles from './CreditHistory.module.scss';

import Header from './Header/Header';
import Content from './Content/Content';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

import { formFunction } from '../../../util/inputHelper';

const sort = [
    { value: 'date', displayValue: 'Date' },
    { value: 'payment', displayValue: 'Payment' },
    { value: 'total', displayValue: 'Total' }
];

class CreditHistory extends Component {

    state = {
        sort: formFunction('select', null, null, sort),
        sortValue: 'date'
    }
    onChangeValueHandler = async (index, name, event) => {
        this.setState({ sortValue: event.target.value });
        // this.props.valueChangeDispatch(index, name, event.target.value);
    };
    render() {
        let mainBody = null;
        mainBody = <Auxillary>
            <hr />
            <div className={styles.mainHead}>
                <div className={styles.title}>
                    <p>Transaction History</p>
                    <div>|</div>
                    <span><Button cName={
                        this.props.activeButton === 'paid' ? 'headButtonActive' : 'headButton'
                    } click={this.props.filterClick.bind(null, 'paid')}>Paid</Button></span>
                    <div>|</div>
                    <span><Button cName={
                        this.props.activeButton === 'credit' ? 'headButtonActive' : 'headButton'
                    } click={this.props.filterClick.bind(null, 'credit')}>Credit</Button></span>
                </div>
                <div className={styles.sort}>
                    <div>Sort by</div>
                    <Input
                        name="Sort"
                        elementInputType={this.state.sort.elementType}
                        elementConfig={this.state.sort.elementConfig}
                        change={this.props.sortClick}
                        value={this.props.sort}
                        ind={0}
                        color="orange"
                        from="history"
                    />
                </div>
            </div>
            {this.props.data.length ? this.props.data.map((el, i) => {
                return <div key={i} className={styles.creditContent}>
                    <Header total={el.total} date={el.date} payment={el.payment} />
                    <Content purchases={el.purchases} />
                </div>
            }) : <div>{this.props.data.length === 0 && this.props.activeButton === 'paid' ? 'Customer has not purchased anything yet!' : 'Customer has no Credits!'}</div>}
        </Auxillary>;
        return mainBody;
        //div wrapper for loading and stuff

        //header

        //content
    }

}

export default CreditHistory;