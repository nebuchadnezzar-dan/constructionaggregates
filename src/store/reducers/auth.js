import * as actionTypes from '../actions/actionTypes'

const initialState = {
    loading: false,
    error: false,
    authenticated: false,
    message: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_START:
            return { ...state, loading: true }
        case actionTypes.LOGIN_SUCCESS:
            return { ...state, loading: false, authenticated: true }
        case actionTypes.LOGIN_FAIL:
            return { ...state, loading: false, error: true }
        case actionTypes.LOGOUT_START:
            return { ...state, loading: true }
        case actionTypes.LOGOUT_SUCCESS:
            return { ...state, loading: false, authenticated: false }
        case actionTypes.LOGOUT_FAIL:
            return { ...state, loading: false, error: true }
        case actionTypes.AUTHENTICATE_CHECK:
            return { ...state, authenticated: true }
        case actionTypes.CREATE_ACCOUNT_START:
            return { ...state, loading: true }
        case actionTypes.CREATE_ACCOUNT_SUCCESS:
            return { ...state, loading: false, message: action.payload }
        case actionTypes.CREATE_ACCOUNT_FAIL:
            return { ...state, loading: false, error: true }
        default: return state
    }
}

export default reducer