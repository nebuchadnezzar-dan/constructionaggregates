import * as actionTypes from '../actions/actionTypes';

const initialState = {
  trucks: [{ id: '', maxLoad: '', plateNo: '', status: 'maintenance' }],
  availableTrucks: [
    { maxLoad: '2', plateNo: 'abc', status: 'maintenance' },
    { maxLoad: '3', plateNo: 'def', status: 'maintenance' },
    { maxLoad: '1', plateNo: 'gfh', status: 'maintenance' },
    { maxLoad: '1', plateNo: 'higi', status: 'maintenance' },
    { maxLoad: '1', plateNo: 'yu7h', status: 'maintenance' }
  ],
  loading: false,
  error: false
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
    case actionTypes.EDIT_TRUCK_SETTINGS:
      const copyTrucksFromState = [...state.availableTrucks];
      copyTrucksFromState[action.payload.index] = action.payload.value;
      return {
        ...state,
        availableTrucks: copyTrucksFromState
      };
    case actionTypes.DELETE_TRUCK_SETTINGS:
      return {
        ...state,
        availableTrucks: state.availableTrucks.filter(
          (_, i) => i !== action.payload
        )
      };
    case actionTypes.FETCH_TRUCK_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_TRUCK_SUCCESS:
      return {
        ...state,
        error: false,
        availableTrucks: action.payload,
        loading: false
      }
    case actionTypes.FETCH_TRUCK_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      return state;
  }
};

export default reducer;
