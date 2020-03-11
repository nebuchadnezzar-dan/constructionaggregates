import React, {Component} from 'react'
import {connect} from 'react-redux'
import {storeRoute} from '../../util/storeRoute'

import * as actions from '../../store/actions/index'

import styles from './Haul.module.scss'

class Haul extends Component {

  componentDidMount(){
    storeRoute(this.props.location.pathname)
    const route = this.props.location.pathname.match(/[a-zA-z]+/g);
    this.props.activeRouteDispatch(route);
  }

  render() {
    return (
      <>
        <div className={styles.haulMain}>
          <h1>Haul</h1>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  activeRouteDispatch: routes => dispatch(actions.activeRoute(routes))
})

export default connect(mapStateToProps, mapDispatchToProps)(Haul)