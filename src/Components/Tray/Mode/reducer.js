// Import consts
import * as a from './actions';
import { BUS } from './data';

const defaultState = {
  modeToCheck: BUS
};

export default function setMode(state = defaultState, action) {
  switch (action.type) {
    case a.SET_MODE:
      return {
        ...state,
        modeToCheck: action.payload
      };
    default:
      return state;
  }
}
