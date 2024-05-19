import {remove, render, replace} from '../framework/render.js';
import { EventsMessages } from '../constants.js';
import EventListView from '../view/event-list-view.js';
import FormEventView from '../view/form-event-view.js';
import EventView from '../view/event-view.js';
import SortView from '../view/sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
// import { FILTER_TYPES } from '../constants.js';
import FilterView from '../view/filter-view.js';
// import { filterEvents, generateFilters } from '../utils/utils.js';
import { filterEvents, generateFilters } from '../utils/filtr-event.js';
import { generateSort } from '../utils/sort-events.js';

export default class EventListPresenter {
  #eventListContainer = null;
  #tripFiltersContainer = null;
  #eventsModel = null;

  #sortComponent = new SortView();
  // #filterComponent = null;
  #eventListComponent = new EventListView();
  #noEventsComponent = new ListEmptyView();

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
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormEventToEven();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const eventComponent = new EventView({
      eventData: event,
      destinationData: this.#eventsModel.getDestinationById(event.destination),
      offersData: this.#eventsModel.getOffersByType(event.type),
      onEditClick: () => {
        replaceEvenToFormEvent();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const eventFormComponent = new FormEventView({
      eventData: event,
      destinationsData: [...this.#eventsModel.destinations],
      offersData: [...this.#eventsModel.offers],
      onFormSubmit: () => {
        replaceFormEventToEven();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceEvenToFormEvent(){
      replace(eventFormComponent, eventComponent);
    }

    function replaceFormEventToEven(){
      replace(eventComponent, eventFormComponent);
    }

    render(eventComponent, this.#eventListComponent.element);
  }
}