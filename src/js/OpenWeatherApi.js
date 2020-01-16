import utils from './utils';

export default class OpenWeatherApi {
  constructor(unit, apiKey, lang) {
    this.unit = unit;
    this.apiKey = apiKey;
    this.baseApiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    this.lang = lang;
  }
  parseJSON(response) {
    return new Promise((resolve) => response.json()
      .then((json) => resolve({
        status: response.status,
        ok: response.ok,
        json,
      })));
  }
  getForecast(args) {
    const url = new URL(this.baseApiUrl);

    const params = Object.assign( //Request Params
      {
        appid: this.apiKey,
        lang: this.lang,
        units: this.unit,
      },
      args
    );

    url.search = new URLSearchParams(params).toString();

    const promiseFetch = fetch(url) // GET method
      .then(this.parseJSON)
      .then((response) => {
        if (response.ok) {
          return response.json;
        }
        throw response.json;
      })
      .then((data) => {
        if (data) {
          return this._map(data);
        }
        return {};
      })
      .catch((error) => {
        return {};
      });

    return promiseFetch;
  }
  _map(forecastData) {// Response mapping function
    const daysData = forecastData.list;
    const mapped = {};
    const langs = utils.getLangs(this.lang);
    mapped.location = forecastData.city;
    mapped.days = daysData.map(item => ({
      date: utils.formatDate(item.dt, langs.Months),
      day: item.dt_txt.split(" ")[0],
      description: item.weather[0] ? utils.capitalizeLetters(item.weather[0].description) : null,
      icon: item.weather[0] ? item.weather[0].icon : null,
      temperature: {
        min: item.main.temp_min.toFixed(0),
        max: item.main.temp_max.toFixed(0),
        current: item.main.temp.toFixed(0),
      },
      wind: {
        speed: item.wind.speed.toFixed(0),
        deg: item.wind.deg.toFixed(0),
      },
      humidity: item.main.humidity,
      pressure: item.main.pressure,
      precipitation: item.rain !== undefined ? item.rain["3h"].toFixed(2) : 0.00,
    }));
    return mapped;
  }
}
