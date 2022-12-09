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


const starterFavorites = [
  {id: '1',category_id:'1',url: 'https://images.unsplash.com/photo-1670431756517-385ffd9758a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60', desciption:'Some stuff'},
  {id: '2',category_id:'1',url: 'https://images.unsplash.com/photo-1662581871665-f299ba8ace07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60', desciption:'Some stuff'},
  {id: '3',category_id:'1',url: 'https://images.unsplash.com/photo-1670521525361-ac4aec66b2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60', desciption:'Some stuff'}
]

//create saga middleware
const sagaMiddleware = createSagaMiddleware();

//Watcher Function
function* rootSaga() {
  yield takeEvery('GET_SEARCH', searchGifs);
  yield takeEvery('GET_FAVS', getFavs);
  yield takeEvery('FETCH_BY_CATEGORY', getByCategory)
  yield takeEvery('DELETE_FAVORITE', deleteFavorite);
}

//Generator Functions
function* searchGifs(action) {
  console.log('in searchGifs:', action);
  try {
    const searchResults = yield axios.get(`/api/search/${action.payload}`);
    console.log('action.payload: ', action.payload);
    yield put({ type: 'SET_SEARCH_GIFS', payload: searchResults.data });
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

function* deleteFavorite(action){
  console.log('in deleteFavorite w/', action.payload.id, '&', action.payload.category_id);
  const id = action.payload.id;
  const category_id = action.payload.category_id
  try{ 
    yield axios.delete('/api/favorite/'+ id);
    yield put({type:'FETCH_BY_CATEGORY', payload: {categoryID: category_id}})
  } catch (err){
    console.log(err);
  }
}

// Reducers
const searchReducer = (state = [], action) => {
  console.log('in searchGif Store. Action:', action);
  if (action.type === 'SET_SEARCH_GIFS') {
    return action.payload.data;
  }
  return state;
};

const favoritesReducer = (state = starterFavorites, action) => {
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
