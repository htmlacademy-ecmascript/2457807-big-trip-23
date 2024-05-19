import {remove, render, replace} from '../framework/render.js';
import { EventsMessages } from '../constants.js';
import EventPresenter from './event-presenter.js';

import EventListView from '../view/event-list-view.js';

import FormEventView from '../view/form-event-view.js';
import EventView from '../view/event-view.js';

import SortView from '../view/sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import FilterView from '../view/filter-view.js';

import { filterEvents, generateFilters } from '../utils/filtr-event.js';
import { generateSort } from '../utils/sort-events.js';

export default class EventListPresenter {
  #eventListContainer = null;
  #tripFiltersContainer = null;
  #eventsModel = null;

  #sortComponent = new SortView();
  // #filterComponent = null;
  #eventListComponent = new EventListView();
  // #noEventsComponent = new ListEmptyView();

  #boardEvents = [];
  #boardDestinations = [];
  #boardOffers = [];

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
    const sorts = generateSort(eventsData);
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
      eventListContainer: this.#eventListComponent.element,
    });
    eventPresenter.init(event, this.#eventsModel);
  }
}
