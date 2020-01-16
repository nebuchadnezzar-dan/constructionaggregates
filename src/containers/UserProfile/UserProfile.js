import React, { Component } from 'react'

import { connect } from 'react-redux'
import { storeRoute } from '../../util/storeRoute'

import * as actions from '../../store/actions/index'

import axios from '../../axios-orders'

import styles from './UserProfile.module.scss'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import Head from '../../components/UI/Head/Head'
import HeadChild from '../../components/UI/HeadChild/HeadChild'
// import Button from '../../components/UI/Button/Button'
// import Auxillary from '../../hoc/Auxillary/Auxillary'
// import Spinner from '../../components/UI/Spinner/Spinner'
import ErrorBody from '../../components/UI/ErrorBody/ErrorBody'

import Admin from './Admin/Admin'
import Profile from './Profile/Profile'

class UserProfile extends Component {


    state = {
        view: 'form'
    }

    componentDidMount() {
        storeRoute(this.props.location.pathname)
        const route = this.props.location.pathname.match(/[a-zA-z]+/g)
        this.props.activeRouteDispatch(route)
        // this.props.fetchProfileDispatch(sessionStorage.getItem('id'))
    }

    onToggleView = value => {
        this.setState({ view: value });
        if (value === 'form') {
            this.props.fetchProfileDispatch(sessionStorage.getItem('id'))
            // this.props.fetchTruckDispatch(this.state.currentpage);
            // this.props.toggleGlobalModalDispatch();
        }
    };

    render() {
        const mainBody = this.state.view === 'form' ? <Profile /> : <Admin />

        let mainBodyError = this.props.error ? <ErrorBody>{this.props.children}</ErrorBody> : mainBody;

        return (
            <div className={styles.userMain}>
                <Head classname="violet" svgname="user">
                    <HeadChild childName="Admin"
                        forClassName={this.state.view}
                        dispatchClickView={this.onToggleView.bind(null, 'view')}
                        dispatchClickForm={this.onToggleView.bind(null, 'form')}
                        noChild={+sessionStorage.getItem('role') === 1 ? false : true}>User</HeadChild>
                </Head>
                {mainBodyError}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.profile.loading,
    error: state.profile.error,
    user: state.profile.user,
    putError: state.profile.putError,
    localPopup: state.modal.localModalProfile,
    globalPopup: state.modal.showGlobalModal,
    deletedModal: state.modal.localModalDeleteSettings,
})

const mapDispatchToProps = dispatch => ({
    activeRouteDispatch: routes => dispatch(actions.activeRoute(routes)),
    fetchProfileDispatch: id => dispatch(actions.fetchProfile(id)),
    globalPopupDispatch: () => dispatch(actions.toggleGlobalModal()),
    localPopupDispatchDispatch: local => dispatch(actions.toggleLocalPopupSettings(local)),
    editProfileDispatch: body => dispatch(actions.editProfile(body))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(UserProfile, axios))