import AbstractView from '../framework/view/abstract-view.js';
import { FILTER_TYPES } from '../constants.js';

const createFilterItemTemplate = (type) => `
<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" checked>
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`;

const createFilterViewTemplate = () => `
<form class="trip-filters" action="#" method="get">
${FILTER_TYPES.map((type) => createFilterItemTemplate(type)).join('')}               
<button class="visually-hidden" type="submit">Accept filter</button>
</form>`;

export default class FilterView extends AbstractView{
  // #eventData = null;
  // #handleEditClick = null;
  // constructor({eventData, onEditClick}) {
  //   super();
  //   this.#eventData = eventData;
  //   this.#handleEditClick = onEditClick;
  //   this.element.querySelector('.trip-filters')
  //     .addEventListener('click', this.#editClickHandler,);
  // }

  get template() {
    return createFilterViewTemplate();
  }

  // #editClickHandler = (evt) => {
  //   evt.preventDefault();
  //   this.#handleEditClick();
  // };
}
