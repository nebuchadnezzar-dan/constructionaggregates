import React, { Component } from 'react';

import styles from './Employee.module.scss';

import Button from '../../../../components/UI/Button/Button';

class Employee extends Component {


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
                <div className={styles.innerBody}>
                    <div className={styles.login}>
                        <div className={styles.logo}>Logo</div>
                        <div className={styles.loginCenter}>
                            <div>Welcome Back!</div>
                            <div>Login to start and continue your work.</div>
                            <div><Button register="regular">SIGN IN</Button></div>
                        </div>
                    </div>
                    <div className={styles.register}>
                        <div>
                            <div>Create An Account</div>
                            <div className={styles.buttonWrap}>
                                <Button register="icons">&#120307;</Button>
                                <Button register="icons">G+</Button>
                                <Button register="icons">in</Button>
                            </div>
                            <div className={styles.registerField}>
                                <form className={styles.form}
                                    onSubmit={this.submitHandler}>
                                    <input type="text" placeholder="Last Name" />
                                    <input type="text" placeholder="First Name" />
                                    <input type="email" placeholder="Email" />
                                    <input type="text" placeholder="Contact No." />
                                    <input type="text" placeholder="Birthdate" />
                                    <input type="text" placeholder="Gener" />
                                    <input type="password" placeholder="Password" />
                                    <Button>Register</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Employee;