export const SET_VIEW_TYPE = 'set view type';

export function SetViewMode(data) {
  return { type: SET_VIEW_TYPE, payload: data };
}
