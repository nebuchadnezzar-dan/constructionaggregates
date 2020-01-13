import React, { Component } from 'react'

import { connect } from 'react-redux'
import { storeRoute } from '../../util/storeRoute'

import * as actions from '../../store/actions/index'

import styles from './UserProfile.module.scss'

import Head from '../../components/UI/Head/Head'
import HeadChild from '../../components/UI/HeadChild/HeadChild'
import Button from '../../components/UI/Button/Button'

class UserProfile extends Component {

    componentDidMount() {
        storeRoute(this.props.location.pathname)
        const route = this.props.location.pathname.match(/[a-zA-z]+/g)
        this.props.activeRouteDispatch(route)
    }

    render() {
        return (
            <div className={styles.userMain}>
                <Head classname="violet" svgname="user">
                    <HeadChild childName="Admin">User</HeadChild>
                </Head>
                <div className={styles.profileHeader}>User Profile</div>
                <div className={styles.profileParent}>
                    <div className={styles.profileImg}>
                        <div>
                            <img src="https://img2.thejournal.ie/inline/3656556/original/?width=400&version=3656556" />
                        </div>
                        <Button color="violet">Upload</Button>
                    </div>
                    <div className={styles.profileDesc}>
                        <div className={styles.profileDescBody}>
                            <div>
                                <div className={styles.label}>Last Name</div>
                                <div className={styles.value}>lorem ipsum</div>
                            </div>
                            <div>
                                <div className={styles.label}>First Name</div>
                                <div className={styles.value}>lorem ipsum</div>
                            </div>
                            <div>
                                <div className={styles.label}>Email</div>
                                <div className={styles.value}>lorem ipsum</div>
                            </div>
                            <div>
                                <div className={styles.label}>Contact No.</div>
                                <div className={styles.value}>lorem ipsum</div>
                            </div>
                            <hr className={styles.line} />
                            <div>
                                <Button color="blue">Edit</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// const mapStateToProps = state => ({

// })

const mapDispatchToProps = dispatch => ({
    activeRouteDispatch: routes => dispatch(actions.activeRoute(routes))
})

export default connect(null, mapDispatchToProps)(UserProfile)