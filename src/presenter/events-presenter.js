import {remove, render, replace} from '../framework/render.js';
import EventListView from '../view/event-list-view.js';
import FormEventView from '../view/form-event-view.js';

export default class EventPresenter{
  #eventComponent = null;
  #eventFormComponent = null;
  #eventListContainer = null;

  #event = null;

  constructor({eventListContainer}){
    this.#eventListContainer = eventListContainer;
  }

}
