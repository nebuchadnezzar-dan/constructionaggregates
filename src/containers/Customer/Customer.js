import React, { Component } from 'react';

import styles from './Customer.module.scss';

import Head from '../../components/UI/Head/Head';
import HeadChild from '../../components/UI/HeadChild/HeadChild';
import CustomerTable from './CustomerTable/CustomerTable';
import CustomerForm from './CustomerForm/CustomerForm';

class Customer extends Component {
  state = {
    activeView: 'form'
  };
  onToggleView = view => {
    this.setState({ activeView: view });
  };
  render() {
    const customerView = <CustomerTable />;
    const customerForm = <CustomerForm />;
    const customer =
      this.state.activeView === 'form' ? customerView : customerForm;
    return (
      <div className={styles.cutomerMain}>
        <Head classname="red" svgname="customer">
          <HeadChild
            forClassName={this.state.activeView}
            dispatchClickView={this.onToggleView.bind(null, 'view')}
            dispatchClickForm={this.onToggleView.bind(null, 'form')}
            childName="Form"
          >
            Customers
          </HeadChild>
        </Head>
        <div className={styles.customerBody}>{customer}</div>
      </div>
    );
  }
}

export default Customer;
