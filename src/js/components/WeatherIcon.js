import React from 'react';

const WeatherIcon = props => (//Component for weather icon from string
  <i className={`wicon wi ${props.name}`}></i>
);

export default WeatherIcon;
