import {render, remove, RenderPosition} from '../framework/render.js';
import FormEventView from '../view/form-event-view.js';
import { UserAction, UpdateType } from '../constants.js';

export default class NewEventPresenter {
  #eventListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #eventsModel = null;
  #eventFormComponent = null;

  constructor({eventListContainer, eventsModel, onDataChange, onDestroy}) {
    this.#eventListContainer = eventListContainer;
    this.#eventsModel = eventsModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#eventFormComponent !== null) {
      return;
    }
    this.#eventFormComponent = new FormEventView({
      destinationsData: [...this.#eventsModel.destinations],
      offersData: [...this.#eventsModel.offers],
      onFormSubmit: this.#handleFormSubmit,
      onFormDelete: this.#handleFormDelete,
      onformRollUp: this.#handleFormDelete,
    });

    render(this.#eventFormComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#eventFormComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#eventFormComponent);
    this.#eventFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (event) => {
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      {id: crypto.randomUUID(), ...event},
    );
    this.destroy();
  };

  #handleFormDelete = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
