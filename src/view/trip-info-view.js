import AbstractView from '../framework/view/abstract-view.js';
import { formatDateTripInfo } from '../utils/date.js';

const createTripInfoViewTemplate = (total, tripTitle, tripInfoTime) =>{
  const [firstCity, secondCity,] = tripTitle;
  let endCity = tripTitle[tripTitle.length - 1];
  const [dateStart, dateEnd] = tripInfoTime;
  if(tripTitle.length === 1) {
    endCity = '';
  }
  let intermediateCityTripInfo = null;
  if(tripTitle.length > 3){
    intermediateCityTripInfo = ' &mdash; . . .  &mdash; ';
  }else if(tripTitle.length === 3){
    intermediateCityTripInfo = ` &mdash; ${ secondCity } &mdash; `;
  }else if(tripTitle.length === 2){
    intermediateCityTripInfo = ' &mdash;';
  }else{
    intermediateCityTripInfo = '';
  }
  return `<div class="trip-main">
<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">
    ${tripTitle.length > 0 ? firstCity : ''}
   ${intermediateCityTripInfo}
    ${tripTitle.length > 1 ? endCity : ''}</h1>

    <p class="trip-info__dates">${dateStart !== '' ? `${formatDateTripInfo(dateStart)}&nbsp;&mdash;&nbsp;` : ''}
    ${dateStart !== '' ? formatDateTripInfo(dateEnd) : ''}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
  </p>
</section>`;
};


export default class TripInfoView extends AbstractView{
  #totalCount = null;
  #tripInfo = null;
  #tripInfoTime = null;
  constructor (eventsModel) {
    super();
    this.#totalCount = eventsModel.getTotalCostTrip();
    this.#tripInfo = eventsModel.getTripInfo();
    this.#tripInfoTime = eventsModel.getTripTime();
  }

  changeTripInfo(eventsModel){
    this.#totalCount = eventsModel.getTotalCostTrip();
    this.#tripInfo = eventsModel.getTripInfo();
    this.#tripInfoTime = eventsModel.getTripTime();
  }

  get template() {
    return createTripInfoViewTemplate(this.#totalCount, this.#tripInfo, this.#tripInfoTime);
  }
}
