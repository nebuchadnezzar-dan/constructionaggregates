import * as actionTypes from './actionTypes'
import { getHeader } from '../../util/headers'
import axios from '../../axios-orders'


/*******************FETCH PROFILE*************** */

export const fetchProfileStart = () => ({
    type: actionTypes.FETCH_PROFILE_START
})

export const fetchProfileSuccess = (data) => ({
    type: actionTypes.FETCH_PROFILE_SUCCESS,
    payload: data
})

export const fetchProfileFail = () => ({
    type: actionTypes.FETCH_PROFILE_FAIL
})

export const fetchProfile = (id) => {
    return async dispatch => {
        try {
            dispatch(fetchProfileStart())
            const data = await axios.get(`/user/${id}`, getHeader())
            dispatch(fetchProfileSuccess(data.data))
        } catch (e) {
            dispatch(fetchProfileFail())
        }
    }
}

/************************************************ */

/***********************EDIT PROFILE************ */

export const editProfileStart = () => ({
    type: actionTypes.EDIT_PROFILE_START
})

export const editProfileSuccess = (data) => ({
    type: actionTypes.EDIT_PROFILE_SUCCESS,
    payload: data
})

export const editProfileFail = () => ({
    type: actionTypes.EDIT_PROFILE_FAIL
})

export const editProfile = (body) => {
    return async dispatch => {
        try {
            dispatch(editProfileStart())
            const data = await axios.put('/user', body, getHeader())
            dispatch(editProfileSuccess(data.data))
        } catch (e) {
            dispatch(editProfileFail())
        }
    }
}

/********************************************** */