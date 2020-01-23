import * as actionTypes from '../actions/actionTypes'

const initialState = {
    users: '',
    roles: '',
    pages: '',
    loading: false,
    error: false,
    putError: false
}

const removeSelf = (user) => {
    const userCopy = [...user]
    const removeId = userCopy.findIndex(el => el.id === +sessionStorage.getItem('id'))
    userCopy.splice(removeId, 1)
    return userCopy
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.FETCH_USERS_START:
            return { ...state, error: false, loading: true }
        case actionTypes.FETCH_USERS_SUCCESS:
            return { ...state, loading: false, users: removeSelf(action.payload.users), roles: action.payload.roles, pages: action.payload.pages }
        case actionTypes.FETCH_USERS_FAIL:
            return { ...state, error: true, loading: false }
        case actionTypes.EDIT_USER_ROLE_START:
            return { ...state, error: false, putError: false, loading: true }
        case actionTypes.EDIT_USER_ROLE_SUCCESS:
            const userCopy = [...state.users]
            const userId = userCopy.findIndex(el => el.id === action.payload.id)
            userCopy[userId] = action.payload

            return {
                ...state, loading: false,
                users: userCopy
            }
        case actionTypes.EDIT_USER_ROLE_FAIL:
            return { ...state, loading: false, putError: true }
        case actionTypes.SEARCH_USERS_START:
            return { ...state, loading: true, error: false, putError: false }
        case actionTypes.SEARCH_USERS_SUCCESS:
            return { ...state, loading: false, pages: action.payload.pages, users: removeSelf(action.payload.users) }
        case actionTypes.SEARCH_USERS_FAIL:
            return { ...state, loading: false, error: true }
        default: return state
    }

}

export default reducer