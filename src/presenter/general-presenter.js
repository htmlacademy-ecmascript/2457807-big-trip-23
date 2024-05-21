import {render} from '../framework/render.js';
import { EventsMessages, SortType } from '../constants.js';
import EventPresenter from './event-presenter.js';

import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import FilterView from '../view/filter-view.js';

import { generateFilters } from '../utils/filtr-event.js';
import { generateSort, sortEvents } from '../utils/sort-events.js';
import { updateItem } from '../utils/common.js';

export default class GeneralPresenter {
  #eventListContainer = null;
  #tripFiltersContainer = null;
  
  #sortComponent = null;
  #currentSortType = SortType.DAY;
  #sourceBoardTask = [];  
  #eventListComponent = new EventListView();
  
  #eventsModel = null;
  #boardEvents = [];
  #eventsPresenter = new Map();

  constructor({eventListContainer,tripFiltersContainer, eventsModel,}) {
    this.#eventListContainer = eventListContainer;
    this.#tripFiltersContainer = tripFiltersContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#boardEvents = [...this.#eventsModel.events];
    this.#sourceBoardTask = [...this.#eventsModel.events];
    this.#renderFilter(this.#boardEvents);
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
    this.#sortComponent = new SortView({sorts, onSortTypeChange: this.#handleSortTypeChange});
    render(this.#sortComponent, this.#eventListContainer);
  }

  #sortEvents(sortType){
    sortEvents[sortType](this.#boardEvents);
    this.#currentSortType = sortType;
  }

  #renderFilter(eventsData){
    // const eventsDataFilter = eventsData;
    const filters = generateFilters(eventsData);
    const filterComponent = new FilterView({filters});
    render(filterComponent, this.#tripFiltersContainer);
    document.querySelector('.trip-filters')
      .addEventListener('change', filterEvent);

    function filterEvent(evt){
      if(evt.target.value !== undefined){
        // const eventsFilter = filterEvents[String(evt.target.value)](eventsDataFilter);
      }
    }
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
    this.#sortEvents(sortType);
    this.#clearEventList();
    this.#renderEvents();
  };
}
