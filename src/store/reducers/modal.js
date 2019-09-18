import * as actionTypes from '../actions/actionTypes';

const initialState = {
    showGlobalModal: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_GLOBAL_MODAL:
            return {
                ...state,
                showGlobalModal: action.payload
            }
        default: return state;
    }
};

export default reducer;