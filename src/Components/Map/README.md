## Map

### Importing

Place the import outside of the component class at the top of the file.

~~~~
import Map from '[FILEPATH]Map.js';
~~~~

Inside the render, instantiate the map component using the following:

~~~~
<Map />
~~~~

## Required Packages

In order for the map component to work. The following npm packages are required:

1. react
2. @esri/react-arcgis

If you dont have these installed, they can be using the following node command:

~~~
npm i react prop-types @esri/react-arcgis
~~~

These should be imported outside of the react component at the top of the page.

~~~
import React from 'react';
import { Map as MapView } from '@esri/react-arcgis';
~~~