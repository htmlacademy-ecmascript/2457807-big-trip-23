import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {EVENT_TYPES_TRIP} from '../constants.js';
import {formatDateForm } from '../utils/date.js';
import flatpickr from 'flatpickr';

const createListOptionsDestinationItem = ({name}) =>`<option value="${name}"></option>`;

const createListOptionsDestination = (destinations) =>{
  const destinationNameTemplate = destinations.reduce(
    (accumulator, destination) => accumulator + createListOptionsDestinationItem(destination), '');
  return destinationNameTemplate;
};

const createPictureTemplateItem = ({src, description}) =>`
<img class="event__photo" src="${src}" alt="${description}."></img>
`;

const createEventFormPictureTemplate = ({pictures}) =>{
  if (pictures?.length === 0 || pictures?.length === undefined) {
    return '';
  }
  const picturesTemplate = pictures.reduce(
    (accumulator, picture) => accumulator + createPictureTemplateItem(picture), '');
  return picturesTemplate;
};
const createEventOffersTemplateItem = ({id, title, price}, isCheckedOffers) =>`
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-${id}" type="checkbox" name="event-offer-luggage" ${isCheckedOffers ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${title}-${id}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`;

const createEventOffersTemplate = (offersData, eventData) => {
  const offers = offersData.find((offer) => offer.type === eventData.type)?.offers;
  if (offers?.length === 0 || offers?.length === undefined) {
    return '';
  }
  const offersTemplate = offers.reduce(
    (accumulator, offer) => {
      const isCheckedOffers = eventData.offers.includes(offer.id);
      return (accumulator + createEventOffersTemplateItem(offer, isCheckedOffers));
    },
    '');
  return offersTemplate;
};

const createFormEventTypeItemTemplate = (type, typeEvent) => `
<div class="event__type-item">
<input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${typeEvent === type ? 'checked' : ''}>
<label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
</div>`;


const createFormEventTemplate = (eventData, destinationsData, offersData, state) =>{
  console.log(state);
  const {basePrice, dateFrom, dateTo, destination, isFavorite, type, offers
  } = state.event;
  // console.log(state.event);
  const destinations = destinationsData.find((destinationData) => destinationData.id === destination);
  const offersTemplate = createEventOffersTemplate(offersData, eventData);
  const isEmptyDestinations = (destinations.description === '') && (destinations.pictures.length === 0);
  const isEmptyOffers = offersTemplate === '';
  return `
<li class="trip-events__item">
<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${EVENT_TYPES_TRIP.map((eventType) => createFormEventTypeItemTemplate(eventType, type)).join('')}
        </fieldset>
      </div>
    </div>
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinations.name}" list="destination-list-1" placeholder = "Choose a trip">
      <datalist id="destination-list-1">
       ${createListOptionsDestination(destinationsData)}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDateForm(dateFrom)}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDateForm(dateTo)}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
    </button>
  </header>

  <section class="event__details ${(isEmptyOffers && isEmptyDestinations) ? 'visually-hidden' : ''}">

  <section class="event__section  event__section--offers ${isEmptyOffers ? 'visually-hidden' : ''}">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
  ${offersTemplate}
  </div>
</section>

    <section class="event__section  event__section--destination ${isEmptyDestinations ? 'visually-hidden' : ''}">
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
export default class FormEventView extends AbstractStatefulView{
  #eventData = null;
  #destinationsData = [];
  #offersData = [];
  #handleFormSubmit = null;
  constructor({eventData, destinationsData, offersData, onFormSubmit}) {
    super();
    this.#eventData = eventData;
    this._setState(FormEventView.parseEventToState(eventData));
    this.#destinationsData = destinationsData;
    this.#offersData = offersData;
    this._restoreHandlers();
    this.#handleFormSubmit = onFormSubmit;
  }

  get template() {
    return createFormEventTemplate(this.#eventData, this.#destinationsData, this.#offersData, this._state);
  }

  _restoreHandlers(){
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#eventTypeTripHandler);

  }

  #eventTypeTripHandler = (evt) =>{
    evt.preventDefault();
    const newType = evt.target.value;
    const typeOffers = this.#offersData.find((offer) => offer.type === newType);
    this.updateElement({
      eventState: {
        ...this._state.event,
        type: newType
      },
      typeOffers: {...typeOffers}
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(FormEventView.parseStateToEvent(this._state));
  };

  static parseEventToState(eventData){
    return {
      event: {...eventData},
      typeOffers:{},
      destinations: {}
    };
  }

  static parseStateToEvent(state){
    return {...state};
  }
}
