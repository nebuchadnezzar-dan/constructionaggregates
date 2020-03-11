import React, {Component} from 'react'
import {connect} from 'react-redux'
import {storeRoute} from '../../util/storeRoute'

import * as actions from '../../store/actions/index'

import styles from './Haul.module.scss'

import _ from 'lodash'

import Head from '../../components/UI/Head/Head'
import HeadChild from '../../components/UI/HeadChild/HeadChild'
import Truck from '../../components/POS/Truck/Truck'
import Spinner from '../../components/UI/Spinner/Spinner'
import InputSearch from '../../components/UI/InputSearch/InputSearch'
import Button from '../../components/UI/Button/Button'
// import Input

class Haul extends Component {

  componentDidMount(){
    storeRoute(this.props.location.pathname)
    const route = this.props.location.pathname.match(/[a-zA-z]+/g);
    this.props.activeRouteDispatch(route);
    this.props.fetchTruckDispatch();
  }

  inputChangeHandler = (from, id, e) => {
    console.log(from, id, e.target.value)
    this.props.editSupplyHaulDispatch(id, e.target.value, from)
  }

  render() {

    const mainBody = (
        <>
          <Head classname="sea" svgname="haul">
            <HeadChild
              forClassName='form'
              // dispatchClickView={this.onToggleView.bind(null, 'view')}
              // dispatchClickForm={this.onToggleView.bind(null, 'form')}
              childName="Form"
            >
              Haul
            </HeadChild>
          </Head>
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
                <div key={supply.id}>
                  <label>{supply.name}</label>
                  <input className={[styles.inputElement, styles.green].join(' ')} type="number" placeholder="Qty" value={supply.qty} onChange={this.inputChangeHandler.bind(this, 'qty', supply.id)} />
                  <input className={[styles.inputElement, styles.green].join(' ')} type="number" placeholder="Amount" value={supply.amount} onChange={this.inputChangeHandler.bind(this, 'amount', supply.id)} />
                </div>
              ) )}              
            </div>
            <Button color="green">Save</Button>
          </div>
        </>
    )
    
    const spinner = this.props.fetchLoadingTruck ? <Spinner color="grey"/> : mainBody

    return (
      <div className={styles.haulMain}>
        {spinner}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  fetchLoadingTruck: state.truckSettings.loading,
  fetchErrorTruck: state.truckSettings.error,
  inputSupplies: state.haul.suppliesInput
})

const mapDispatchToProps = dispatch => ({
  activeRouteDispatch: routes => dispatch(actions.activeRoute(routes)),
  fetchTruckDispatch: () => dispatch(actions.fetchTruck(1)),
  editSupplyHaulDispatch: (id, value, from) => dispatch(actions.editInputSupplyHaul(id, value, from))
})

export default connect(mapStateToProps, mapDispatchToProps)(Haul)