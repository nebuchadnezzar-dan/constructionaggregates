import React from 'react';

import styles from './POSCustomer.module.scss';

const posCustomer = props => {
  return (
    <div className={styles.customerWrapper}>
      <div className={styles.customerImgWrapper}>
        <img
          src="https://img2.thejournal.ie/inline/3656556/original/?width=400&version=3656556"
          alt="ph hub"
          className={styles.customerImg}
        />
        {/* <div className={styles.customerImg} /> */}
      </div>
      <div className={styles.customerNameWrapper}>
        <p className={styles.customerName}>Customer Name</p>
        <p>Loyalty Program</p>
      </div>
    </div>
  );
};

export default posCustomer;
