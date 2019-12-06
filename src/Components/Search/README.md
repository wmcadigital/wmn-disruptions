# Mode

## Search

Place the import outside of the component class at the top of the file.

~~~~
import Search from '[FILEPATH]Search';
~~~~

Inside the render, instantiate the search component using the following:

~~~~
<Search />
~~~~

## Required Packages

In order for the search to work. The following npm packages are required:

1. React
2. prop-types
3. react-redux

If you dont have these installed, they can be using the following node command:

~~~
npm i react prop-types react-redux
~~~~

These should be imported outside of the react component at the top of the page.

~~~
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
~~~

## Data

All copy for the search component is stored in 'data.js'.

## Redux

### Importing redux into the component

`react-redux` is required in order for the redux to work, and the `connect` function must be passed. These should be imported at the top of the page, outside the scope of the react component class.

~~~
import { connect } from 'react-redux';
~~~

### Setting up & updating the reducer

The entire `state` for the component is stored in the `reducer` which can be found inside `reducer.js`. This is stored as part of an `object tree` which points to a single `store`.

The `reducer` is passed two properties:

1. It's initial state
2. An action

It then uses a switch statement based on that action to update the state accordingly. To update a `new state`, simply add it into the returned `object` in the correct `case`.

~~~~
export default function search(state = {}, action) {
    switch(action.type) {
        case a.SEARCH:
            return {
                ...state,
            };
        default:
            return state;
    }
}
~~~~

### Setting up & updating the actions

`Action names` are stored as `string constants` inside the `action.js` to avoid any spelling or grammatical inconsistencies. These should be stored at the top of the page before any actions.

~~~~
export const SEARCH = 'search';
~~~~

All `actions` are stored in `actions.js`. Actions are payloads of information that send data from the application to the store. They are the only source of information for the store.

To create an action, you must pass it the data object, as well as returning an object that states the action type and payload.

~~~~
export function Search(data) {
    return { type: SEARCH, payload: data }
}
~~~~

### Handling props

The search component uses the following states from the store:

1. search

These states can be injected into the search component using `mapStateToProps` and `mapDispatchToProps`.

#### mapStateToProps

the `mapStateToProps` is used for selecting the part of the data from the store that the connected component needs. To add more states, simply update the data object. A fallback option should be included to avoid breaking the component.

`mapStateToProps` should be defined as a function.

~~~~
const mapStateToProps = state => ({
    search: state.search || {},
})
~~~~

#### mapDispatchToProps

`mapDispatchToProps` is used for dispatching actions to the store. To add more actions, simply update the data object.

`mapDispatchToProps` should be defined as a function.

~~~~
const mapDispatchToProps = dispatch => {
    const { Search } = a || {};
    return {
        Search: data => dispatch(Search())
    }
}
~~~~

### Connect

With `React Redux`, your components never access the store directly - `connect` does it for you.

`connect` should be defined as a function as your `default export` at the end of the file. You should pass `mapStateToProps` and `mapDispatchToProps` to `connect`.

~~~~
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Search);
~~~~