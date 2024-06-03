import { remove, render, RenderPosition} from './framework/render.js';
import { AUTHORIZATION, END_POINT } from './constants.js';
import NewEventButtonView from './view/new-event-button-view.js';
import TripInfoView from './view/trip-info-view.js';
import GeneralPresenter from './presenter/general-presenter.js';
import EventsModel from './model/events-model.js';
import EventsApiService from './events-api-service.js';


const tripMainSection = document.querySelector('.trip-main');

const tripFilters = tripMainSection.querySelector('.trip-controls__filters');
const tripEventSection = document.querySelector('.trip-events');
const eventsModel = new EventsModel({eventsApiService: new EventsApiService(END_POINT, AUTHORIZATION)});
const generalPresenter = new GeneralPresenter({eventListContainer: tripEventSection,
  tripFiltersContainer: tripFilters, eventsModel, onNewEventDestroy: handleNewEventFormClose});
const newEventButtonComponent = new NewEventButtonView({
  onNewEventClick: handleNewEventButtonClick,
});

let tripInfoComponent = new TripInfoView(eventsModel);

function handleNewEventButtonClick(){
  generalPresenter.createEvent();
  newEventButtonComponent.element.disabled = true;
}

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

const handleModelEventTripInfo = () =>{
  remove(tripInfoComponent);
  tripInfoComponent = new TripInfoView(eventsModel);
  render(tripInfoComponent, tripMainSection, RenderPosition.AFTERBEGIN);
};
eventsModel.init()
  .finally(() => {
    render(newEventButtonComponent, tripMainSection, RenderPosition.BEFOREEND);
    if(eventsModel.isServerUnavailable) {
      newEventButtonComponent.element.disabled = true;
      remove(tripInfoComponent);
    }
  });
eventsModel.addObserver(handleModelEventTripInfo);
render(tripInfoComponent, tripMainSection, RenderPosition.AFTERBEGIN);
generalPresenter.init();

