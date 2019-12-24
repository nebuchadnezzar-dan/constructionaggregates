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