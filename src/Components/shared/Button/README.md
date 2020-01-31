# Buttons

## Importing

Place the import outside of the component class at the top of the file.

~~~~
import Button from '[FILEPATH]Button';
~~~~

Inside the render, instantiate the button component using the following:

~~~~
<Button>[BUTTON TEXT]</Button>
~~~~

## Props

Props can be passed to the button component.

~~~~
<Button
    type="Primary"
    isActive={() => {}}
>
    [BUTTON TEXT]
</Button>
~~~~

The following props can be used:

| PropName  | PropType          | Values        |
|-----------|:-----------------:|--------------:|
| type      | string            | `primary`<br>`secondary`<br>`cta`<br>`descructive`<br>`success` |
| isBlock   | bool              |               |
| isSmall   | bool              |               |
| isActive  | bool              |               |
| onClick   | func              | () => {}      |  
| children  | string<br>node    | [BUTTON TEXT] |
| className | string            | \``CLASSNAME ${CLASSNAME}`\` |

## Required Packages

In order for the button component to work. The following npm packages are required:

1. react
2. prop-types

If you dont have these installed, they can be using the following node command:

~~~
npm i react prop-types
~~~~

These should be imported outside of the react component at the top of the page.

~~~
import React from 'react';
import PropTypes from 'prop-types';
~~~