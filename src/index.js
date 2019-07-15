import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { BrowserRouter } from 'react-router-dom';

import truckSettings from './store/reducers/truckSettings';
import supplySettings from './store/reducers/supplySettings';
import route from './store/reducers/route';

import * as serviceWorker from './serviceWorker';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const basicDevtools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const rootReducers = combineReducers({
  truckSettings: truckSettings,
  supplySettings: supplySettings,
  route: route
});

// const store = createStore(
//   rootReducers,
//   composeEnhancers(applyMiddleware(thunk))
// );

const store = createStore(rootReducers, basicDevtools);

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
