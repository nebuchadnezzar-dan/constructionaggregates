import * as actionTypes from './actionTypes';

export const toggleGlobalModal = (value) => ({
    type: actionTypes.TOGGLE_GLOBAL_MODAL,
    payload: value
});

export const toggleLocalPopupSettings = (value) => ({
    type: actionTypes.TOGGLE_LOCAL_POPUP_SETTINGS,
    payload: value
});