import * as actionTypes from './actionTypes'

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

export const logoutStart = () => ({
    type: actionTypes.LOGOUT_START
})

export const logoutSuccess = () => ({
    type: actionTypes.LOGOUT_SUCCESS
})

export const logoutFail = () => ({
    type: actionTypes.LOGOUT_FAIL
})

export const logout = () => {
    return async dispatch => {
        try {
            dispatch(logoutStart())
            const logoutData = await axios.post('/auth/logout', {}, {
                headers: {
                    Authorization: sessionStorage.getItem('token')
                }
            })
            dispatch(logoutSuccess())
            sessionStorage.clear()
        } catch (e) {
            dispatch(logoutFail())
        }
    }
}