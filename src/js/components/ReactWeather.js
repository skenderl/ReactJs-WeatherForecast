import React from 'react';
import OpenWeatherApi from '../OpenWeatherApi';
import utils from '../utils';
import TodayForecast from './TodayForecast';
import DaysForecast from './DaysForecast';
import WeatherIcon from './WeatherIcon';
import '../../css/components/ReactWeather.css';

const defaultProps = {
  unit: 'metric',
  forecast: '5days',
  lang: 'en',
};

class ReactWeather extends React.Component {
  constructor(props) {
    super(props);
    this.api = new OpenWeatherApi(props.unit, props.apikey, props.lang);
    this.state = {
      data: null,
      selectedDay: null,
    };
  }
  chooseDay = (i) => {// OnDayClick fucntion
    this.setState({
      selectedDay: i
    });
  }
  render() {
    const { unit, forecast, lang } = this.props;
    const data = this.state.data;
    let selectedDay = this.state.selectedDay;
    const langs = utils.getLangs(lang);
    if (data && data.days) {//If data is returned
      const days = data.days;//Days from data
      const today = days[0];
      const oneDay = utils.groupBy('day', days)[selectedDay];//Selected day list of data
      const otherDays = days.filter(n => !oneDay.includes(n));//All data minus the selected day data
      const todayIcon = utils.getIcon(today.icon);
      return (
        <div>
          <div className="rw-box">
            <div className={`rw-main type-${forecast}`}>
              <div className="rw-box-left">
                <h2>{langs.Today} : {data.location.name}</h2>
                <TodayForecast todayData={today} unit={unit} lang={lang} />
              </div>
              <div className="rw-box-right">
                <WeatherIcon name={todayIcon} />
              </div>
            </div>
            <div className="rw-title">
              <h2>{langs.ByDays}</h2>
            </div>
            <DaysForecast
              unit={unit}
              forecast={'5days'}
              daysData={utils.getNextDays(otherDays)}
              lang={lang}
              onClick={this.chooseDay}
            />
            <div className="rw-title">
              <h2>{langs.ByHours} ({utils.getDayOfWeek(oneDay[0].day, langs.DaysWeek)})</h2>
            </div>
            <DaysForecast
              unit={unit}
              forecast={'1day'}
              daysData={oneDay}
              lang={lang}
            />
          </div>
        </div>
      );
    }
    return <div>Loading...</div>;
  }
  componentDidMount() {
    this.getForecastData();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.city !== this.props.city || prevProps.lang !== this.props.lang) {
      this.getForecastData();
    }
  }
  getForecastData() {//Get component data from API
    const params = this._getParams();
    let promise = null;
    promise = this.api.getForecast(params);//API call
    promise.then(data => {
      this.setState({
        data,
        selectedDay: data.days ? data.days[0].day : null,//First day
      });
    });
  }
  _getParams() {//Get component's city & language
    const { city, lang } = this.props;
    return { q: city, lang };
  }
}

ReactWeather.defaultProps = defaultProps;

export default ReactWeather;
