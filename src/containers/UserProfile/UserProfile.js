import React, { Component } from 'react'

import { connect } from 'react-redux'
import { storeRoute } from '../../util/storeRoute'

import * as actions from '../../store/actions/index'

import axios from '../../axios-orders'

import styles from './UserProfile.module.scss'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import Head from '../../components/UI/Head/Head'
import HeadChild from '../../components/UI/HeadChild/HeadChild'
import Button from '../../components/UI/Button/Button'
import Auxillary from '../../hoc/Auxillary/Auxillary'
import Spinner from '../../components/UI/Spinner/Spinner'
import Modal from '../../components/UI/Modal/Modal'
import Confirmation from '../../components/UI/Confirmation/Confirmation'
import ErrorBody from '../../components/UI/ErrorBody/ErrorBody'


const fields = [{
    name: 'lastName',
    type: 'text',
    placeholder: 'Last Name',
}, {
    name: 'firstName',
    type: 'text',
    placeholder: 'First Name',
}, {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
}, {
    name: 'contactNo',
    type: 'text',
    placeholder: 'Place Holder'
}
]

class UserProfile extends Component {


    state = {
        editMode: 'view',
        inputValue: {
            lastName: '',
            firstName: '',
            email: '',
            contactNo: ''
        },
        feedback: false,
        confirmation: false,
    }

    componentDidMount() {
        storeRoute(this.props.location.pathname)
        const route = this.props.location.pathname.match(/[a-zA-z]+/g)
        this.props.activeRouteDispatch(route)
        this.props.fetchProfileDispatch(sessionStorage.getItem('id'))
    }

    editFieldHandler = (name, e) => {
        this.setState({ inputValue: { ...this.state.inputValue, [name]: e.target.value } })
    }

    toggleEditHandler = (mode) => {
        const user = this.props.user
        this.setState({
            editMode: mode, inputValue: {
                ...this.state.inputValue, lastName: user.lastName, firstName: user.firstName, email: user.email, contactNo: user.contactNo
            }
        })
    }

    onSendPostRequest = async () => {
        this.props.globalPopupDispatch();
        if (this.state.button === 'edit') {
            this.props.editProfileDispatch({ ...this.state.inputValue, userId: sessionStorage.getItem('id') })
            this.props.localPopupDispatchDispatch({ from: 'localModalProfile', value: true, global: true });
        } else {
            await this.props.localPopupDispatchDispatch({ from: 'localModalDeleteSettings', value: true, global: true });
        }
        this.setState({ confirmation: false, feedback: true, editMode: 'view' });
    }

    onCloseModalHandler = () => {
        this.props.globalPopupDispatch();
        this.setState({ confirmation: false, feedback: false });
    }

    onConfirm = button => {
        this.setState({ confirmation: true, feedback: false, button });
        this.props.localPopupDispatchDispatch({ from: 'localModalProfile', value: true, global: true });

    }

    render() {
        const user = this.props.user
        const scope = {
            lastName: user.lastName,
            firstName: user.firstName,
            email: user.email,
            contactNo: user.contactNo
        }

        const button = this.state.editMode === 'view' ? (
            <Auxillary>
                <Button color="blue"
                    click={this.toggleEditHandler.bind(null, 'edit')}>
                    Edit
                </Button>
            </Auxillary>
        ) : (
                <Auxillary>
                    <Button color="orange"
                        click={this.toggleEditHandler.bind(null, 'view')}>
                        Cancel
                </Button>
                    <Button color="green"
                        click={this.onConfirm.bind(null, 'edit')}>
                        Save
                </Button>
                </Auxillary>
            )

        if (this.state.editMode === 'edit') {
            fields.forEach(e => {
                scope[e.name] = <input type={e.type}
                    placeholder={e.placeholder}
                    value={this.state.inputValue[e.name]}
                    onChange={this.editFieldHandler.bind(this, e.name)} />
            }
            )
        } else {
            scope.lastName = user.lastName
            scope.firstName = user.firstName
            scope.email = user.email
            scope.contactNo = user.contactNo
        }

        const modalBody = (this.props.localPopup && this.props.globalPopup) || this.props.deletedModal ?
            <Modal>
                <Confirmation
                    confirmation={this.state.confirmation}
                    error={this.props.putError}
                    proceed={this.onSendPostRequest.bind(null)}
                    feedback={this.state.feedback}
                    okClose={this.onCloseModalHandler.bind(null)}

                />
            </Modal>
            : null;

        const mainBody = this.props.loading ? <Spinner color="grey" /> : (
            <Auxillary>
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
                                <div className={styles.value}>{scope.lastName}</div>
                            </div>
                            <div>
                                <div className={styles.label}>First Name</div>
                                <div className={styles.value}>{scope.firstName}</div>
                            </div>
                            <div>
                                <div className={styles.label}>Email</div>
                                <div className={styles.value}>{scope.email}</div>
                            </div>
                            <div>
                                <div className={styles.label}>Contact No.</div>
                                <div className={styles.value}>{scope.contactNo}</div>
                            </div>
                            <hr className={styles.line} />
                            <div>
                                {button}
                            </div>
                        </div>
                    </div>
                </div>
            </Auxillary>
        )

        let mainBodyError = this.props.error ? <ErrorBody>{this.props.children}</ErrorBody> : mainBody;

        return (
            <div className={styles.userMain}>
                {modalBody}
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