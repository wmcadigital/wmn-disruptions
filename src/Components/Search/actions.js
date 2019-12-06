import {
    BUS,
    TRAM,
    TRAIN,
    ROADS,
    DISRUPTIONS
} from "./data";

export const SEARCH = 'search';
export const RESET_SEARCH = 'reset search';
export const CHOOSE_RESULT = 'choose result';
export const DESELECT_RESULT = 'deselect result';
export const ADD_FAV = 'add favourite';
export const DELETE_FAV = 'delete favourite';
export const FETCH_RESULTS = 'fetch results';

export function FetchResults(data) {
    let URL;
    const {
        searchPhrase,
        modeToCheck
    } = data || {};
    let newData = [];

    switch(modeToCheck) {
        case BUS:
            //URL = 'https://trasnport-api-isruptions-v2.azure-api.net/disruptions-bus-test-2/?q=';
            URL = 'https://raw.githubusercontent.com/wmcadigital/wmn-disruptions/master/public/newBusData.json'
            break;
        case TRAM:
            URL = '';
            break;
        case TRAIN:
            URL = '';
            break;
        case ROADS:
            URL = '';
            break;
        case DISRUPTIONS:
            URL = '';
            break;
        default:
            return;
    }

    return () => {
        fetch(URL)
        .then(res => res.json())
        .then(res => {
            const { data: d } = res || {};
            const { serviceSearch: results } = d || {};

            newData = {
                results,
                searchPhrase
            }

            console.log("newData is ", newData);

            return { type: FETCH_RESULTS, payload: newData }
        })
    }
}

export function ResetSearch(data) {
    return { type: RESET_SEARCH, payload: data }
}

export function ChooseResult(data) {
    return { type: CHOOSE_RESULT, payload: data }
}

export function DeselectResult(data) {
    return { type: DESELECT_RESULT, payload: data }
}

export function AddFavourite(data) {
    const { favourites, service } = data || {};
    const newFavs = favourites;

    newFavs.push(service);

    localStorage.setItem('favourites', newFavs);

    return { type: ADD_FAV, payload: newFavs }
}

export function DeleteFavourite(data) {
    const { favourites, service } = data || {};
    const newFavs = favourites;

    for (let i = 0; i < favourites.length; i += 1){ 
        if (favourites[i] === service) {
            newFavs.splice(i, 1); 
        }
    }

    localStorage.setItem('favourites', newFavs);

    return { type: DELETE_FAV, payload: newFavs }
}
