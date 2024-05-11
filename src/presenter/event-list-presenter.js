import {render} from '../render.js';
import EventListView from '../view/event-list-view.js';
import FormEventView from '../view/form-event-view.js';
import EventView from '../View/event-view.js';

const FORM_EVENT_INDEX = 0;
export default class EventListPresenter {
  eventListComponent = new EventListView();

  constructor({
    eventListContainer,
    eventsModel
  }) {
    this.eventListContainer = eventListContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    this.boardEvents = [...this.eventsModel.getEvents()];
    this.boardDestinations = [...this.eventsModel.getDestinations()];
    this.boardOffers = [...this.eventsModel.getOffers()];
    render(this.eventListComponent, this.eventListContainer);
    render(new FormEventView({eventData: this.boardEvents[FORM_EVENT_INDEX],
      destinationsData: this.boardDestinations,
      offersData: this.boardOffers}), this.eventListComponent.getElement());
    for (let i = 1; i < this.boardEvents.length; i++) {
      // const indexDestination = this.boardDestinations.findIndex((destination) => destination.id === this.boardEvents[i].destination);
      // const indexOffers = this.boardOffers.findIndex((offer) => offer.type === this.boardEvents[i].type);
      render(new EventView({
        eventData: this.boardEvents[i],
        destinationsData: this.eventsModel.getDestinationById(this.boardEvents[i].destination),
        // destinationsData: this.boardDestinations[indexDestination],
        offersData: this.eventsModel.getOffersByType(this.boardEvents[i].type),
        // offersData: this.boardOffers[indexOffers]
      }),
      this.eventListComponent.getElement());
    }
  }
}
