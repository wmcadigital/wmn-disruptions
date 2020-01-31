# Header

## Importing

Place the import outside of the component class at the top of the file.

~~~~
import Header from '[FILEPATH]Header.js';
~~~~

Inside the render, instantiate the header component using the following:

~~~~
<Header />
~~~~

## Required Packages

In order for the header component to work. The following npm packages are required:

1. react

If you dont have these installed, they can be using the following node command:

~~~
npm i react
~~~~

These should be imported outside of the react component at the top of the page.

~~~
import React from 'react';
~~~

## Data

All copy for the header component is stored in 'data.js'.