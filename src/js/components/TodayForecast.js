import React from 'react';
import utils from '../utils';
import '../../css/components/TodayForecast.css';
import { ReactComponent as Wind } from '../../assets/wind.svg';


const TodayForecast = (props) => {//Component for today's data
  const { todayData, unit, lang } = props;
  const todayIcon = utils.getIcon(todayData.icon);
  const units = utils.getUnits(unit);
  const langs = utils.getLangs(lang);
  return (
    <div className="rw-today">
      <div className="date">{todayData.date}</div>
      <div className="hr"></div>
      <div className="current">{todayData.temperature.current} {units.temp}</div>
      <div className="range">{todayData.temperature.max} / {todayData.temperature.min} {units.temp}</div>
      <div className="desc">
        <i className={`wicon wi ${todayIcon}`}></i>
        &nbsp;{todayData.description}
      </div>
      <div className="hr"></div>
      <div className="info">
        <div>{langs.Humidity}: <b>{todayData.humidity}</b> %</div>
        <div>{langs.Pressure}: <b>{todayData.pressure}</b> hPa</div>
        <div>{langs.Precipitation}: <b>{todayData.precipitation}</b> mm</div>
        <div>{langs.Wind}: <b>{todayData.wind.speed}</b> {units.speed}
          <Wind className="wind-svg" alt={todayData.wind.deg + 'deg'} style={{ transform: `rotate(${todayData.wind.deg}deg)` }} />
        </div>
      </div>
    </div>
  );
};


export default TodayForecast;
