import { icons } from './icons';
import { langText } from './lang';

const utils = {
  getIcon(icon) {//Get icon class based the icon string data
    if (!icon) {
      return 'na';
    }
    const icoClass = icons[icon];
    if (icoClass) {
      return icoClass;
    }
    return 'na';
  },
  getUnits(unit) {//Get units based on the used system (metric,imeprial)
    if (unit === 'metric') {
      return {
        temp: 'C',
        speed: 'km/h',
      };
    } else if (unit === 'imperial') {
      return {
        temp: 'F',
        speed: 'mph',
      };
    }
    return { temp: '', speed: '' };
  },
  formatDate(dte, months) {//Format date data from milliseconds to 'DD MM YYYY HH:MM' format
    var a = new Date(dte * 1000);
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours() > 9 ? a.getHours() : '0' + a.getHours();
    var min = a.getMinutes() > 9 ? a.getMinutes() : '0' + a.getMinutes();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
    return time;
  },
  getLangs(lang) {//returns the language list of strings
    return langText[lang] === undefined ? langText.en : langText[lang];
  },
  capitalizeLetters(str) {//Capitalize all letters
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  },
  groupBy(key, array) {
    //Group data list by day
    //original format: [{data1, date1HourX},{data2, date1HourY}, ..., {dataN, dateMHourZ}]
    //result format: [day1: [{data1},{date2}, ...], ..., dateM:[{dataX},{dataY}, ...]]
    return array.reduce((objectsByKeyValue, obj) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});
  },
  getNextDays(days) {//returns the first data from each day
    let otherDays = utils.groupBy('day', days);
    let keys = Object.keys(otherDays);
    let res = [];
    keys.forEach(element => res.push(otherDays[element][0]));
    return res;
  },
  getDayOfWeek(day, days) {//returns the day in letter (Monday, Friday , ...) , takes string(day) and array<string>(days in letters)
    let d = new Date(day);
    return days[d.getDay()];
  },
  getTime(day) {//returns the hour of the day from 'DD MM YYYY HH:MM' date format
    let res = day.split(" ");
    return res[res.length - 1];
  },
  getDay(day) {//Get day from 'DD MM YYYY HH:MM' date format
    let res = day.split(" ");
    return res.slice(0, res.length - 1).join(" ");
  },
};

export default utils;