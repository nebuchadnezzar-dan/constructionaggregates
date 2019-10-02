import * as actionTypes from '../actions/actionTypes';
import { newDate } from '../../util/dateHelper';

const initialState = {
  customer: [
    {
      lastName: 'Collins',
      firstName: 'Phil',
      contactNo: 9473827382,
      partialPaid: 0,
      dateRegistered: '2019-06-26',
      timesPurchased: 15
    },
    {
      lastName: 'Banasen',
      firstName: 'Daniel',
      partialPaid: 0,
      contactNo: 9273917382,
      dateRegistered: '2019-06-26',
      timesPurchased: 5
    },
    {
      lastName: 'Loaf',
      firstName: 'Meat',
      contactNo: 9612374817,
      partialPaid: 0,
      dateRegistered: '2019-06-26',
      timesPurchased: 3
    },
    {
      lastName: 'Orange',
      firstName: 'Lemons',
      contactNo: 9351728367,
      partialPaid: 0,
      dateRegistered: '2019-06-26',
      timesPurchased: 3
    },
    {
      lastName: 'Turner',
      firstName: 'Tina',
      contactNo: 9928616273,
      partialPaid: 0,
      dateRegistered: '2019-06-26',
      timesPurchased: 8
    },
    {
      lastName: 'Higson',
      firstName: 'Charlie',
      contactNo: 9162838492,
      partialPaid: 0,
      dateRegistered: '2017-04-01',
      timesPurchased: 10
    }
  ],
  credit: [
    {
      customer: 'Loaf',
      truck: {
        maxLoad: '3',
        plateNo: 'def',
        status: 'maintenance',
        color: '#437cb6',
        index: 1
      },
      items: [
        {
          materials: 'gravel',
          amount: '50',
          price: '2100',
          quantity: 1
        },
        {
          materials: 'river Mixed',
          amount: '60',
          price: '2100',
          quantity: 1
        }
      ],
      address: 'Baguio',
      date: '2019-06-30'
    },
    {
      customer: 'Banasen',
      truck: {
        maxLoad: '2',
        plateNo: 'abc',
        status: 'maintenance',
        color: '#47799f',
        index: 0
      },
      items: [
        {
          materials: 'cement',
          amount: '150',
          price: '150',
          quantity: '50'
        },
        {
          materials: 'gravel',
          amount: '50',
          price: '2100',
          quantity: 1
        }
      ],
      address: 'Baguio City',
      date: '2019-06-30'
    },
    {
      customer: 'Loaf',
      truck: {
        maxLoad: '3',
        plateNo: 'def',
        status: 'maintenance',
        color: '#437cb6',
        index: 1
      },
      items: [
        {
          materials: 'gravel',
          amount: '50',
          price: '2100',
          quantity: 2
        },
        {
          materials: 'river Mixed',
          amount: '60',
          price: '2100',
          quantity: 3
        }
      ],
      address: 'Baguio',
      date: '2019-06-29'
    }
  ],
  fetchLoading: false,
  fetchError: false,
  postLoading: false,
  postError: false
};

const reducer = (state = initialState, action) => {
  let customerCopy;
  switch (action.type) {
    case actionTypes.ADD_CUSTOMER:
      return {
        ...state,
        customer: state.customer.concat({
          ...action.payload,
          credit: 0,
          partialPaid: 0,
          dateRegistered: newDate(),
          timesPurchased: 0
        })
      };
    case actionTypes.ADD_CREDIT:
      customerCopy = [...state.customer];
      const customId = customerCopy.findIndex(
        customer => customer.lastName === action.payload.customer
      );
      customerCopy[customId].credit =
        +customerCopy[customId].credit + action.credit;
      return {
        ...state,
        customer: customerCopy,
        credit: state.credit.concat({ ...action.payload, date: newDate() })
      };
    case actionTypes.FETCH_CUSTOMER_START:
      return {
        ...state,
        fetchError: false,
        fetchLoading: true
      }
    case actionTypes.FETCH_CUSTOMER_SUCCESS:
      return {
        ...state,
        customer: action.data,
        pages: action.pages,
        fetchError: false,
        fetchLoading: false
      }
    case actionTypes.FETCH_CUSTOMER_FAIL:
      return {
        ...state,
        postError: true,
        postLoading: false
      }
    case actionTypes.POST_CUSTOMER_START:
      return {
        ...state,
        postError: false,
        postLoading: true,
      }
    case actionTypes.POST_CUSTOMER_SUCCESS:
      return {
        ...state,
        postError: false,
        postLoading: false,
        customer: state.customer.concat(action.payload)
      }
    case actionTypes.POST_CUSTOMER_FAIL:
      return {
        ...state,
        postError: true,
        postLoading: false
      }
    default:
      return state;
  }
};

export default reducer;
