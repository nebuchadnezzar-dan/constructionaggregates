import * as actionTypes from '../actions/actionTypes';

const initialState = {
    showGlobalModal: false,
    localModalTruckSettingsForm: false,
    localModalTruckSettingsTable: false,
    localModalSupplySettingsForm: false,
    localModalSupplySettingsEdi: false
};

const defaultState = {
    localModalTruckSettingsForm: false,
    localModalTruckSettingsTable: false,
    localModalSupplySettingsForm: false,
    localModalSupplySettingsEdi: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_GLOBAL_MODAL:
            return {
                ...state,
                showGlobalModal: false,
                ...defaultState

            }
        case actionTypes.TOGGLE_LOCAL_POPUP_SETTINGS:
            return {
                ...state,
                ...defaultState,
                [action.payload.from]: action.payload.value,
                showGlobalModal: action.payload.global
            }
        default: return state;
    }
};

export default reducer;