import * as actionTypes from '../actions/actionTypes';

const newDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today
    .getMonth()
    .toString()
    .padStart(2, '0');
  const day = today
    .getDate()
    .toString()
    .padStart(2, '2');
  return `${year}-${month}-${day}`;
};

const initialState = {
  customer: [
    {
      lastName: 'Collins',
      firstName: 'Phil',
      credit: 5000,
      dateRegistered: '2019-06-26',
      timesPurchased: 15
    },
    {
      lastName: 'Banasen',
      firstName: 'Daniel',
      credit: 2000,
      dateRegistered: '2019-06-26',
      timesPurchased: 5
    },
    {
      lastName: 'Loaf',
      firstName: 'Meat',
      credit: 0,
      dateRegistered: '2019-06-26',
      timesPurchased: 3
    },
    {
      lastName: 'Orange',
      firstName: 'Lemons',
      credit: 0,
      dateRegistered: '2019-06-26',
      timesPurchased: 3
    },
    {
      lastName: 'Turner',
      firstName: 'Tina',
      credit: 1200,
      dateRegistered: '2019-06-26',
      timesPurchased: 8
    },
    {
      lastName: 'Higson',
      firstName: 'Charlie',
      credit: 4000,
      dateRegistered: '2017-04-01',
      timesPurchased: 10
    }
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CUSTOMER:
      return {
        ...state,
        customer: state.customer.concat({
          ...action.payload,
          credit: 0,
          dateRegistered: newDate(),
          timesPurchased: 0
        })
      };
    default:
      return state;
  }
};

export default reducer;
