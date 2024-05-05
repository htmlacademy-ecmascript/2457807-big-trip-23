import {createElement} from '../render.js';
import {formatDate, formatTime, getDuration} from '../utils.js';

const createOffersItemTemplate = ({title, price}) => `<li class="event__offer">
  <span class="event__offer-title">${title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${price}</span>
</li>`;

const createOffersTemplate = (offersArray, offersEventArray) => {
  if (offersEventArray.length === 0 || offersArray.length === 0) {
    return ''; // Возвращаем пустую строку, если offers пуст или не существует
  }
  const offersItem = offersArray.map((offerElement) => {

    const isoffers = offersEventArray.find((offersEventItem) => offersEventItem === offerElement.id);
    if (isoffers || isoffers !== undefined) {
      return offerElement;
    }
  }).filter((element) => element !== undefined);
  const offersTemplate = offersItem.reduce(
    (accumulator, offer) => accumulator + createOffersItemTemplate(offer), '');
  return offersTemplate;
};

const createEventTemplate = (eventData, destinationsData, offersData) => {
  const {
    id: idEvent,
    basePrice,
    dateFrom,
    dateTo,
    destination: idDestinationEvent,
    isFavorite,
    offers: offersEventArray,
    type
  } = eventData;
  const {
    id: idDestination,
    description,
    name,
    pictures
  } = destinationsData;
  const {
    type: typeOffer,
    offers: offersArray
  } = offersData;
  return (`
  <div class="event">
    <time class="event__date" datetime="${dateFrom}">${formatDate(dateFrom)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dateFrom}">${formatTime(dateFrom)}</time>
        &mdash;
        <time class="event__end-time" datetime="${dateTo}">${formatTime(dateTo)}</time>
      </p>
      <p class="event__duration">${getDuration(dateFrom, dateTo)}</p>
    </div>
    <p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
  </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${createOffersTemplate(offersArray, offersEventArray)}
    </ul>
    <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>`);
};

export default class EventView {
  constructor({
    eventData,
    destinationsData,
    offersData
  }) {
    this.event = eventData;
    this.destinationsData = destinationsData;
    this.offersData = offersData;
  }

  getTemplate() {
    return createEventTemplate(this.event, this.destinationsData, this.offersData);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}