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

  async updateTask(event) {
    const response = await this._load({
      url: `big-trip/points/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(event),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }
}
