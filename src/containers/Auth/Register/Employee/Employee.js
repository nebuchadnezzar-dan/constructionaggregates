import React, { Component } from 'react';

import styles from './Employee.module.scss';

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../../../../store/actions/index'

import { ReactComponent as User } from '../../../../assets/svg/user.svg';
import { ReactComponent as Email } from '../../../../assets/svg/envelop.svg';
import { ReactComponent as User1 } from '../../../../assets/svg/user-tie.svg';
import { ReactComponent as Contact } from '../../../../assets/svg/phone.svg';
import { ReactComponent as Lock } from '../../../../assets/svg/lock.svg';

import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner'

class Employee extends Component {

    state = {
        default: true,
        returnCtr: 0,
        signIn: {
            email: '',
            password: ''
        },
        createAcc: {
            lastName: '',
            firstName: '',
            email: '',
            contactNo: '',
            password: ''
        }
    }

    changeView = () => {
        const value = this.state.default ? 0 : 1;
        this.setState({ default: !this.state.default, returnCtr: value });
    }

    editField = (from, e) => {
        this.setState({ [from.type]: { ...this.state[from.type], [from.from]: e.target.value } })
    }

    submitHandler = async (event) => {
        event.preventDefault();
        await this.props.login({ email: this.state.signIn.email, password: this.state.signIn.password })
        if (this.props.error) this.props.history.push({ pathname: '/dashboard' })
        // console.log(event);
        // this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup );
    }

    createSubmitHandler = (e) => {
        e.preventDefault()
        this.props.createAccDispatch({
            lastName: this.state.createAcc.lastName,
            firstName: this.state.createAcc.firstName,
            email: this.state.createAcc.email,
            contactNo: this.state.createAcc.contactNo,
            password: this.state.createAcc.password
        })
    }

    closeAuthMessHandler = () => {
        this.props.closeAuthMessDispatch()
    }

    render() {
        const retMessage = this.props.message ?
            (<div className={styles.returnMessage} >
                {this.props.message}
                <span onClick={this.closeAuthMessHandler}>X</span>
            </div>) : null
        const loginFeedback = this.props.message && this.props.error ? (
            <div className={styles.feedError}>
                {this.props.message}
                <span onClick={this.closeAuthMessHandler}>X</span>
            </div>
        ) : null
        const body = (
            <div className={styles.out}>
                <div className={styles.circle} />
                <div className={styles.triangle} />
                <div className={[styles.innerBody, this.state.default ? null : styles.leftPanelActive, this.state.returnCtr > 0 ? styles.leftPanelReturned : null].join(' ')}>
                    <div className={styles.innerCircle} />
                    <div className={styles.innerTriangle} />
                    <div className={styles.welcomeContainer}>
                        <div>
                            <div className={[styles.floater, styles.floaterdiamond].join(' ')} />
                            <div className={[styles.floater, styles.floaterdiamond2].join(' ')} />

                            <div className={[styles.floater, styles.floatertriangle2].join(' ')} />
                            <div className={[styles.floater, styles.floaterrectangle1].join(' ')} />
                            <div className={[styles.floater, styles.floatercircle].join(' ')} />
                        </div>
                        <div className={styles.welcome}>
                            <div className={[styles.welcomePanel, styles.welcomeLeft].join(' ')}>
                                <div className={styles.logo}>Logo</div>
                                <div className={styles.loginCenter}>
                                    <div>Welcome Back!</div>
                                    <div>Login to start and continue your work.</div>
                                    <div><Button register="regular" click={this.changeView}>SIGN IN</Button></div>
                                </div>
                            </div>
                            <div className={[styles.welcomePanel, styles.welcomeRight].join(' ')}>
                                <div className={styles.logo}>Logo</div>
                                <div className={styles.loginCenter}>
                                    <div>Hello Friend!</div>
                                    <div>Enter your personal details and start your journey with us</div>
                                    <div><Button register="regular" click={this.changeView}>SIGN UP</Button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={[styles.formContainer, styles.SignUpContainer].join(' ')}>
                        {retMessage}
                        <div className={styles.regTitle}>Create Account</div>
                        <div className={styles.buttonWrap}>
                            <Button register="icons">&#120307;</Button>
                            <Button register="icons">G+</Button>
                            <Button register="icons">in</Button>
                        </div>
                        <div className={styles.midText}>or use your email for registration</div>
                        <div className={styles.registerField}>
                            <form className={styles.form}
                                onSubmit={this.createSubmitHandler}>
                                <div className={styles.field}>
                                    <span><User /></span>
                                    <input type="text" placeholder="Last Name"
                                        value={this.state.createAcc.lastName}
                                        onChange={this.editField.bind(this, { type: 'createAcc', from: 'lastName' })} />
                                </div>
                                <div className={styles.field}>
                                    <span><User1 /></span>
                                    <input type="text" placeholder="First Name"
                                        value={this.state.createAcc.firstName}
                                        onChange={this.editField.bind(this, { type: 'createAcc', from: 'firstName' })} />
                                </div>
                                <div className={styles.field}>
                                    <span><Email /></span>
                                    <input type="email" placeholder="Email"
                                        value={this.state.createAcc.email}
                                        onChange={this.editField.bind(this, { type: 'createAcc', from: 'email' })} />
                                </div>
                                <div className={styles.field}>
                                    <span><Contact /></span>
                                    <input type="text" placeholder="Contact No."
                                        value={this.state.createAcc.contactNo}
                                        onChange={this.editField.bind(this, { type: 'createAcc', from: 'contactNo' })} />
                                </div>
                                <div className={styles.field}>
                                    <span><Lock /></span>
                                    <input type="password" placeholder="Password" value={this.state.createAcc.password}
                                        onChange={this.editField.bind(this, { type: 'createAcc', from: 'password' })} />
                                </div>
                                <div className={styles.submit}>
                                    <Button register="reg">Sign Up</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={[styles.formContainer, styles.SignInContainer].join(' ')}>
                        <div className={styles.regTitle}>Sign In</div>
                        <div className={styles.buttonWrap}>
                            <Button register="icons">&#120307;</Button>
                            <Button register="icons">G+</Button>
                            <Button register="icons">in</Button>
                        </div>
                        <div className={styles.midText}>or use your email account</div>
                        <div className={styles.registerField}>
                            <form className={styles.form}
                                onSubmit={this.submitHandler}>
                                <div className={styles.field}>
                                    <span><Email /></span>
                                    <input type="email" placeholder="Email"
                                        value={this.state.signIn.email}
                                        onChange={this.editField.bind(this, { type: 'signIn', from: 'email' })} />
                                </div>
                                <div className={styles.field}>
                                    <span><Lock /></span>
                                    <input type="password" placeholder="Password" value={this.state.signIn.password}
                                        onChange={this.editField.bind(this, { type: 'signIn', from: 'password' })} />
                                </div>
                                <div><Button register="simple">Forgot Your Password?</Button></div>
                                <div className={styles.submit}>
                                    <Button register="reg">Sign In</Button>
                                </div>
                            </form>
                            {loginFeedback}
                        </div>
                    </div>
                </div>
            </div>
        )
        return this.props.loading ? <Spinner color="grey" /> : body
    }

}

const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    message: state.auth.message
})

const mapDispatchToProps = dispatch => ({
    login: login => dispatch(actions.login(login)),
    createAccDispatch: values => dispatch(actions.createAccount(values)),
    closeAuthMessDispatch: () => dispatch(actions.closeAuthMessage())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Employee));