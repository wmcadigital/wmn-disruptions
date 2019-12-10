import React, { Component, Fragment } from 'react';
import Autosuggest from 'react-autosuggest';
import './AutoComplete.scss';

// Imagine you have a list of buses that you'd like to autosuggest.
// When we have live API data, then this buses array will be removed
const buses = [
  {
    name: 'Sutton Coldfield to Erdington'
  },
  {
    name: 'Erdington to Sutton Coldfield'
  },
  {
    name: 'New Street Station to Sutton Coldfield'
  },
  {
    name: 'Sutton Coldfield to New Street Station'
  },
  {
    name: 'Longbridge To Sutton Coldfield '
  },
  {
    name: 'Sutton Coldfield To Longbridge '
  },
   {
     name: 'Sutton Coldfield to New Street Station'

  },
   {
     name: 'New Station Street to Sutton Coldfield'
  },
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : buses.filter(buses =>
    buses.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

class AutoComplete extends Component {
     constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search for a service or stop',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    //Will hook up the go btn soon.
    return (
      <Fragment>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />


        <button className="wmnds-btn">Go</button>
      </Fragment>
    );
  }
}

export default AutoComplete;
