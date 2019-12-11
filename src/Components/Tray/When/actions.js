export const SET_TIME_TO_CHECK = 'set time to check';
export const SET_TIME = 'set time';

export function SetTimeToCheckAction(data) {
  return { type: SET_TIME_TO_CHECK, payload: data };
}

export function SetTimeAction(data) {
  return { type: SET_TIME, payload: data };
}
