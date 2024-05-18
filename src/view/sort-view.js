import AbstractView from '../framework/view/abstract-view.js';

const createSortItemTemplate = (sort, isChecked) => {  
  const {type, count} = sort;
  return`<div class="trip-sort__item  trip-sort__item--${type}">
  <input id="sort-${type}" class="trip-sort__input  visually-hidden"
   type="radio" name="trip-sort" value="sort-${sort}" ${isChecked ? 'checked' : ''} ${count === 0 ? 'disabled' : '' }>
  <label class="trip-sort__btn" for="sort-${type}">${type}</label>
</div>`;
};

const createFilterViewTemplate = (sorts) => {
  const sortItemsTemplate = sorts.map((sort, index) => createSortItemTemplate(sort, index === 0)).join('');
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
${sortItemsTemplate}
</form>`;
};

export default class SortView extends AbstractView{
  #sorts = null;
  // #handleEditClick = null;
  constructor({sorts} = 'sort') {
    super();
    this.#sorts = sorts;
    // this.#handleEditClick = onEditClick;
    // this.element.querySelector('.trip-filters')
    //   .addEventListener('click', this.#editClickHandler,);
  }

  get template() {
    return createFilterViewTemplate(this.#sorts);
  }

  // #editClickHandler = (evt) => {
  //   evt.preventDefault();
  //   this.#handleEditClick();
  // };
}
