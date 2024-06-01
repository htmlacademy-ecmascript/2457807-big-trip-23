import ApiService from './framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class EventsApiService extends ApiService {
  get events() {
    return this._load({url: 'big-trip/points'})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'big-trip/destinations'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'big-trip/offers'})
      .then(ApiService.parseResponse);
  }

  async updateEvent(event) {
    const response = await this._load({
      url: `big-trip/points/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addEvent(event) {
    const response = await this._load({
      url: 'big-trip/points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deleteEvent(event) {
    const response = await this._load({
      url: `big-trip/points/${event.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  #adaptToServer(event) {
    const adaptedEvent = {...event,
      'base_price': event.base_price,
      'is_favorite': event.isFavorite,
      'date_from': event.dateFrom instanceof Date ? event.dateFrom.toISOString() : null,
      'date_to': event.dateTo instanceof Date ? event.dateTo.toISOString() : null,
    };

    delete adaptedEvent.basePrice;
    delete adaptedEvent.isFavorite;
    delete adaptedEvent.dateFrom;
    delete adaptedEvent.dateTo;

    return adaptedEvent;
  }
}
