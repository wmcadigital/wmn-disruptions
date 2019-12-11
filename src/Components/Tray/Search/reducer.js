import * as a from './actions';

const INITAL_STATE = {
  searchPhrase: '',
  results: [],
  resultSelected: false,
  favourites: ['000001']
};

export default function search(state = INITAL_STATE, action) {
  const { payload, type } = action || {};

  switch (type) {
    case a.FETCH_RESULTS: {
      const { searchPhrase, results } = payload || {};

      return {
        ...state,
        searchPhrase,
        results
      };
    }
    case a.RESET_SEARCH:
      return {
        ...state,
        searchPhrase: ''
      };
    case a.CHOOSE_RESULT:
      return {
        ...state,
        searchResult: payload,
        resultSelected: true
      };
    case a.DESELECT_RESULT:
      return {
        ...state,
        searchResult: undefined,
        resultSelected: false
      };
    case a.ADD_FAV:
      return {
        ...state,
        favourites: [...state.favourites, payload]
      };
    case a.DELETE_FAV:
      return {
        ...state,
        favourites: [...state.favourites, payload]
      };
    default:
      return state;
  }
}
