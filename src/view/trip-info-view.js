import AbstractView from '../framework/view/abstract-view.js';
import { formatTime, formatDateForm, formatDateTripInfo } from '../utils/utils.js';

const CreateTripInfoViewTemplate = (total, tripTitle, tripInfoTime) =>{
  const [fistCity, secondCity,] = tripTitle;
  const endCity = tripTitle[tripTitle.length - 1];
  const [dateStart, dateEnd] = tripInfoTime;
  
  return `<div class="trip-main">
<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">
    ${tripTitle.length > 0 ? fistCity : ''} 
    ${tripTitle.length !== 3 ? ( tripTitle.length > 3 ? ' &mdash;' + ' . . . ' + ' &mdash; '   : '&mdash;') : ' &mdash; ' + secondCity + ' &mdash; '} 
    ${tripTitle.length > 0 ?  endCity : ''}</h1>

    <p class="trip-info__dates">${formatDateTripInfo(dateStart)}&nbsp;&mdash;&nbsp;${formatDateTripInfo(dateEnd)}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
  </p>
</section>`};


export default class TripInfoView extends AbstractView{
  #totalCount = null;
  #tripInfo = null;
  #tripInfoTime = null;
  constructor (totalCount, tripInfo, tripInfoTime) {
    super();
    this.#totalCount = totalCount;
    this.#tripInfo = tripInfo;
    this.#tripInfoTime = tripInfoTime;
  }

  get template() {
    return CreateTripInfoViewTemplate(this.#totalCount, this.#tripInfo, this.#tripInfoTime);
  }
}
