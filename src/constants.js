const FILTER_TYPES = ['everything', 'future', 'present', 'past'];
const SORT_TYPES = ['day', 'event', 'time', 'price', 'offers'];
const EVENT_TYPES_TRIP = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};
const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};
const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const EventsMessages = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PRESENT: 'There are no present events now',
  PAST: 'There are no past events now',
  FAILED_LOAD: 'Failed to load latest route information',
  LOADING: 'Loading...'
};
const DateFormat = {
  DATE_FORMATE: 'MMM DD',
  TIME_FORMAT: 'HH:mm',
  DATE_FORMATE_FORM: 'DD/MM/YY HH:mm',
  DATE_FORMATE_TRIP_INFO: 'DD MMM YYYY',
};
const DATE_NOW = new Date().toISOString();

export {FILTER_TYPES, FilterType, SORT_TYPES, SortType, EVENT_TYPES_TRIP, DateFormat, DATE_NOW, EventsMessages, Mode};
