import React, {Component} from 'react'
import {connect} from 'react-redux'
import {storeRoute} from '../../util/storeRoute'

import * as actions from '../../store/actions/index'

import styles from './Haul.module.scss'

import Head from '../../components/UI/Head/Head'
import HeadChild from '../../components/UI/HeadChild/HeadChild'
import Spinner from '../../components/UI/Spinner/Spinner'
// import Button from '../../components/UI/Button/Button'
import HaulForm from './HaulForm/HaulForms'
import HaulTable from './HaulTable/HaulTable'

class Haul extends Component {

  state = {
    view: 'form',
    currentpage: 1,
    pageIndex: 5,
  };

  componentDidMount(){
    storeRoute(this.props.location.pathname)
    const route = this.props.location.pathname.match(/[a-zA-z]+/g);
    this.props.activeRouteDispatch(route);
    this.props.fetchTruckDispatch();
    this.props.fetchHaulsDispatch()
  }

  onToggleView = value => {
    this.setState({ view: value });
    if (value === 'form') {
      this.props.fetchTruckDispatch();
      // this.props.toggleGlobalModalDispatch();
    }
  };

  render() {

    const mainBody = (
        <>
          <Head classname="sea" svgname="haul">
            <HeadChild
              forClassName={this.state.view}
              dispatchClickView={this.onToggleView.bind(null, 'view')}
              dispatchClickForm={this.onToggleView.bind(null, 'form')}
              childName="Form"
            >
              Haul
            </HeadChild>
          </Head>
          {this.state.view==='form'? <HaulTable hauls={this.props.hauls} />:<HaulForm/>}
        </>
    )
    
    const spinner = this.props.fetchLoadingTruck || this.props.fetchHaulsLoading ? <Spinner color="grey"/> : mainBody

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
  fetchHaulsLoading: state.haul.fetchLoading,
  fetchHaulsError: state.haul.fetchError,
  hauls: state.haul.hauls
})

const mapDispatchToProps = dispatch => ({
  activeRouteDispatch: routes => dispatch(actions.activeRoute(routes)),
  fetchTruckDispatch: () => dispatch(actions.fetchTruck(1)),
  fetchHaulsDispatch: () => dispatch(actions.getHauls())
})

export default connect(mapStateToProps, mapDispatchToProps)(Haul)