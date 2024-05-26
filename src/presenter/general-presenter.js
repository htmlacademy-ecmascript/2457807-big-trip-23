import {render, remove} from '../framework/render.js';
import { EventsMessages, FilterType, SortType } from '../constants.js';
import EventPresenter from './event-presenter.js';

import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import FilterView from '../view/filter-view.js';

import { generateFilters, filterEvents } from '../utils/filter-event.js';
import { generateSort, sortEvents } from '../utils/sort-events.js';
import { updateItem } from '../utils/common.js';

export default class GeneralPresenter {
  #eventListContainer = null;
  #tripFiltersContainer = null;

  #sortComponent = null;
  #currentSortType = SortType.DAY;
  #filterComponent = null;
  #currentFilterType = FilterType.EVERYTHING;
  #sourceBoardTask = [];
  #eventListComponent = new EventListView();
  #eventEmptyMessageComponent = null;
  #generalPresenter = new Map();

  #eventsModel = null;
  #boardEvents = [];
  #eventsPresenter = new Map();

  constructor({eventListContainer,tripFiltersContainer, eventsModel,}) {
    this.#eventListContainer = eventListContainer;
    this.#tripFiltersContainer = tripFiltersContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    // this.#boardEvents = [...this.#eventsModel.events];
    this.#sourceBoardTask = [...this.#eventsModel.events];
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
        case 'everything': this.#renderNoEvents(EventsMessages.EVERYTHING);
          break;
        case 'future': this.#renderNoEvents(EventsMessages.FUTURE);
          break;
        case 'present': this.#renderNoEvents(EventsMessages.PRESENT);
          break;
        case 'past': this.#renderNoEvents(EventsMessages.PAST);
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
    this.#sortComponent = new SortView({sorts, onSortTypeChange: this.#handleSortTypeChange});
    render(this.#sortComponent, this.#eventListContainer);
  }

  #renderFilter(eventsData){
    const eventsFilterData = [...eventsData];
    const filters = generateFilters(eventsFilterData);
    this.#filterComponent = new FilterView({filters, onFilterTypeChange: this.#handleFilterTypeChange});
    render(this.#filterComponent, this.#tripFiltersContainer);
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#eventListComponent.element, eventsModel: this.#eventsModel,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange,
    });
    eventPresenter.init(event);
    this.#eventsPresenter.set(event.id, eventPresenter);
  }

  #clearEventList(){
    this.#eventsPresenter.forEach((presenter) => presenter.destroy());
    this.#eventsPresenter.clear();
  }

  #handleEventChange = (updateEvent) => {
    this.#boardEvents = updateItem(this.#boardEvents, updateEvent);
    this.#sourceBoardTask = updateItem(this.#sourceBoardTask, updateEvent);
    this.#eventsPresenter.get(updateEvent.id).init(updateEvent);
  };

  #handleModeChange = () => {
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

  #handleTaskChange = (updateEvent) =>{
    this.#generalPresenter.get(updateEvent.id).init(updateEvent);
  };

}
