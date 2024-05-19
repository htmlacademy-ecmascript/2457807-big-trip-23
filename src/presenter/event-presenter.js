import {remove, render, replace} from '../framework/render.js';
import FormEventView from '../view/form-event-view.js';
import EventView from '../view/event-view.js';

export default class EventPresenter{
  #eventComponent = null;
  #eventFormComponent = null;
  #eventListContainer = null;

  #event = null;
  #eventsModel = null;

  constructor({eventListContainer}){
    this.#eventListContainer = eventListContainer;
  }

  init(event, eventsModel) {
    this.#event = event;
    this.#eventsModel = eventsModel;
    console.log(this.#eventsModel.getDestinationById(this.#event.destination));

    this.#eventComponent = new EventView({
      eventData: this.#event,
      destinationData: this.#eventsModel.getDestinationById(this.#event.destination),
      offersData: this.#eventsModel.getOffersByType(this.#event.type),
      onEditClick: this.#handleEditClick,
    });

    this.#eventFormComponent = new FormEventView({
      eventData: this.#event,
      destinationsData: [...this.#eventsModel.destinations],
      offersData: [...this.#eventsModel.offers],
      onFormSubmit: this.#handleFormSummit,
    });
    render(this.#eventComponent, this.#eventListContainer);
  }

  #replaceEvenToFormEvent(){
    replace(this.#eventFormComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormEventToEven(){
    replace(this.#eventComponent, this.#eventFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormEventToEven();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleEditClick = () => {
    this.#replaceEvenToFormEvent();
  };

  #handleFormSummit = () => {
    this.#replaceFormEventToEven();
  };

}
