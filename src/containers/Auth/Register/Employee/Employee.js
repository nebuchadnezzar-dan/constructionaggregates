import React, { Component } from 'react';

import styles from './Employee.module.scss';

import { ReactComponent as User } from '../../../../assets/svg/user.svg';
import { ReactComponent as Email } from '../../../../assets/svg/envelop.svg';
import { ReactComponent as User1 } from '../../../../assets/svg/user-tie.svg';
import { ReactComponent as Contact } from '../../../../assets/svg/phone.svg';
import { ReactComponent as Lock } from '../../../../assets/svg/lock.svg';

import Button from '../../../../components/UI/Button/Button';

class Employee extends Component {

    state = {
        default: true,
        returnCtr: 0
    }

    changeView = () => {
        const value = this.state.default ? 0 : 1;
        this.setState({ default: !this.state.default, returnCtr: value });
    }

    submitHandler = (event) => {
        event.preventDefault();
        console.log(event);
        // this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup );
    }

    render() {
        return (
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
                        <div className={styles.regTitle}>Create Account</div>
                        <div className={styles.buttonWrap}>
                            <Button register="icons">&#120307;</Button>
                            <Button register="icons">G+</Button>
                            <Button register="icons">in</Button>
                        </div>
                        <div className={styles.midText}>or use your email for registration</div>
                        <div className={styles.registerField}>
                            <form className={styles.form}
                                onSubmit={this.submitHandler}>
                                <div className={styles.field}>
                                    <span><User /></span>
                                    <input type="text" placeholder="Last Name" />
                                </div>
                                <div className={styles.field}>
                                    <span><User1 /></span>
                                    <input type="text" placeholder="First Name" />
                                </div>
                                <div className={styles.field}>
                                    <span><Email /></span>
                                    <input type="email" placeholder="Email" />
                                </div>
                                <div className={styles.field}>
                                    <span><Contact /></span>
                                    <input type="text" placeholder="Contact No." />
                                </div>
                                <div className={styles.field}>
                                    <span><Lock /></span>
                                    <input type="password" placeholder="Password" />
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
                                    <input type="email" placeholder="Email" />
                                </div>
                                <div className={styles.field}>
                                    <span><Lock /></span>
                                    <input type="password" placeholder="Password" />
                                </div>
                                <div><Button register="simple">Forgot Your Password?</Button></div>
                                <div className={styles.submit}>
                                    <Button register="reg">Sign In</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Employee;