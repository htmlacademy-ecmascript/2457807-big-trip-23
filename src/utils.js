import dayjs from 'dayjs';
import { DateFormat } from './constants';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
const getRandomArrayElement = (items) =>items[Math.floor(Math.random() * items.length)];


const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const formatDate = (dueDate) =>dayjs(dueDate).format(DateFormat.DATE_FORMATE);
const formatTime = (dueDate) =>dayjs(dueDate).format(DateFormat.TIME_FORMAT);

const getDuration = (dateFrom, dateTo) => {
  // Обрезаем до минут начальную и конечную даты
  const start = dayjs(dateFrom).startOf('minute');
  const end = dayjs(dateTo).startOf('minute');
  const diffInMs = end.diff(start); // Вычисляем разницу в миллисекундах
  // eslint-disable-next-line no-shadow
  const duration = dayjs.duration(diffInMs); // Создаем объект длительности с разницей в миллисекундах

  // Получаем количество целых дней, часов, минут
  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();

  // Форматируем длительность в строку в формате "DDDH HHM" или "HHM" или "MM"
  if (days > 0) {
    return `${days.toString().padStart(2, '0')}D ${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else {
    return `${minutes}M`;
  }
};


export {getRandomArrayElement, getRandomInteger, getRandomDate, formatDate, formatTime, getDuration};

