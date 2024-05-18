import AbstractView from '../framework/view/abstract-view.js';

const CreateTripInfoViewTemplate = (total, tripTitle) =>{
  console.log(tripTitle);
  return `<div class="trip-main">
<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">
    ${tripTitle.length > 0 ? tripTitle[0] : ''} 
    ${tripTitle.length !== 3 ? ( tripTitle.length > 3 ? ' &mdash;' + ' . . . ' + ' &mdash; '   : '&mdash;') : ' &mdash; ' + tripTitle[1] + ' &mdash; '} 
    ${tripTitle.length > 0 ?  tripTitle[tripTitle.length-1] : ''}</h1>

    <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
  </p>
</section>`};


export default class TripInfoView extends AbstractView{
  #totalCount = null;
  #tripInfo = null;
  constructor (totalCount, tripInfo) {
    super();
    this.#totalCount = totalCount;
    this.#tripInfo = tripInfo;
  }

  get template() {
    return CreateTripInfoViewTemplate(this.#totalCount, this.#tripInfo);
  }
}
