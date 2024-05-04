import { render } from '../render.js';
import EventListView from '../view/event-list-view.js';
import FormEventView from '../view/form-event-view.js';
import EventView from '../View/event-view.js';

export default class EventListPresenter {
  eventListComponent = new EventListView();

  constructor({eventListContainer}) {
    this.eventListContainer = eventListContainer;
  }

  init() {
    render(this.eventListComponent, this.eventListContainer);
    render(new FormEventView(), this.eventListComponent.getElement());
    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.eventListComponent.getElement());
    }
  }
}
