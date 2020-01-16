var daysEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var daysFr = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

var monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var monthsFr = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

module.exports = {//List of strings to use in components based on the language selected
  langText: {
    en: {
      Wind: 'Wind',
      Humidity: 'Humidity',
      Precipitation: 'Precipitation',
      Pressure: 'Pressure',
      Time: 'Hour :',
      Today: 'Today',
      ByHours: "By Hour",
      ByDays: "By Day",
      DaysWeek: daysEn,
      Months: monthsEn,
      empty: 'No More Data For Today !'
    },
    fr: {
      Wind: 'Vent',
      Humidity: 'Humidité',
      Precipitation: 'Précipitation',
      Pressure: 'Pression',
      Time: 'Heure :',
      Today: 'Aujourd\'hui',
      ByHours: "Par Heure",
      ByDays: "Par Jour",
      DaysWeek: daysFr,
      Months: monthsFr,
      empty: 'Plus de données pour aujourd\'hui !'
    }
  }
};
