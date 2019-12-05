// Import actions
import { SET_VIEW_TYPE } from './actions';

// Define consts
const MAP_VIEW = 'map view';

const INITIAL_STATE = {
    viewMode: MAP_VIEW,
};

export default function ViewMode(state = INITIAL_STATE, action) {
    switch(action.type) {
        case SET_VIEW_TYPE:
            return {
                ...state,
                viewMode: action.payload
            };
        default:
            return state;
    }
}

