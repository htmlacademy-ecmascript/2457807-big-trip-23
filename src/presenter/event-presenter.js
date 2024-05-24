import {remove, render, replace} from '../framework/render.js';
import { Mode } from '../constants.js';
import FormEventView from '../view/form-event-view.js';
import EventView from '../view/event-view.js';

export default class EventPresenter{
  #eventComponent = null;
  #eventFormComponent = null;
  #eventListContainer = null;

  #event = null;
  #eventsModel = null;

  #handleDataChange = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({eventListContainer, eventsModel, onDataChange, onModeChange}){
    this.#eventListContainer = eventListContainer;
    this.#eventsModel = eventsModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(event) {
    this.#event = event;

    const previewEventComponent = this.#eventComponent;
    const previewEventFormComponent = this.#eventFormComponent;


    this.#eventComponent = new EventView({
      eventData: this.#event,
      destinationData: this.#eventsModel.getDestinationById(this.#event.destination),
      offersData: this.#eventsModel.getOffersByType(this.#event.type),
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#eventFormComponent = new FormEventView({
      eventData: this.#event,
      destinationsData: [...this.#eventsModel.destinations],
      offersData: [...this.#eventsModel.offers],
      onFormSubmit: this.#handleFormSubmit,
    });

    if(previewEventComponent === null || previewEventFormComponent === null){
      render(this.#eventComponent, this.#eventListContainer);
      return;
    }
    if(this.#mode === Mode.DEFAULT){
      replace(this.#eventComponent, previewEventComponent);
    }
    if(this.#mode === Mode.EDITING){
      replace(this.#eventFormComponent, previewEventFormComponent);
    }
    remove(previewEventComponent);
    remove(previewEventFormComponent);
  }

  destroy(){
    remove(this.#eventComponent);
    remove(this.#eventFormComponent);
  }

  resetView(){
    if(this.#mode !== Mode.DEFAULT){
      this.#eventFormComponent.reset(this.#event);
      this.#replaceFormEventToEvent();
    }
  }

  #replaceEvenToFormEvent(){
    replace(this.#eventFormComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormEventToEvent(){
    replace(this.#eventComponent, this.#eventFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#eventFormComponent.reset(this.#event);
      this.#replaceFormEventToEvent();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleEditClick = () => {
    this.#replaceEvenToFormEvent();
  };

  #handleFormSubmit = () => {
    this.#replaceFormEventToEvent();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#event, isFavorite: !this.#event.isFavorite});
  };

}
