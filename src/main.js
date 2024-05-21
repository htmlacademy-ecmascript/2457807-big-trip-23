import { render, RenderPosition} from './framework/render.js';
import NewEventButtonView from './view/new-event-button-view.js';
import TripInfoView from './view/trip-info-view.js';
import GeneralPresenter from './presenter/general-presenter.js';
import EventsModel from './model/events-model.js';

const tripMainSection = document.querySelector('.trip-main');
const tripFilters = tripMainSection.querySelector('.trip-controls__filters');
const tripEventSection = document.querySelector('.trip-events');
const eventsModel = new EventsModel();
const generalPresenter = new GeneralPresenter({eventListContainer: tripEventSection, tripFiltersContainer: tripFilters, eventsModel});

const totalCount = eventsModel.getTotalCostTrip();
const tripInfo = eventsModel.getTripInfo();
const tripInfoTime = eventsModel.getTripTime();

render(new TripInfoView(totalCount,tripInfo, tripInfoTime), tripMainSection, RenderPosition.AFTERBEGIN);
render(new NewEventButtonView(), tripMainSection, RenderPosition.BEFOREEND);
generalPresenter.init();

