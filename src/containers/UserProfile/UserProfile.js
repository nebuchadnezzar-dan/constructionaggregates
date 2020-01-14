import React, { Component } from 'react'

import { connect } from 'react-redux'
import { storeRoute } from '../../util/storeRoute'

import * as actions from '../../store/actions/index'

import styles from './UserProfile.module.scss'

import Head from '../../components/UI/Head/Head'
import HeadChild from '../../components/UI/HeadChild/HeadChild'
import Button from '../../components/UI/Button/Button'


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
        editMode: false,
        inputValue: {
            lastName: '',
            firstName: '',
            email: '',
            contactNo: ''
        }
    }

    componentDidMount() {
        storeRoute(this.props.location.pathname)
        const route = this.props.location.pathname.match(/[a-zA-z]+/g)
        this.props.activeRouteDispatch(route)
    }

    editFieldHandler = (name, e) => {
        this.setState({ inputValue: { ...this.state.inputValue, [name]: e.target.value } })
    }

    toggleEditHandler = () => {
        this.setState({
            editMode: !this.state.editMode, inputValue: {
                ...this.state.inputValue, lastName: 'Daniel', firstName: 'Banasen', email: 'email ko to', contactNo: 'contact number ko to'
            }
        })
    }

    render() {

        const scope = {
            lastName: 'Daniel',
            firstName: 'Banasen',
            email: 'email ko to',
            contactNo: 'contact number ko to'
        }

        // let lastName, firstName, email, contactNo
        // let lastName = 'Daniel'
        // let firstName = 'Banasen'
        // let email = 'email ko to'
        // let contactNo = 'contac number ko to'

        if (this.state.editMode) {
            fields.forEach(e => {
                scope[e.name] = <input type={e.type}
                    placeholder={e.placeholder}
                    value={this.state.inputValue[e.name]}
                    onChange={this.editFieldHandler.bind(this, e.name)} />
                // console.log(eval(e.name))
            }
            )
            // lastName = <input type="text" placeholder="Last Name" value={this.state.inputValue.lastName} />
            // firstName = <input type="text" placeholder="First Name" value={this.state.inputValue.firstName} />
            // email = <input type="email" placeholder="Email" value={this.state.inputValue.email} />
            // contactNo = <input type="text" placeholder="Contact Number" value={this.state.inputValue.contactNo} />
        } else {
            scope.lastName = 'Daniel'
            scope.firstName = 'Banasen'
            scope.email = 'email ko to'
            scope.contactNo = 'contact number ko to'
        }

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
                                <Button color="blue" click={this.toggleEditHandler}>Edit</Button>
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