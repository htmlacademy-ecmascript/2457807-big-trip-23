import { render, RenderPosition} from './framework/render.js';
import NewEventButtonView from './View/new-event-button-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import EventListPresenter from './presenter/event-list-presenter.js';
import EventsModel from './model/events-model';


const tripMainSection = document.querySelector('.trip-main');
const tripFilters = tripMainSection.querySelector('.trip-controls__filters');
const tripEventSection = document.querySelector('.trip-events');
const eventsModel = new EventsModel();
const eventListPresenter = new EventListPresenter({eventListContainer: tripEventSection, eventsModel});


render(new FilterView(), tripFilters, RenderPosition.BEFOREEND);
render(new NewEventButtonView(), tripMainSection, RenderPosition.BEFOREEND);

render(new SortView(), tripEventSection, RenderPosition.BEFOREEND);
eventListPresenter.init();
