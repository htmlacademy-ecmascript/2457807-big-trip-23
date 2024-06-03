import AbstractView from '../framework/view/abstract-view.js';


const createListEmptyViewTemplate = (typeMessage) =>`<section class="trip-events">
<h2 class="visually-hidden">Trip events</h2>
<p class="trip-events__msg">${typeMessage}</p>
</section>`;

export default class ListEmptyView extends AbstractView{
  #typeMessage = null;
  constructor(typeMessage){
    super();
    this.#typeMessage = typeMessage;
  }

  get template() {
    return createListEmptyViewTemplate(this.#typeMessage);
  }
}
