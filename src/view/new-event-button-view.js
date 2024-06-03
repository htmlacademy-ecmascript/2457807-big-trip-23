import AbstractView from '../framework/view/abstract-view.js';

const createNewEventButtonTemplate = () =>
  '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class NewEventButtonView extends AbstractView{
  #handleNewEventClick = null;

  constructor({onNewEventClick}) {
    super();
    this.#handleNewEventClick = onNewEventClick;

    this.element.addEventListener('click', this.#editNewEventHandler);
  }

  get template() {
    return createNewEventButtonTemplate();
  }

  #editNewEventHandler = (evt) => {
    evt.preventDefault();
    this.#handleNewEventClick();
  };
}
