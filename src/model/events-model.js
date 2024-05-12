import { getRandomEvent } from '../mock/events';
import { getDestinations } from '../mock/destinations';
import { getOffers } from '../mock/offers';
const EVENTS_NUMBER = 4;

export default class EventsModel{
  #events = Array.from({length: EVENTS_NUMBER}, getRandomEvent);
  #destinations = getDestinations();
  #offers = getOffers();


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
}
