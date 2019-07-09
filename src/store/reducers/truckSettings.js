import * as actionTypes from '../actions/actionTypes';

const initialState = {
  trucks: [{ maxLoad: '', plateNo: '', status: 'maintenance' }],
  availableTrucks: [],
  view: 'form'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TRUCK:
      return {
        ...state,
        // trucks: [
        //   ...state.trucks,
        //   { maxLoad: '', plateNo: '', status: 'maintenance' }
        // ],
        trucks: state.trucks.concat({
          maxLoad: '',
          plateNo: '',
          status: 'maintenance'
        })
      };
    case actionTypes.REMOVE_TRUCK:
      return {
        ...state,
        trucks: state.trucks.filter((_, i) => i !== action.payload)
      };
    case actionTypes.VALUE_CHANGE_TRUCK:
      const copiedTrucks = [...state.trucks];
      copiedTrucks[action.payload.index] = {
        ...copiedTrucks[action.payload.index],
        [action.payload.name]: action.payload.value
      };
      return {
        ...state,
        trucks: copiedTrucks
      };
    case actionTypes.SAVE_TRUCK:
      return {
        ...state,
        availableTrucks: state.availableTrucks.concat(state.trucks),
        trucks: initialState.trucks
      };
    case actionTypes.TOGGLE_VIEW_TRUCK:
      return {
        ...state,
        view: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
