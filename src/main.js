import NewEventButtonView from './view/new-event-button-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import { render, RenderPosition } from './render.js';
import EventListPresenter from './presenter/event-list-presenter.js';


const tripMainSection = document.querySelector('.trip-main');
const tripFilters = tripMainSection.querySelector('.trip-controls__filters');
const tripEventSection = document.querySelector('.trip-events');
const eventListPresenter = new EventListPresenter({eventListContainer: tripEventSection});

render(new FilterView(), tripFilters, RenderPosition.BEFOREEND);
render(new NewEventButtonView(), tripMainSection, RenderPosition.BEFOREEND);

render(new SortView(), tripEventSection, RenderPosition.BEFOREEND);
eventListPresenter.init();
