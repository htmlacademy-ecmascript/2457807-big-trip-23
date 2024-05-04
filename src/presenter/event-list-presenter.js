import { render } from '../render.js';
import EventListView from '../view/event-list-view.js';
import FormEventView from '../view/form-event-view.js';
import EventView from '../View/event-view.js';

export default class EventListPresenter {
  eventListComponent = new EventListView();

  constructor({eventListContainer, eventsModel}) {
    this.eventListContainer = eventListContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    this.boardEvents = [... this.eventsModel.getEvents()];
    render(this.eventListComponent, this.eventListContainer);
    render(new FormEventView(), this.eventListComponent.getElement());
    for (let i = 0; i < this.boardEvents.length; i++) {
      render(new EventView({event: this.boardEvents[i]}), this.eventListComponent.getElement());
    }
  }
}
