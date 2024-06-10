import {SortType} from '../constants.js';

const sortEvents = {
  [SortType.DAY]: (events) => events.sort((firstEvent, secondEvent) => new Date(firstEvent.dateFrom) - new Date(secondEvent.dateFrom)),
  [SortType.EVENT]: (events) => events.sort((firstEvent, secondEvent) => firstEvent.destination.localeCompare(secondEvent.destination)),
  [SortType.TIME]: (events) => events.sort((firstEvent, secondEvent) => new Date(secondEvent.dateTo - secondEvent.dateFrom) - new Date(firstEvent.dateTo - firstEvent.dateFrom)),
  [SortType.PRICE]: (events) => events.sort((firstEvent, secondEvent) => secondEvent.basePrice - firstEvent.basePrice),
  [SortType.OFFERS]: (events) => events.sort((firstEvent, secondEvent) => secondEvent.offers.length - firstEvent.offers.length),
};

function generateSort(events) {
  return Object.entries(sortEvents).map(([sortType, sortTask]) => ({
    type: sortType,
    count: sortTask(events).length,
  }));
}

export {sortEvents, generateSort};
