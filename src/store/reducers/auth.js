import * as actionTypes from '../actions/actionTypes'

const initialState = {
    loading: false,
    error: false,
    authenticated: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_START:
            return { ...state, loading: true }
        case actionTypes.LOGIN_SUCCESS:
            return { ...state, loading: false, authenticated: true }
        case actionTypes.LOGIN_FAIL:
            return { ...state, loading: false, error: true }
        default: return state
    }
}

export default reducer