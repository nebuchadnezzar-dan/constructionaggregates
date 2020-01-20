import * as actionTypes from '../actions/actionTypes'

const initialState = {
    users: '',
    roles: '',
    pages: '',
    loading: false,
    erro: false
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.FETCH_USERS_START:
            return { ...state, error: false, loading: true }
        case actionTypes.FETCH_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload.users, roles: action.payload.roles, pages: action.payload.pages }
        case actionTypes.FETCH_USERS_FAIL:
            return { ...state, error: true, loading: false }
        default: return state
    }

}

export default reducer