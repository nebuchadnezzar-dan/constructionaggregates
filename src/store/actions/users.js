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

/*******************EDIT USER ROLE************ */

const editUserRoleStart = () => ({
    type: actionTypes.EDIT_USER_ROLE_START
})

const editUserRoleSuccess = (user) => ({
    type: actionTypes.EDIT_USER_ROLE_SUCCESS,
    payload: user
})

const editUserRoleFail = () => ({
    type: actionTypes.EDIT_USER_ROLE_FAIL
})

export const editUserRole = (id, role) => {
    return async dispatch => {
        try {
            dispatch(editUserRoleStart())
            const data = await axios.put('/users/admin/edit', ({ id, role }), getHeader())
            dispatch(editUserRoleSuccess(data.data))
        } catch (e) {
            dispatch(editUserRoleFail())
        }
    }
}

/********************************************* */

/*********************SEARCH USERS*************** */

const searchUserStart = () => ({
    type: actionTypes.SEARCH_USERS_START
})

const searchUserSuccess = (users, pages) => ({
    type: actionTypes.SEARCH_USERS_SUCCESS,
    payload: { users, pages }
})

const searchUsersFail = () => ({
    type: actionTypes.SEARCH_USERS_FAIL
})

export const searchUsers = (keyword, page) => {
    return async dispatch => {
        try {
            dispatch(searchUserStart())
            const data = await axios.get(`/users/admin/search?keyword=${keyword}&page=${page}`, getHeader())
            dispatch(searchUserSuccess(data.data.users, data.data.pages))
        } catch (e) {
            dispatch(searchUsersFail())
        }
    }
}

/************************************************ */