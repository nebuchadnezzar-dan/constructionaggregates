import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { BrowserRouter } from 'react-router-dom';

import truckSettings from './store/reducers/truckSettings';
import supplySettings from './store/reducers/supplySettings';
import route from './store/reducers/route';
import invoicePOS from './store/reducers/invoicePOS';
import customer from './store/reducers/customer';
import modal from './store/reducers/modal';
import invoice from './store/reducers/invoice';
import auth from './store/reducers/auth'

import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const basicDevtools =
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const rootReducers = combineReducers({
  truckSettings: truckSettings,
  supplySettings: supplySettings,
  route: route,
  invoicePOS: invoicePOS,
  customer: customer,
  modal: modal,
  invoice: invoice,
  auth: auth
});

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

// const store = createStore(rootReducers, basicDevtools);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
