import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter, isChecked, currentFilter) => {
  const {type, count} = filter;
  return`<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input visually-hidden"
      data-filter-type = ${type} type="radio" name="trip-filter"
         value="${type}" ${currentFilter === type ? 'checked' : ''} ${(count === 0) ? 'disabled' : '' }>
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`;
};

const createFilterViewTemplate = (filters, currentFilter) => {
  const filterItemsTemplate = filters.map((filter, index) => createFilterItemTemplate(filter, index === 0, currentFilter)).join('');
  return (`<form class="trip-filters" action="#" method="get">
${filterItemsTemplate}
<button class="visually-hidden" type="submit">Accept filter</button>
</form>`
  );
};

export default class FilterView extends AbstractView{
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;
  constructor({filters, currentFilter, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#handleFilterTypeChange = onFilterTypeChange;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterViewTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    if(evt.target.tagName !== 'INPUT'){
      return;
    }
    this.#handleFilterTypeChange(evt.target.dataset.filterType);
  };
}
