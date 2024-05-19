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

    const previwEventComponent = this.#eventComponent;
    const previwEventFormComponent = this.#eventFormComponent;


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

    if(previwEventComponent === null || previwEventFormComponent === null){
      render(this.#eventComponent, this.#eventListContainer);
      return;
    }
    if( this.#eventListContainer.contains(previwEventComponent.element)){
      replace(this.#eventComponent, previwEventComponent);
    }
    if( this.#eventListContainer.contains(previwEventFormComponent.element)){
      replace(this.#eventFormComponent, previwEventFormComponent);
    }
    remove(previwEventComponent);
    remove(previwEventFormComponent);
  }

  destroy(){
    remove(this.#eventComponent);
    remove(this.#eventFormComponent);
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
