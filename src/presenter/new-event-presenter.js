import {render, remove, RenderPosition} from '../framework/render.js';
import FormEventView from '../view/form-event-view.js';
import { UserAction, UpdateType } from '../constants.js';

export default class NewEventPresenter {
  #handleDataChange = null;
  #handleNewEventDestroy = null;
  #eventsModel = null;
  #eventFormComponent = null;
  #handleNewEventDestroyCheck = null;


  constructor({eventsModel, onDataChange, onNewEventDestroy, onNewEventDestroyCheck}) {
    this.#eventsModel = eventsModel;
    this.#handleDataChange = onDataChange;
    this.#handleNewEventDestroy = onNewEventDestroy;
    this.#handleNewEventDestroyCheck = onNewEventDestroyCheck;
  }

  init() {
    if (this.#eventFormComponent !== null) {
      return;
    }
    this.#eventFormComponent = new FormEventView({
      destinationsData: [...this.#eventsModel.destinations],
      offersData: [...this.#eventsModel.offers],
      onFormSubmit: this.#handleFormSubmit,
      onFormDeleteClick: this.#handleFormDelete,
      onformRollUpClick: this.#handleFormDelete,
    });
    const newFormContainer = document.querySelector('.trip-events__list');
    render(this.#eventFormComponent, newFormContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#eventFormComponent === null) {
      return;
    }

    this.#handleNewEventDestroy();
    this.#handleNewEventDestroyCheck();

    remove(this.#eventFormComponent);
    this.#eventFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#eventFormComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#eventFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#eventFormComponent.shake(resetFormState);
  }

  #handleFormSubmit = (event) => {
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MAJOR,
      event,
    );
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
