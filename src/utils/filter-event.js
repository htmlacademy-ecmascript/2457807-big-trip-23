import {FilterType, DATE_NOW } from '../constants.js';

const filterEvents = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter(({dateFrom}) => Date.parse(dateFrom) > Date.parse(DATE_NOW)),
  [FilterType.PRESENT]: (events) => events.filter(({dateFrom, dateTo}) => Date.parse(dateFrom) <= Date.parse(DATE_NOW) && Date.parse(dateTo) >= Date.parse(DATE_NOW)),
  [FilterType.PAST]: (events) => events.filter(({dateTo}) => Date.parse(dateTo) < Date.parse(DATE_NOW)),
};
function generateFilters(events) {
  return Object.entries(filterEvents).map(([filterType, filterTask]) => ({
    type: filterType,
    count: filterTask(events).length,
  }));
}

export {filterEvents, generateFilters};
