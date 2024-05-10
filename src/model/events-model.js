import { getRandomEvent } from '../mock/events';
import { getDestinations } from '../mock/destinations';
import { getOffers } from '../mock/offers';
const EVENTS_NUMBER = 4;

export default class EventsModel{
  events = Array.from({length: EVENTS_NUMBER}, getRandomEvent);
  destinations = getDestinations();
  offers = getOffers();

  getEvents(){
    return this.events;
  }

  getDestinations(){
    return this.destinations;
  }

  getOffers(){
    return this.offers;
  }

  getOffersByType(type){
    const offers = this.getOffers();
    return offers.find((offer) => offer.type === type);
  }

  getOffersById(type, idOffersItem){
    const offersType = this.getOffersById(type);
    return offersType.offers.find((offer) => offer.id === idOffersItem);
  }

  getDestinationById(id){
    const destinations = this.getDestinations();
    return destinations.id.find((destination) => destination.id === id);
  }


}
