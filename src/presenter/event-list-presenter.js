import {render} from '../framework/render.js';
import EventListView from '../view/event-list-view.js';
import FormEventView from '../view/form-event-view.js';
import EventView from '../View/event-view.js';

const FORM_EVENT_INDEX = 0;
export default class EventListPresenter {
  #eventListContainer = null;
  #eventsModel = null;
  #eventListComponent = new EventListView();

  #boardEvents = [];
  #boardDestinations = [];
  #boardOffers = [];

  constructor({eventListContainer, eventsModel}) {
    this.#eventListContainer = eventListContainer;
    this.#eventsModel = eventsModel;
  }

  #renderEvent(eventData, destinationData, offersData) {
    const eventComponent = new EventView({eventData, destinationData, offersData});
    render(eventComponent, this.#eventListComponent.element);
  }

  init() {
    this.#boardEvents = [...this.#eventsModel.events];
    this.#boardDestinations = [...this.#eventsModel.destinations];
    this.#boardOffers = [...this.#eventsModel.offers];


    render(this.#eventListComponent, this.#eventListContainer);

    render(new FormEventView({eventData: this.#boardEvents[FORM_EVENT_INDEX],
      destinationsData: this.#boardDestinations,
      offersData: this.#boardOffers}),
    this.#eventListComponent.element);

    for (let i = 1; i < this.#boardEvents.length; i++) {
      this.#renderEvent(
        this.#boardEvents[i],
        this.#eventsModel.getDestinationById(this.#boardEvents[i].destination),
        this.#eventsModel.getOffersByType(this.#boardEvents[i].type));
    }
  }
}
