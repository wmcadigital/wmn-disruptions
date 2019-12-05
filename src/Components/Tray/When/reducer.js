// Import consts
import * as a from './actions';

export default function setTime(state = {}, action) {
    switch (action.type) {
        case a.SET_TIME_TO_CHECK:
            return {
                ...state,
                timeToCheck: action.payload
            };
        case a.SET_TIME:
            return {
                ...state,
                time: action.payload
            };
        default:
            return state;
    }
}
