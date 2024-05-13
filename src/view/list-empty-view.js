import AbstractView from '../framework/view/abstract-view.js';


const CreateListEmptyViewTemplate = (typeMessage) =>{
  let messageListEmpty = '';
  console.log(typeMessage);
  switch (typeMessage) {
    case 'everything':
      messageListEmpty = 'Click New Event to create your first point';
      break;
    case 'past':
      messageListEmpty = 'There are no past events now';
      break;
    case 'present':
      messageListEmpty = 'There are no present events now';
      break;
    case 'future':
      messageListEmpty = 'There are no future events now';
      break;
  }
  return`<section class="trip-events">
<h2 class="visually-hidden">Trip events</h2>
<p class="trip-events__msg">${messageListEmpty}</p>
</section>`;
};
// <!--
//   Значение отображаемого текста зависит от выбранного фильтра:
//     * Everthing – 'Click New Event to create your first point'
//     * Past — 'There are no past events now';
//     * Present — 'There are no present events now';
//     * Future — 'There are no future events now'.
// -->

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
