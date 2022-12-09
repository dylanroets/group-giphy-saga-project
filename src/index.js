import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
//import Redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
//import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, apply } from 'redux-saga/effects';
//import axios
import axios from 'axios';

//create saga middleware
const sagaMiddleware = createSagaMiddleware();

//Watcher Function
function* rootSaga() {
  yield takeEvery('GET_GIPHY', getGifs);
  yield takeEvery('GET_FAVS', getFavs);
  yield takeEvery('FETCH_BY_CATEGORY', getByCategory)
}

//Generator Functions
function* getGifs(action) {
  console.log('in getGifs:', action);
  //This will route to external API, 'GIPHY'
  try {
    const response = yield axios.get('/api/giphy');
    yield put({ type: 'SEARCH_GIFS', payload: response });
  } catch (error) {
    alert(error);
  }
}

//favorites page search function
function* getByCategory(action) {
    console.log('getByCategory', action.payload.categoryID)
    try{
        const response = yield axios.get(`/api/favorite/${action.payload.categoryID}`);
        console.log('wow',response.data)
        yield put({ type: 'FAV_GIFS', payload: response.data });
    }catch (error) {
        alert(error);
    }
}

function* getFavs() {
  console.log('in GetFavs.');
  try {
    const response = yield axios.get('/api/favorite');
    yield put({ type: 'FAV_GIFS', payload: response });
  } catch (error) {
    alert(error);
  }
}

// Reducers
const searchReducer = (state = [], action) => {
  console.log('in searchGif Store. Action:', action);
  if (action.type === 'SEARCH_GIFS') {
    return action.payload;
  }
  return state;
};
const favoritesReducer = (state = [], action) => {
  console.log('in favoritesGif Store. Action:', action);
  //This will route to internal API, Database
  if (action.type === 'FAV_GIFS') {
    console.log("favoritesReducer!!!!", action.payload)
    return action.payload;
  }
  return state;
};

//Creating Store
const storeInstance = createStore(
  combineReducers({ searchReducer, favoritesReducer }),
  //Add sagaMiddleware to store
  applyMiddleware(sagaMiddleware, logger)
);

//Pass rootSaga into sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById('root')
);
