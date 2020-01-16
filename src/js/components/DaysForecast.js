import React from 'react';
import utils from '../utils';
import WeatherIcon from './WeatherIcon';
import '../../css/components/DaysForecast.css';
import Slider from "react-slick";

const DaysForecast = (props) => {//Component for days and hours forecast data
  const { forecast, unit, daysData, onClick, lang } = props;
  const units = utils.getUnits(unit);
  const langs = utils.getLangs(lang);
  var settings = {//Slider settings
    swipe: false,
    infinite: false,
    className: "rw-box-days"
  };

  if (forecast === '5days') {//Five days forecast Slider (by days)
    settings.slidesToShow = 4;
    return (
      <Slider {...settings}>
        {
          daysData.map((day, i) => {//Data mapping function
            const iconCls = utils.getIcon(day.icon);
            return (
              <div key={`day-${i}`} className='rw-day rw-selectable' onClick={() => onClick(day.day)}>
                <div className="rw-day-week">{utils.getDayOfWeek(day.day, langs.DaysWeek)}</div>
                <WeatherIcon name={iconCls} />
                <div className="rw-desc">{day.description}</div>
                <div className="rw-range">{day.temperature.max} / {day.temperature.min} {units.temp}</div>
                <div className="rw-date">{utils.getDay(day.date)}</div>
              </div>
            );
          })
        }
      </Slider>
    );
  } else if (forecast === '1day') {//One day forecast data (by hours)
    settings.slidesToShow = daysData.length;//Slider length = Data length
    settings.className = "rw-box-days rw-box-day";
    if (daysData.length !== 1)
      return (
        <Slider {...settings}>
          {
            daysData.map((day, i) => {//Data mapping function
              const iconCls = utils.getIcon(day.icon);
              return (
                <div key={`day-${i}`} className='rw-day'>
                  <WeatherIcon name={iconCls} />
                  <div className="rw-desc">{day.description}</div>
                  <div className="rw-range">{day.temperature.max} / {day.temperature.min} {units.temp}</div>
                  <div className="rw-date">{langs.Time} {utils.getTime(day.date)}</div>
                </div>
              );
            })
          }
        </Slider>
      );
    return (//If today's list of data has length = 1 and that data is already displayed in the 'TodayForecast' component
      <div className="rw-empty" key={'empty-day'}>
        <h1>{langs.empty}</h1>
      </div>
    );
  }
  return (<div></div>);
};

export default DaysForecast;
