import * as actionTypes from '../actions/actionTypes'

const initialState = {
    loading: false,
    errror: false,
    user: '',
    putError: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PROFILE_START:
            return { ...state, loading: true, error: false }
        case actionTypes.FETCH_PROFILE_SUCCESS:
            return { ...state, loading: false, user: action.payload }
        case actionTypes.FETCH_PROFILE_FAIL:
            return { ...state, loading: false, error: true }
        case actionTypes.EDIT_PROFILE_START:
            return { ...state, loading: true, putError: false }
        case actionTypes.EDIT_PROFILE_SUCCESS:
            return { ...state, loading: false, user: action.payload }
        case actionTypes.EDIT_PROFILE_FAIL:
            return { ...state, loading: false, putError: true }
        default: return state
    }
}

export default reducer