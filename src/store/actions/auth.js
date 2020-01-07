import * as actionTypes from './actionTypes'
import { getHeader } from '../../util/headers'

import axios from '../../axios-orders'

export const loginStart = () => ({
    type: actionTypes.LOGIN_START
})

export const loginSuccess = () => ({
    type: actionTypes.LOGIN_SUCCESS
})

export const loginFail = () => ({
    type: actionTypes.LOGIN_FAIL
})

export const login = (loginData) => {
    return async dispatch => {
        try {
            dispatch(loginStart())
            const data = await axios.post('/auth/login', loginData)
            window.sessionStorage.setItem('token', 'Bearer ' + data.data.token)
            dispatch(loginSuccess())
        } catch (e) {
            dispatch(loginFail())
        }
    }
}

/**************************************************** */

export const logoutStart = () => ({
    type: actionTypes.LOGOUT_START
})

export const logoutSuccess = (data) => ({
    type: actionTypes.LOGOUT_SUCCESS
})

export const logoutFail = () => ({
    type: actionTypes.LOGOUT_FAIL
})

export const logout = () => {
    return async dispatch => {
        try {
            dispatch(logoutStart())
            const logoutData = await axios.post('/auth/logout', {}, getHeader())
            sessionStorage.clear()
            window.location.replace("/")
            dispatch(logoutSuccess(logoutData))
        } catch (e) {
            dispatch(logoutFail())
        }
    }
}

/******************************* */

export const authenticateCheck = () => ({
    type: actionTypes.AUTHENTICATE_CHECK
})


/********************************************* */

export const createAccountStart = () => ({
    type: actionTypes.CREATE_ACCOUNT_START
})

export const createAccountSuccess = (data) => ({
    type: actionTypes.CREATE_ACCOUNT_SUCCESS,
    payload: data
})

export const createAccountFail = () => ({
    type: actionTypes.CREATE_ACCOUNT_FAIL
})

export const createAccount = (accountValue) => {
    return async dispatch => {
        try {
            dispatch(createAccountStart())
            const data = await axios.post('/auth', accountValue)
            dispatch(createAccountSuccess(data.data))
        } catch (e) {
            dispatch(createAccountFail())
        }
    }
}