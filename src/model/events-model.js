import { sortEvents } from '../utils/sort-events.js';
import { SortType } from '../constants.js';
import Observable from '../framework/observable.js';
import { UpdateType } from '../constants.js';

export default class EventsModel extends Observable{
  #events = [];
  #destinations = [];
  #offers = [];
  #eventsApiService = null;
  constructor ({eventsApiService}) {
    super();
    this.#eventsApiService = eventsApiService;
  }

  async init (){
    try {
      const events = await this.#eventsApiService.events;
      this.#events = events.map(this.#adaptToClient);
      this.#destinations = await this.#eventsApiService.destinations;
      this.#offers = await this.#eventsApiService.offers;
    } catch(err) {
      this.#events = [];
      this.#destinations = [];
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
  }

  get events(){
    return this.#events;
  }

  get destinations(){
    return this.#destinations;
  }

  get offers(){
    return this.#offers;
  }

  getOffersByType(type){
    const offers = this.offers;
    return offers.find((offer) => offer.type === type);
  }

  getArrayOffersById(type, idOffersItem){
    const offersType = this.getOffersByType(type);
    return offersType.offers.find((offer) => offer.id === idOffersItem);
  }

  getDestinationById(id){
    const destinations = this.destinations;
    return destinations.find((destination) => destination.id === id);
  }

  async updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }
    try{
      const response = await this.#eventsApiService.updateEvent(update);
      const updateEvent = this.#adaptToClient(response);
      this.#events = [
        ...this.#events.slice(0, index),
        updateEvent,
        ...this.#events.slice(index + 1),
      ];
      this._notify(updateType, update);
    } catch(err){
      throw new Error('Can\'t update event');
    }
  }

  async addEvent(updateType, update) {
    try{
      const response = await this.#eventsApiService.addEvent(update);
      const addEvent = this.#adaptToClient(response);
      this.#events = [
        addEvent,
        ...this.#events,
      ];
      this._notify(updateType, update);
    }catch(err){
      throw new Error('Can\'t add unexisting event');
    }
  }

  async deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }
    try{
      await this.#eventsApiService.deleteEvent(update);
      this.#events = [
        ...this.#events.slice(0, index),
        ...this.#events.slice(index + 1),
      ];
      this._notify(updateType);
    }catch(err){
      throw new Error('Can\'t delete unexisting event');
    }
  }

  #adaptToClient(event) {
    const adaptedEvent = {...event,
      basePrice: event['base_price'],
      dateFrom:event['date_from'] !== null ? new Date(event['date_from']) : event['date_from'],
      dateTo: event['date_to'] !== null ? new Date(event['date_to']) : event['date_to'],
      isFavorite: event['is_favorite'],
    };

    delete adaptedEvent['base_price'];
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
  }

  getTotalCostTrip(){
    const costTripWithoutOffers = this.#events.reduce((total, eventTrip) => total + Number(eventTrip.basePrice) , 0);
    let costOffersAllEvents = 0;
    this.#events.forEach((eventTrip) => {
      if(eventTrip.offers.length !== 0){
        const offersTrip = this.getOffersByType(eventTrip.type);
        offersTrip.offers.forEach((offerTrip) => {
          if(offerTrip.length !== 0 && eventTrip.offers.includes(offerTrip.id)){
            costOffersAllEvents += offerTrip.price;
          }
        });
      }
    });
    return costTripWithoutOffers + costOffersAllEvents;
  }

  getTripInfo(){
    const sortDestinationsEvents = [...sortEvents[SortType.DAY](this.#events)];
    const uniqueIdDestinations = [... sortDestinationsEvents.map((item) =>item.destination)];
    const destinations = this.#destinations;
    let uniqueDestinationNames = [];
    uniqueIdDestinations.forEach((uniqueIdDestination) =>{
      destinations.forEach((destination) =>{
        if(destination.id === uniqueIdDestination){
          uniqueDestinationNames.push(destination);
        }
      });
    });
    uniqueDestinationNames = uniqueDestinationNames.map((item) => item.name);
    return uniqueDestinationNames || '';
  }

  getTripTime(){
    if(this.#events.length === 0){
      return ['' , ''];
    }
    const dateStart = sortEvents[SortType.DAY](this.#events)[0]?.dateFrom;
    const getDateEnd = () => this.#events.sort((a, b) => new Date(b.dateTo) - new Date(a.dateTo));
    const dateEnd = getDateEnd().map((item) =>item.dateTo)[0];
    return [dateStart, dateEnd] || ['', ''];
  }
}
