import { getRandomEvent } from '../mock/events.js';
import { getDestinations } from '../mock/destinations.js';
import { getOffers } from '../mock/offers.js';
import { sortEvents } from '../utils/sort-events.js';
import { SortType } from '../constants.js';

const EVENTS_NUMBER = 3;

export default class EventsModel{
  #events = Array.from({length: EVENTS_NUMBER}, getRandomEvent);
  #destinations = getDestinations();
  #offers = getOffers();

  get events(){
    return sortEvents[SortType.DAY](this.#events);
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

  getTotalCostTrip(){
    const costTripWithoutOffers = this.#events.reduce((total, eventTrip) => total + eventTrip.basePrice , 0);
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
    const uniqueIdDestinations = [... new Set(sortDestinationsEvents.map((item) =>item.destination))];
    const destinations = this.#destinations;
    let uniqueDestinationNames = [];
    const nameTripCity = () => uniqueIdDestinations.forEach((uniqueIdDestination) =>{
      destinations.forEach((destination) =>{
        if(destination.id === uniqueIdDestination){
          uniqueDestinationNames.push(destination);
        }
      });
    });
    nameTripCity();
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
