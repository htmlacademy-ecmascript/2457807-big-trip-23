import {remove, render, replace} from '../framework/render.js';
import { EventsMessages } from '../constants.js';
import EventPresenter from './event-presenter.js';

import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import FilterView from '../view/filter-view.js';

import { filterEvents, generateFilters } from '../utils/filtr-event.js';
import { generateSort } from '../utils/sort-events.js';
import { updateItem } from '../utils/common.js';

export default class EventListPresenter {
  #eventListContainer = null;
  #tripFiltersContainer = null;
  #eventsModel = null;

  #sortComponent = new SortView();
  // #filterComponent = null;
  #eventListComponent = new EventListView();
  // #noEventsComponent = new ListEmptyView();

  #boardEvents = [];
  #eventsPresenter = new Map();
  // #boardDestinations = [];
  // #boardOffers = [];

  constructor({eventListContainer,tripFiltersContainer, eventsModel}) {
    this.#eventListContainer = eventListContainer;
    this.#tripFiltersContainer = tripFiltersContainer;
    this.#eventsModel = eventsModel;

  }

  init() {
    this.#boardEvents = [...this.#eventsModel.events];
    this.#filterRender(this.#boardEvents);
    this.#renderSort(this.#boardEvents);
    this.#renderBoardEvents();
  }

  #renderBoardEvents(){
    render(this.#eventListComponent, this.#eventListContainer);
    if(this.#boardEvents.length === 0){
      this.#renderNoEvents(EventsMessages.EVERYTHING);
      return;
    }
    this.#renderEvents();
  }

  #renderEvents(from, to){
    render(this.#eventListComponent, this.#eventListContainer);
    this.#boardEvents
      .slice(from, to)
      .forEach((event) => this.#renderEvent(event));
  }

  #renderNoEvents(typeMessage){
    render(new ListEmptyView(typeMessage), this.#eventListContainer);
  }

  #renderSort(eventsData){
    const eventsSortData = [...eventsData];
    const sorts = generateSort(eventsSortData);
    const sortComponent = new SortView({sorts});
    render(sortComponent, this.#eventListContainer);
  }

  #filterRender(eventsData){
    const eventsDataFilter = eventsData;
    const filters = generateFilters(eventsData);
    const filterComponent = new FilterView({filters});
    render(filterComponent, this.#tripFiltersContainer);
    document.querySelector('.trip-filters')
      .addEventListener('click', filterEvent);

    function filterEvent(evt){
      if(evt.target.value !== undefined){
        const eventsFilter = filterEvents[String(evt.target.value)](eventsDataFilter);
        // console.log(eventsFilter);
      }
      // console.log(evt.target.value);
    }
  }


  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#eventListComponent.element, eventsModel: this.#eventsModel,
      onDataChange: this.#handleEventPresenter,
    });
    eventPresenter.init(event);
    this.#eventsPresenter.set(event.id, eventPresenter);
  }

  #clearEventList(){
    this.#eventsPresenter.forEach((presenter) => presenter.destroy());
    this.#eventsPresenter.clear();
  }

  #handleEventPresenter = (updateEvent) =>{
    this.#boardEvents = updateItem(this.#boardEvents, updateEvent);
    console.log(this.#eventsPresenter.get(updateEvent.id));
    this.#eventsPresenter.get(updateEvent.id).init(updateEvent);
  };
}
