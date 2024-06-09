import dayjs from 'dayjs';
import { DateFormat } from '../constants';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const formatDate = (dueDate) => dayjs(dueDate).format(DateFormat.DATE);
const formatTime = (dueDate) => dayjs(dueDate).format(DateFormat.TIME);
const formatDateForm = (dueDate) => dayjs(dueDate).format(DateFormat.DATE_FORM);
const formatDateTripInfo = (dueDate) => dayjs(dueDate).format(DateFormat.DATE_TRIP_INFO);

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

export {formatDate, formatTime, formatDateForm, formatDateTripInfo, getDuration};

