import {SortType} from '../constants.js';

const sortEvents = {
  [SortType.DAY]: (events) => events.sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom)),
  [SortType.EVENT]: (events) => events.sort((a, b) => a.destination.localeCompare(b.destination)),
  [SortType.TIME]: (events) => events.sort((a, b) => new Date(b.dateTo - b.dateFrom) - new Date(a.dateTo - a.dateFrom)),
  [SortType.PRICE]: (events) => events.sort((a, b) => b.basePrice - a.basePrice),
  [SortType.OFFERS]: (events) => events.sort((a, b) => b.offers.length - a.offers.length),
};
function generateSort(events) {
  return Object.entries(sortEvents).map(([sortType, sortTask]) => ({
    type: sortType,
    count: sortTask(events).length,
  }));
}

export {sortEvents, generateSort};