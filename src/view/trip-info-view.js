import AbstractView from '../framework/view/abstract-view.js';

const CreateTripInfoViewTemplate = (total) =>`<div class="trip-main">
<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

    <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
  </p>
</section>`;


export default class TripInfoView extends AbstractView{
  #totalCount = null;
  constructor (totalCount) {
    super();
    this.#totalCount = totalCount;

  }

  get template() {
    return CreateTripInfoViewTemplate(this.#totalCount);
  }
}
