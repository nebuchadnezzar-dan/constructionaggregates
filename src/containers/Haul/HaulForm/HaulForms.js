import React, {Component} from 'react'

import styles from './HaulForm.module.scss'

import {connect} from 'react-redux'

import * as actions from '../../../store/actions/index'

import _ from 'lodash'

import InputSearch from '../../../components/UI/InputSearch/InputSearch'
import Truck from '../../../components/POS/Truck/Truck'
import Button from '../../../components/UI/Button/Button'

import { IoIosRemoveCircleOutline } from "react-icons/io"

class HaulForm extends Component{

  inputChangeHandler = (from, id, e) => {
    this.props.editSupplyHaulDispatch(id, e.target.value, from)
  }

  submitButtonHandler = () => {
    const trucks = Object.keys(this.props.trucks)
    const supplies = _.values(this.props.inputSupplies)

    this.props.postHaulDispatch({trucks, supplies})
  }

  removeButtonHandler = id => {
    this.props.removeSupplyDispatch(id)
  }

  render() {
    return (
      <>
        <div className={styles.form}>
          <h4>Truck to deliver</h4>
          <Truck from="haul" />
          <h4>Supplies to Haul</h4>
          <InputSearch
            elementConfig={{ placeholder: 'Item' }}
            component="haul"
          />
          <div className={styles.items}>
            {_.map(this.props.inputSupplies, supply => (
              <div key={supply.id} className={styles.rowWrapper}>
                <label>{supply.name}</label>
                <input className={[styles.inputElement, styles.green].join(' ')} type="number" placeholder="Qty" value={supply.qty} onChange={this.inputChangeHandler.bind(this, 'qty', supply.id)} />
                <input className={[styles.inputElement, styles.green].join(' ')} type="number" placeholder="Amount" value={supply.amount} onChange={this.inputChangeHandler.bind(this, 'amount', supply.id)} />
                <Button color="red" click={this.removeButtonHandler.bind(null, supply.id)}><IoIosRemoveCircleOutline className={styles.svg}/></Button>
              </div>
            ) )}              
          </div>
          <Button color="green" click={this.submitButtonHandler} >Save</Button>
        </div>      
      </>
    )
  }

}

const mapStateToProps = state => ({
  inputSupplies: state.haul.suppliesInput,
  trucks: state.haul.trucks
})

const mapDispatchToProps = dispatch => ({
  editSupplyHaulDispatch: (id, value, from) => dispatch(actions.editInputSupplyHaul(id, value, from)),
  postHaulDispatch: haul => dispatch(actions.postHaul(haul)),
  removeSupplyDispatch: id => dispatch(actions.removeSupplyHaul(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(HaulForm)
