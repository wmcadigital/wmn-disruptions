// Define current time
const today = new Date();
const time = today.getHours() + ':' + ('0'+ today.getMinutes()).slice(-2);

export const TITLE = 'When';

// Times
export const NOW = 'now';
export const TOMORROW = 'tomorrow';
export const CHOOSE_DATE = 'Choose Date';

// Time buttons
export const BTN_NOW = `Now ${time}`;
export const BTN_TOMORROW = 'Tomorrow';
export const BTN_CHOOSE_DATE = 'Choose Date';
