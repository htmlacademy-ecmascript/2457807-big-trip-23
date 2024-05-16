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
  Day: 'day',
  TIME: 'time',
  PRICE: 'price',
};
const DateFormat = {
  DATE_FORMATE: 'MMM DD',
  TIME_FORMAT: 'HH:mm',
  DATE_FORMATE_FORM: 'DD/MM/YY',
};
const DATE_NOW = new Date().toISOString();

export {FILTER_TYPES, FilterType, SORT_TYPES, SortType, EVENT_TYPES_TRIP, DateFormat, DATE_NOW};
