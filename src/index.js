import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
//import Redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
//import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
//import axios
import axios from 'axios';

//create saga middleware
const sagaMiddleware = createSagaMiddleware();

//Watcher Function
function* rootSaga() {
  yield takeEvery('GET_GIPHY', getGifs);
  yield takeEvery('GET_FAVS', getFavs);
}

//Generator Function
function getGifs(action) {
  console.log('in getGifs:', action);
}

ReactDOM.render(<App />, document.getElementById('root'));
