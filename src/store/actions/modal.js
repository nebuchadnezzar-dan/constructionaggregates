import * as actionTypes from './actionTypes';

export const toggleGlobalModal = (value) => ({
    type: actionTypes.TOGGLE_GLOBAL_MODAL,
    payload: value
});