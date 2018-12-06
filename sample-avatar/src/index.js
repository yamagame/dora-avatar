import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import io from 'socket.io-client'

export const loadInitialData = (params, socketIO, callback) => async (dispatch, getState) => {
  dispatch({
    type: 'PARAMS',
    payload: {},
  });
  if (callback) callback();
}

export const doAction = (payload, callback) => async (dispatch, getState) => {
  dispatch({
    type: 'PARAMS',
    payload,
  });
  if (callback) callback();
}

const setValues = (state = {}, action) => {
  if (action.type === 'PARAMS') {
    return {
      ...state,
      ...action.payload,
    }
  }
  return state;
}

export const reducers = combineReducers({
  app: setValues,
})

const socket = io();

let store = createStore(reducers, applyMiddleware(thunk))

var params = {
  app: {
    status: 'idle',
  }
};

socket.on('action', (payload) => {
  store.dispatch(doAction(payload));
})

store.dispatch(loadInitialData(params, socket, () => {

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, document.getElementById('root'));

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
  serviceWorker.unregister();

}));
