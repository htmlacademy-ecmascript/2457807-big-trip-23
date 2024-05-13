import {render, replace} from '../framework/render.js';
import EventListView from '../view/event-list-view.js';
import FormEventView from '../view/form-event-view.js';
import EventView from '../view/event-view.js';
import SortView from '../view/sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import { FILTER_TYPES } from '../constants.js';
export default class EventListPresenter {
  #eventListContainer = null;
  #eventsModel = null;

  #sortComponent = new SortView();
  #eventListComponent = new EventListView();
  #listEmptyComponent = null;
  #typeEmptyMessage = null;

  #boardEvents = [];
  #boardDestinations = [];
  #boardOffers = [];

  constructor({eventListContainer, eventsModel}) {
    this.#eventListContainer = eventListContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#boardEvents = [...this.#eventsModel.events];
    render(this.#sortComponent, this.#eventListContainer);
    render(this.#eventListComponent, this.#eventListContainer);

    if(this.#boardEvents.length === 0){
      this.typeEmptyMessage = FILTER_TYPES[0];
      this.#listEmptyComponent = new ListEmptyView(this.typeEmptyMessage);
      render(this.#listEmptyComponent, this.#eventListContainer);
    }else{
      for (let i = 0; i < this.#boardEvents.length; i++) {
        this.#renderEvent(this.#boardEvents[i]);
      }
    }
  }

  #renderEvent(event) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormEventToEven();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const eventComponent = new EventView({
      eventData: event,
      destinationData: this.#eventsModel.getDestinationById(event.destination),
      offersData: this.#eventsModel.getOffersByType(event.type),
      onEditClick: () => {
        replaceEvenToFormEvent();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const eventFormComponent = new FormEventView({
      eventData: event,
      destinationsData: [...this.#eventsModel.destinations],
      offersData: [...this.#eventsModel.offers],
      onFormSubmit: () => {
        replaceFormEventToEven();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });
    function replaceEvenToFormEvent(){
      replace(eventFormComponent, eventComponent);
    }

    function replaceFormEventToEven(){
      replace(eventComponent, eventFormComponent);
    }
    render(eventComponent, this.#eventListComponent.element);
  }
}
