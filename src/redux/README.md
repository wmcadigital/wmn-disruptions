# Redux

## Required Packages

In order for redux to work. The following npm packages are required:

1. redux

If you dont have this installed, they can be using the following node command:

~~~~
npm i redux
~~~~

It should be imported at the top of the page with the following required methods at the top of `store.js`.

1. creatStore
2. compose
3. combineReducers

~~~~
import {
    createStore,
    compose,
    combineReducers,
} from 'redux';
~~~~

## Store

The `store` holds the entire applications `state` in one place. This is located in `store.js`. It requires an `initial state`, our `combined reducers` and the `compose` method.

~~~~
let initialState = {};

export default createStore(
    reducer,
    initialState,
    compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);
~~~~

## Importing reducers

`Reducers` should be imported from their respective components in order to be combined.

~~~~
import timeReducer from '../components/Tray/components/When/reducer';
~~~~

## Combining reducers

Because our store will only take one data object, we combine all our various `reducers` using `combineReducer`.

~~~~
const reducer = combineReducers({
    time: timeReducer,
    mode: modeReducer,
    search: searchReducer,
})
~~~~

### List of current reducers

1. timeReducer
2. modeReducer
3. searchReducer

### Importing reducers into components

In order to import `reducers` and their `states` as `props` into a component, you can use `connect`, `mapStateToProps` and `mapDispatchToProps`.