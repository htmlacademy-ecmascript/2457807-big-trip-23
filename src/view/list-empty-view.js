import AbstractView from '../framework/view/abstract-view.js';


const CreateListEmptyViewTemplate = (typeMessage) =>`<section class="trip-events">
<h2 class="visually-hidden">Trip events</h2>
<p class="trip-events__msg">${typeMessage}</p>
</section>`;
//   Значение отображаемого текста зависит от выбранного фильтра:
//     * Everthing – 'Click New Event to create your first point'
//     * Past — 'There are no past events now';
//     * Present — 'There are no present events now';
//     * Future — 'There are no future events now'.

export default class ListEmptyView extends AbstractView{
  #typeMessage = null;
  constructor(typeMessage){
    super();
    this.#typeMessage = typeMessage;
  }

  get template() {
    return CreateListEmptyViewTemplate(this.#typeMessage);
  }
}
