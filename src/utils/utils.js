import dayjs from 'dayjs';
import { DateFormat } from '../constants';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import {FilterType, SortType, DATE_NOW } from '../constants';
import EventsModel from '../model/events-model';


const getRandomArrayElement = (items) =>items[Math.floor(Math.random() * items.length)];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const isTaskRepeating = (repeating) => Object.values(repeating).some(Boolean);

const formatDate = (dueDate) => dayjs(dueDate).format(DateFormat.DATE_FORMATE);
const formatTime = (dueDate) => dayjs(dueDate).format(DateFormat.TIME_FORMAT);
const formatDateForm = (dueDate) => dayjs(dueDate).format(DateFormat.DATE_FORMATE_FORM);
const isTaskExpired = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');


const getDuration = (dateFrom, dateTo) => {

  const start = dayjs(dateFrom).startOf('minute');
  const end = dayjs(dateTo).startOf('minute');
  const differenceInMilliseconds = end.diff(start);
  const eventDuration = dayjs.duration(differenceInMilliseconds);
  const days = Math.floor(eventDuration.asDays());
  const hours = eventDuration.hours();
  const minutes = eventDuration.minutes();

  if (days > 0) {
    return `${days.toString().padStart(2, '0')}D ${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else {
    return `${minutes}M`;
  }
};


const eventsDate = new EventsModel();

// const filterEventEverything = (events) => events;
// const filterEventFuture = (events) => events.filter((event) => event.dateFrom > DATE_NOW);
// const filterEventPresent = (events) => events.filter((event) => event.dateFrom <= DATE_NOW && event.dateTo >= DATE_NOW);
// const filterEventPast = (events) => events.filter((event) => event.dateTo < DATE_NOW);

const filterEvents = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((item) => Date.parse(item.dateFrom) > Date.parse(DATE_NOW)),
  [FilterType.PRESENT]: (events) => events.filter((item) => Date.parse(item.dateFrom) <= Date.parse(DATE_NOW) && Date.parse(item.dateTo) >= Date.parse(DATE_NOW)),
  [FilterType.PAST]: (events) => events.filter((item) => Date.parse(item.dateTo) < Date.parse(DATE_NOW)),
};

// const sortEvents = {
//   [SortType.Day]: (events) => events,
//   [SortType.TIME]: (events) => events.sort((a, b) => return new Date.parse(item.dateFrom) > Date.parse(DATE_NOW)),
//   [SortType.PRICE]: (events) => events.sort((item) => Date.parse(item.price) <= Date.parse(DATE_NOW)),
// }
// console.log(DATE_NOW);
// console.log(eventsDate);
// console.log(filterEvents['past'](eventsDate.events));


export {getRandomArrayElement, getRandomInteger, getRandomDate, formatDate, formatTime, formatDateForm, getDuration, filterEvents};

