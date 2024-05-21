import AbstractView from '../framework/view/abstract-view.js';

const createSortItemTemplate = (sort, isChecked) => {
  const {type, count} = sort;
  return`<div class="trip-sort__item  trip-sort__item--${type}">
  <input id="sort-${type}" class="trip-sort__input  visually-hidden" data-sort-type = ${type}
   type="radio" name="trip-sort" value="sort-${type}" ${isChecked ? 'checked' : ''} ${(count === 0 || type === 'offers' || type === 'event')? 'disabled' : '' }>
  <label class="trip-sort__btn" for="sort-${type}" >${type}</label>
</div>`;
};

const createSortViewTemplate = (sorts) => {
  const sortItemsTemplate = sorts.map((sort, index) => createSortItemTemplate(sort, index === 0)).join('');
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
${sortItemsTemplate}
</form>`;
};

export default class SortView extends AbstractView{
  #sorts = null;
  #handleSortTypeChange = null;
  constructor({sorts, onSortTypeChange}) {
    super();
    this.#sorts = sorts;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortViewTemplate(this.#sorts);
  }

  #sortTypeChangeHandler = (evt) => {
    if(evt.target.tagName !== 'INPUT'){
      return;
    }
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
