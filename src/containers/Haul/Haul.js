import React, {Component} from 'react'
import {connect} from 'react-redux'
import {storeRoute} from '../../util/storeRoute'

import * as actions from '../../store/actions/index'

import styles from './Haul.module.scss'

import Head from '../../components/UI/Head/Head'
import HeadChild from '../../components/UI/HeadChild/HeadChild'
import Truck from '../../components/POS/Truck/Truck'
import Spinner from '../../components/UI/Spinner/Spinner'
import InputSearch from '../../components/UI/InputSearch/InputSearch'

class Haul extends Component {

  componentDidMount(){
    storeRoute(this.props.location.pathname)
    const route = this.props.location.pathname.match(/[a-zA-z]+/g);
    this.props.activeRouteDispatch(route);
    this.props.fetchTruckDispatch();
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
  fetchErrorTruck: state.truckSettings.error
})

const mapDispatchToProps = dispatch => ({
  activeRouteDispatch: routes => dispatch(actions.activeRoute(routes)),
  fetchTruckDispatch: () => dispatch(actions.fetchTruck(1))
})

export default connect(mapStateToProps, mapDispatchToProps)(Haul)