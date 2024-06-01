import AbstractView from '../framework/view/abstract-view.js';


const CreateListEmptyViewTemplate = (typeMessage) =>`<section class="trip-events">
<h2 class="visually-hidden">Trip events</h2>
<p class="trip-events__msg">${typeMessage}</p>
</section>`;

export default class LoadingView extends AbstractView{
  #typeMessage = null;
  constructor(typeMessage){
    super();
    this.#typeMessage = typeMessage;
  }

  get template() {
    return CreateListEmptyViewTemplate(this.#typeMessage);
  }
}
