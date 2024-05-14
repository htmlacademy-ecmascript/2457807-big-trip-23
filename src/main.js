import { render, RenderPosition} from './framework/render.js';
import NewEventButtonView from './View/new-event-button-view';
import FilterView from './view/filter-view.js';
import TripInfoView from './view/trip-info-view.js';


import EventListPresenter from './presenter/event-list-presenter.js';
import EventsModel from './model/events-model';


const tripMainSection = document.querySelector('.trip-main');
const tripFilters = tripMainSection.querySelector('.trip-controls__filters');
const tripEventSection = document.querySelector('.trip-events');
const eventsModel = new EventsModel();
const eventListPresenter = new EventListPresenter({eventListContainer: tripEventSection, eventsModel});

const totalCount = eventsModel.getTotalCostTrip();

render(new TripInfoView(totalCount), tripMainSection, RenderPosition.AFTERBEGIN);
render(new NewEventButtonView(), tripMainSection, RenderPosition.BEFOREEND);
render(new FilterView(), tripFilters);

eventListPresenter.init();
