import { createElement } from '../render.js';
import { formatDate, formatTime, getDuration } from '../utils.js';

const createEventTemplate = (eventData, destinations) => {
  const {id: idEvent, basePrice, dateFrom, dateTo, destination, isFavorite, offers, type} = eventData;
  //  const {description, name, pictures} = destinationsData;
  
  return (`
  <div class="event">
    <time class="event__date" datetime="${dateFrom}">${formatDate(dateFrom)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination}</h3>
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
      <li class="event__offer">
        <span class="event__offer-title">Order Uber</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">20</span>
      </li>
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
  constructor({eventData, destinationsData}){
    this.event = eventData;
    this.destinations = destinationsData;
  }

  getTemplate() {
    return createEventTemplate(this.event, this.destinations);
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
