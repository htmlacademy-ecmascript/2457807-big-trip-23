import { getRandomEvent } from '../mock/events';
import { getDestinations } from '../mock/destinations';
import { getOffers } from '../mock/offers';
import { sortEvents } from '../utils/sort-events';

const EVENTS_NUMBER = 10;

export default class EventsModel{
  #eventsModel = Array.from({length: EVENTS_NUMBER}, getRandomEvent);
  #destinations = getDestinations();
  #offers = getOffers();


  get events(){
    return sortEvents['day'](this.#eventsModel);
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
    const costTripWithoutOffers = this.#eventsModel.reduce((total, eventTrip) => total + eventTrip.basePrice , 0);
    let costOffersAllEvents = 0;
    this.#eventsModel.forEach((eventTrip) => {
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
    const sortDestinationsEvents = [...sortEvents['day'](this.#eventsModel)];
    const uniqueIdDestinations = [... new Set(sortDestinationsEvents.map((item) =>item.destination))];
    const destinations = getDestinations();
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
    const dateStart = sortEvents['day'](this.#eventsModel)[this.#eventsModel.length - 1]?.dateFrom;
    const getDateEnd = () => this.#eventsModel.sort((a, b) => new Date(b.dateTo) - new Date(a.dateTo));
    if(this.#eventsModel.length === 0){
      return ['' , ''];
    }
    const dateEnd = getDateEnd().map((item) =>item.dateTo)[0];
    return [dateStart, dateEnd] || ['', ''];
  }
}
