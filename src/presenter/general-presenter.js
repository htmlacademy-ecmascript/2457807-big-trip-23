import {render, remove, RenderPosition} from '../framework/render.js';
import { EventsMessages, FilterType, SortType, UserAction, UpdateType } from '../constants.js';
import EventPresenter from './event-presenter.js';
import NewEventPresenter from './new-event-presenter.js';

import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import FilterView from '../view/filter-view.js';

import { generateFilters, filterEvents } from '../utils/filter-event.js';
import { generateSort, sortEvents } from '../utils/sort-events.js';

export default class GeneralPresenter {
  #eventListContainer = null;
  #tripFiltersContainer = null;

  #sortComponent = null;
  #currentSortType = SortType.DAY;
  #filterComponent = null;
  #currentFilterType = FilterType.EVERYTHING;
  #eventListComponent = new EventListView();
  #eventEmptyMessageComponent = null;
  #newEventPresenter = null;

  #eventsModel = null;
  #eventsPresenter = new Map();

  constructor({eventListContainer,tripFiltersContainer, eventsModel, onNewEventDestroy}) {
    this.#eventListContainer = eventListContainer;
    this.#tripFiltersContainer = tripFiltersContainer;
    this.#eventsModel = eventsModel;
    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#newEventPresenter = new NewEventPresenter({
      eventListContainer,
      eventsModel,
      taskListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewEventDestroy,
    });
  }

  init() {
    this.#renderFilter(this.#eventsModel.events);
    this.#renderSort(this.#eventsModel.events);
    this.#renderBoardEvents();
  }

  get events(){
    let eventsData = [];
    eventsData = sortEvents[this.#currentSortType]([...this.#eventsModel.events]);
    eventsData = filterEvents[this.#currentFilterType](eventsData);
    return eventsData;
  }

  createEvent() {
    this.#currentSortType = SortType.DAY;
    this.#currentFilterType = FilterType.EVERYTHING;
    this.#clearEventList();
    this.#renderEvents();
    this.#newEventPresenter.init();
    this.#renderSort(this.events);
    this.#renderFilter(this.events);
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }

  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventsPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEventList();
        this.#renderBoardEvents();
        break;
      case UpdateType.MAJOR:
        this.#renderFilter(this.#eventsModel.events);
        this.#renderSort(this.#eventsModel.events);
        this.#clearEventList();
        this.#renderBoardEvents();
        break;
    }
  };

  #renderBoardEvents(){
    render(this.#eventListComponent, this.#eventListContainer);
    if(this.#eventsModel.events.length === 0){
      this.#renderNoEvents(EventsMessages.EVERYTHING);
      return;
    }
    this.#renderEvents();
  }

  #renderEvents(){
    if(this.#eventEmptyMessageComponent !== null){
      remove(this.#eventEmptyMessageComponent);
    }
    if(this.events.length === 0){
      switch(this.#currentFilterType){
        case FilterType.EVERYTHING: this.#renderNoEvents(EventsMessages.EVERYTHING);
          break;
        case FilterType.FUTURE: this.#renderNoEvents(EventsMessages.FUTURE);
          break;
        case FilterType.PRESENT: this.#renderNoEvents(EventsMessages.PRESENT);
          break;
        case FilterType.PAST: this.#renderNoEvents(EventsMessages.PAST);
          break;
      }
    }
    render(this.#eventListComponent, this.#eventListContainer);
    this.events.forEach((event) => this.#renderEvent(event));
  }

  #renderNoEvents(typeMessage){
    this.#eventEmptyMessageComponent = new ListEmptyView(typeMessage);
    render(this.#eventEmptyMessageComponent, this.#eventListContainer);
  }

  #renderSort(eventsData){
    if(this.#sortComponent !== null){
      remove(this.#sortComponent);
    }
    const eventsSortData = [...eventsData];
    const sorts = generateSort(eventsSortData);
    this.#sortComponent = new SortView({sorts, currentSort: this.#currentSortType, onSortTypeChange: this.#handleSortTypeChange});
    render(this.#sortComponent, this.#eventListContainer,RenderPosition.AFTERBEGIN);
  }

  #renderFilter(eventsData){
    if(this.#filterComponent !== null){
      remove(this.#filterComponent);
    }
    const eventsFilterData = [...eventsData];
    const filters = generateFilters(eventsFilterData);
    this.#filterComponent = new FilterView({filters, currentFilter: this.#currentFilterType, onFilterTypeChange: this.#handleFilterTypeChange});
    render(this.#filterComponent, this.#tripFiltersContainer);
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#eventListComponent.element, eventsModel: this.#eventsModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    eventPresenter.init(event);
    this.#eventsPresenter.set(event.id, eventPresenter);
  }

  #clearEventList(){
    this.#newEventPresenter.destroy();
    this.#eventsPresenter.forEach((presenter) => presenter.destroy());
    this.#eventsPresenter.clear();
  }

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#eventsPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType){
      return;
    }
    this.#currentSortType = sortType;
    this.#clearEventList();
    this.#renderEvents();
  };

  #handleFilterTypeChange = (filterType) =>{
    if(this.#currentFilterType === filterType){
      return;
    }
    this.#currentSortType = SortType.DAY;
    this.#currentFilterType = filterType;
    this.#renderSort(this.events);
    this.#clearEventList();
    this.#renderEvents();
  };
}
