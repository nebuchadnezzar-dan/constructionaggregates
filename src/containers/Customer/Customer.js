import React, { Component } from 'react';

import styles from './Customer.module.scss';

import Head from '../../components/UI/Head/Head';
import HeadChild from '../../components/UI/HeadChild/HeadChild';
import Button from '../../components/UI/Button/Button';
import Auxillary from '../../hoc/Auxillary/Auxillary';

class Customer extends Component {
  state = {
    activeView: 'form'
  };
  onToggleView = view => {
    this.setState({ activeView: view });
  };
  render() {
    const customerView = (
      <Auxillary>
        {' '}
        <div className={styles.search}>
          <div />
          <span className={styles.searchIcon}>&#9906;</span>
          <input
            className={styles.input}
            placeholder="Customer"
            type="text"
            // value={this.props.truckSearchForm}
            // onChange={this.onTruckHandler}
          />
        </div>
        <div className={styles.cutomerTable}>
          <table>
            <thead>
              <tr>
                <th>
                  <div className={styles.sortButtonWrapper}>
                    <div>Customer</div>
                    <div className={styles.sortButton}>
                      <Button cName="smallUp"> &#9650;</Button>
                      <Button cName="smallDown"> &#9650;</Button>
                    </div>
                  </div>
                </th>
                <th>
                  <div className={styles.sortButtonWrapper}>
                    <div>Credit</div>
                    <div className={styles.sortButton}>
                      <Button cName="smallUp"> &#9650;</Button>
                      <Button cName="smallDown"> &#9650;</Button>
                    </div>
                  </div>
                </th>
                <th>
                  <div className={styles.sortButtonWrapper}>
                    <div>Date Registered</div>
                    <div className={styles.sortButton}>
                      <Button cName="smallUp"> &#9650;</Button>
                      <Button cName="smallDown"> &#9650;</Button>
                    </div>
                  </div>
                </th>
                <th>
                  <div className={styles.sortButtonWrapper}>
                    <div>No. of Times purchased</div>
                    <div className={styles.sortButton}>
                      <Button cName="smallUp"> &#9650;</Button>
                      <Button cName="smallDown"> &#9650;</Button>
                    </div>
                  </div>
                </th>
                <th>
                  <div className={styles.sortButtonWrapper}>
                    <div>Action</div>
                    <div className={styles.sortButton}>
                      <Button cName="smallUp"> &#9650;</Button>
                      <Button cName="smallDown"> &#9650;</Button>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.odd}>
                <td>Charlie</td>
                <td>2000</td>
                <td>01/01/2019</td>
                <td>2</td>
                <td>
                  <Button cName="delete">&#128465;</Button>
                  <Button cName="edit">&#9998;</Button>
                </td>
              </tr>
              <tr className={styles.even}>
                <td>Anne</td>
                <td>0</td>
                <td>02/03/2019</td>
                <td>5</td>
                <td>
                  <Button cName="delete">&#128465;</Button>
                  <Button cName="edit">&#9998;</Button>
                </td>
              </tr>
              <tr className={styles.odd}>
                <td>Pepita</td>
                <td>10000</td>
                <td>05/01/2019</td>
                <td>15</td>
                <td>
                  <Button cName="delete">&#128465;</Button>
                  <Button cName="edit">&#9998;</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.tableButtons}>
          <div>
            <Button> &#171;</Button>
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
            <Button>4</Button>
            <Button>&#187;</Button>
          </div>
        </div>
      </Auxillary>
    );
    const customerForm = (
      <div>
        <div className={styles.title}>New Customer</div>
        <div className={styles.customer}>
          <div className={styles.customerName}>Name</div>
          <div className={styles.customerInputWrapper}>
            <input
              type="text"
              placeholder="Last Name"
              className={styles.customerInput}
            />
          </div>
          <div className={styles.customerInputWrapper}>
            <input
              type="text"
              placeholder="First Name"
              className={styles.customerInput}
            />
          </div>
          <Button color="red">Save</Button>
        </div>
      </div>
    );
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
