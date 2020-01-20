import * as actionTypes from './actionTypes'

import axios from '../../axios-orders'

import { getHeader } from '../../util/headers'


/*********************FETCH USERS****** */

const fetchUsersStart = () => ({
    type: actionTypes.FETCH_USERS_START
})

const fetchUserSuccess = (users, roles, pages) => ({
    type: actionTypes.FETCH_USERS_SUCCESS,
    payload: { users, roles, pages }
})

const fetchUserFail = () => ({
    type: actionTypes.FETCH_USERS_FAIL
})

export const fetchUser = (page) => {
    return async dispatch => {
        try {
            dispatch(fetchUsersStart())
            const data = await axios.get(`users/admin?page=${page}`, getHeader())
            dispatch(fetchUserSuccess(data.data.users, data.data.roles, data.data.pages))
        } catch (e) {
            dispatch(fetchUserFail())
        }
    }
}

/************************************** */