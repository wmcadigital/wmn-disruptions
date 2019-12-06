# Search Result

## Importing

Place the import outside of the component class at the top of the file.

~~~~
import SearchResult from '[FILEPATH]SearchResult';
~~~~

Inside the `render`, instantiate the mode component using the following:

~~~~
<SearchResult />
~~~~

## Required Packages

In order for the search result component to work. The following `npm packages` are required:

1. React
2. prop-types

If you dont have these installed, they can be using the following node command:

~~~
npm i react prop-types
~~~~

These should be imported `outside of the react component` at the top of the page.

~~~
import React from 'react';
import PropTypes from 'prop-types';
~~~