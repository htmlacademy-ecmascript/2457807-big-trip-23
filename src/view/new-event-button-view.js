import AbstractView from '../framework/view/abstract-view.js';

const createNewEventButtonTemplate = () =>
  '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class NewEventButtonView extends AbstractView{
  #handleNewEventClick = null;

  constructor({onNewEventButtonClick}) {
    super();
    this.#handleNewEventClick = onNewEventButtonClick;

    this.element.addEventListener('click', this.#editNewEventClickHandler);
  }

  get template() {
    return createNewEventButtonTemplate();
  }

  #editNewEventClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleNewEventClick();
  };
}
