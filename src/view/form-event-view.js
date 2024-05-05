import {createElement} from '../render.js';
import {EVENT_TYPE_ITEM, DESTINATION_ID} from '../constants.js';
import {formatDate, formatTime, getDuration} from '../utils.js';

const createPictureTemplateItem = ({src, description}) =>`
<img class="event__photo" src="${src}" alt="${description}."></img>
`;
const createEventFormPictureTemplate = ({pictures}) =>{
  if (pictures?.length === 0 || pictures?.length === undefined) {
    return ''; // Возвращаем пустую строку, если offers пуст или не существует
  }
  const picturesTemplate = pictures.reduce(
    (accumulator, picture) => accumulator + createPictureTemplateItem(picture), '');
  return picturesTemplate;
};
const createEventOffersTemplateItem = ({id, title, price}) =>`
<div class="event__available-offers">
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-luggage" checked>
    <label class="event__offer-label" for="event-offer-${id}-1">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`;

const createEventOffersTemplate = (offersData, type) => {
  const offers = offersData.find((offer) => offer.type === type)?.offers;
  // console.log(offers?.length);
  if (offers?.length === 0 || offers?.length === undefined) {
    return ''; // Возвращаем пустую строку, если offers пуст или не существует
  }
  const offersTemplate = offers.reduce(
    (accumulator, offer) => accumulator + createEventOffersTemplateItem(offer), '');
  return offersTemplate;
};

const createFormEventTypeItemTemplate = (type) => `
<div class="event__type-item">
<input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
<label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
</div>`;

const createFormEventTemplate = (eventData, destinationsData, offersData) =>{
  const destinations = destinationsData.find((destination) => destination.id === DESTINATION_ID[2]);
  return `
<li class="trip-events__item">
<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${EVENT_TYPE_ITEM.map((type) => createFormEventTypeItemTemplate(type)).join('')}
        </fieldset>
      </div>
    </div>
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        Flight
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
      <datalist id="destination-list-1">
        <option value="Amsterdam"></option>
        <option value="Geneva"></option>
        <option value="Chamonix"></option>
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Cancel</button>
  </header>
  <section class="event__details"> 
  <section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  ${createEventOffersTemplate(offersData, EVENT_TYPE_ITEM[3])} 
  </div>
</section>
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destinations.description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
        ${createEventFormPictureTemplate(destinations)}
        </div>
      </div>
    </section>
  </section>
</form>
</li>`;
};

export default class FormEventView {
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
    return createFormEventTemplate(this.event, this.destinationsData, this.offersData);
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
