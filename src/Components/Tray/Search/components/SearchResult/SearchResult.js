// Import packages
import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { connect } from 'react-redux';

// Import components
import SearchResultView from './view';

// Import actions
import * as a from '../../actions';

// Import consts
import { FAV_CLASS } from '../../data';

class SearchResult extends React.Component {
    constructor(props) {
        super(props);

        this.ToggleFav = this.ToggleFav.bind(this);
        this.SelectResult = this.SelectResult.bind(this);
    }

    ToggleFav() {
        const { props } = this;
        const {
            AddFavourite,
            DeleteFavourite,
            isFav,
            favourites,
            searchResult
        } = props || {};
        const { id } = searchResult || {};
        const data = { id, favourites }

        if (isFav === true) { 
            DeleteFavourite(data);
            console.log("Deleted From Favs!");
        }
        else { 
            AddFavourite(data)
            console.log("Add To Favs!");
        }
    }

    SelectResult(e) {
        const { props } = this;
        const {
            ChooseResult,
            isFav, 
            searchResult
        } = props || {};
        const {
            service,
            area,
            provider,
            route,
            disruption,
            mode
        } = searchResult || {};
        const selectedResult = {
            service,
            area,
            provider,
            route,
            isFav,
            disruption,
            mode
        };

        if (e.target.classList.contains(FAV_CLASS)) {
            return;
        }

        ChooseResult(selectedResult);
    }

    render() {
        const {
            props,
            ToggleFav,
            SelectResult
        } = this;
        const {
            searchResult,
        } = props || {};

        return (
            <SearchResultView 
                toggleFav={ToggleFav}
                selectResult={SelectResult}
                searchResult={searchResult}
            />
        )
    }
}
    

SearchResult.propTypes = {
    searchResult: PropTypes.objectOf(
        oneOfType([
            PropTypes.string,
            PropTypes.bool,
            PropTypes.number,
            PropTypes.arrayOf(PropTypes.any)
        ])
    ),
    AddFavourite: PropTypes.func,
    DeleteFavourite: PropTypes.func,
    ChooseResult: PropTypes.func,
};

SearchResult.defaultProps = {
    searchResult: {},
    AddFavourite: () => {},
    DeleteFavourite: () => {},
    ChooseResult: () => {},
};

const mapStateToProps = state => {
    const { search } = state || {};
    const { favourites } = search || {};

    return {
        favourites: favourites || {}
    }
}

const mapDispatchToProps = dispatch => {
    const {
        AddFavourite,
        DeleteFavourite,
        ChooseResult
    } = a || {};
    return {
        AddFavourite: data => dispatch(AddFavourite(data)),
        DeleteFavourite: data => dispatch(DeleteFavourite(data)),
        ChooseResult: data => dispatch(ChooseResult(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResult);
