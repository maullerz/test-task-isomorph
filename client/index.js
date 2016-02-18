import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import routes from '../shared/routes';
import immutifyState from '../shared/lib/immutifyState';
import promiseMiddleware from '../shared/lib/promiseMiddleware';
import reducer from 'reducers/NewsReducer';


// const initialState = immutifyState(window.INITIAL_STATE);
const initialState = window.INITIAL_STATE;
const history = createBrowserHistory();
const store = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <Router children={routes} history={history}>
    </Router>
  </Provider>,
  document.getElementById('react-view')
);
