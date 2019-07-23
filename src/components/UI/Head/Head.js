import React from 'react';
import styles from './Head.module.scss';

import { ReactComponent as Truck } from '../../../assets/svg/truck.svg';
import { ReactComponent as Supply } from '../../../assets/svg/price-tag.svg';
import { ReactComponent as Invoice } from '../../../assets/svg/calculator.svg';
import { ReactComponent as Customer } from '../../../assets/svg/address-book.svg';

const head = ({ children, classname, svgname }) => {
  const svgName = {
    truck: <Truck />,
    supply: <Supply />,
    invoice: <Invoice />,
    customer: <Customer />
  };
  return (
    <div className={[styles.head, styles[classname]].join(' ')}>
      <div>{svgName[svgname]}</div>
      <div>{children}</div>
    </div>
  );
};

export default head;
