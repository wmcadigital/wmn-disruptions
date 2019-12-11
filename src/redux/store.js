// Import packages
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Import reducers
import appReducer from '../Components/Tray/When/reducer';
// eslint-disable-next-line import/no-duplicates
import timeReducer from '../Components/Tray/Mode/reducer';
// eslint-disable-next-line import/no-duplicates
import modeReducer from '../Components/Tray/Mode/reducer';
import searchReducer from '../Components/Tray/Search/reducer';
// import initialState from './initialState.json'

// let initialState = {};

const middlewares = [thunk];

const reducer = combineReducers({
  app: appReducer,
  time: timeReducer,
  mode: modeReducer,
  search: searchReducer
});

// const store = createStore(appReducer, initialState);

// console.log('initial store here:', store.getState());

/* eslint-disable no-underscore-dangle */
export default createStore(
  reducer,
  // initialState,
  compose(
    applyMiddleware(...middlewares),
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'undefined'
      ? a => a
      : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
