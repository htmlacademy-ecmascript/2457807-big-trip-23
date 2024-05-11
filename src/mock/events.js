import { EVENT_TYPES_TRIP } from '../constants';
import { getRandomArrayElement, getRandomInteger, getRandomDate } from '../utils';
import { getDestinations } from './destinations';
import { getOffers } from './offers';


const startDateFrom = new Date(2024, 6, 1);
const endDateFrom = new Date(2024, 7, 30);
const startDateTo = new Date(2024, 7, 28);
const endDateTo = new Date(2024, 8, 31);

const getRandomOffersArrayId = (type) =>{
  const offersDataTypeEvent = getOffers().find((offer) => offer.type === type);
  const lengthTypeOffers = offersDataTypeEvent.offers.length;
  const randomOffersId = () => offersDataTypeEvent.offers[getRandomInteger(0, lengthTypeOffers)]?.id;
  const arrayOffersRandom = Array.from({length: getRandomInteger(0, lengthTypeOffers)}, randomOffersId);
  const arrayOffersRandomWithoutUndefined = arrayOffersRandom.filter((element) => element !== undefined);
  const uniqueOffersArrayId = new Set(arrayOffersRandomWithoutUndefined);
  return [...uniqueOffersArrayId];
};

const getRandomEvent = () => {
  const type = getRandomArrayElement(EVENT_TYPES_TRIP);
  const offersRandomArrayId = getRandomOffersArrayId(type);
  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInteger(1000, 5000),
    dateFrom: getRandomDate(startDateFrom, endDateFrom),
    dateTo: getRandomDate(startDateTo, endDateTo),
    destination: getRandomArrayElement(getDestinations()).id,
    isFavorite: !!getRandomInteger(0, 1),
    type: type,
    offers: offersRandomArrayId || [''],
  };
};

export {getRandomEvent};
