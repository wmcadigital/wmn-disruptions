// Import packages
import React from 'react';
import { connect } from 'react-redux';

// Import components
import SearchResult from './components/SearchResult/SearchResult';

// Import styles
import s from './ListView.module.scss';

class ListView extends React.Component {
    render() {
        const { props } = this;
        const { searchResults } = props || {};
        let results = [];
        let filteredResults = [];

        // Filter out results that don't have a disruption
        for (let i = 0; i < searchResults.length; i += 1) {
            if (searchResults[i].disruption) {
                filteredResults.push(searchResults[i]);
            }
        }

        // return results or fallback message
        if (filteredResults !== undefined) {
            if (filteredResults.length > 0) {
                results = (filteredResults.map((result, i) => {
                    return (
                        <SearchResult
                            key={`result-${i}`}
                            searchResult={result}
                        />
                    )
                }))
            } else {
                results = (
                    <span className={s.noResults}>
                        <strong>Sorry, no results found</strong>
                    </span>
                )
            }
        }

        return (
            <div className={s.listContainer}>
                {results}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { search } = state || {};
    const { searchResults } = search || {};

    return {
        searchResults: searchResults || {},
    }
}

export default connect(mapStateToProps)(ListView);
