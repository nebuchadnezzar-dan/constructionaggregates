import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import styles from './POSButtons.module.scss';

import Button from '../../UI/Button/Button';

import { ReactComponent as Edit } from '../../../assets/svg/pencil.svg';
import { ReactComponent as Cancel } from '../../../assets/svg/undo2.svg';
import { ReactComponent as Discount } from '../../../assets/svg/ticket.svg';
import { ReactComponent as Credit } from '../../../assets/svg/credit-card.svg';
import { ReactComponent as Pay } from '../../../assets/svg/coin-dollar.svg';

class POSButtons extends Component {
  state = {
    buttons: [
      { name: 'edit', color: 'red', svg: <Edit className={styles.svg} /> },
      {
        name: 'cancel',
        color: 'orange',
        svg: <Cancel className={styles.svg} />
      },
      {
        name: 'discount',
        color: 'violet',
        svg: <Discount className={styles.svg} />
      },
      { name: 'credit', color: 'blue', svg: <Credit className={styles.svg} /> },
      { name: 'pay', color: 'green', svg: <Pay className={styles.svg} /> }
    ]
  };
  buttonClickHandler = name => {
    console.log('clicked', name);
    this.props.toggleButton(name);
  };
  render() {
    return (
      <div className={styles.buttonWrapper}>
        {this.state.buttons.map(button => {
          let disabled = this.props.itemsToBuy.length === 0 || this.props.address.length === 0 ? true : false;
          if (button.name === 'edit') {
            disabled = typeof this.props.activeRowRedux === 'number' ? false : true;
          }
          if (button.name === 'cancel') {
            disabled = this.props.activeCustomer.length === 0 ? true : false;
          }
          return (
            <Button
              key={button.name}
              disabled={disabled}
              cName="posButtonAction"
              color={button.color}
              click={this.buttonClickHandler.bind(null, button.name)}
            >
              <div className={styles.buttonInside}>
                {button.svg}
                {button.name}
              </div>
            </Button>
          )
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  itemsToBuy: state.invoicePOS.itemsToBuy,
  activeRowRedux: state.invoicePOS.activeRow,
  address: state.invoicePOS.address,
  activeCustomer: state.invoicePOS.customer
})

const mapDispatchToProps = dispatch => ({
  toggleButton: name =>
    dispatch(actions.toggleFinalPopup({ name, toggle: true }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(POSButtons);
