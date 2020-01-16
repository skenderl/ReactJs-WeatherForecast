import React from 'react';
import './App.css';
import ReactWeather from './js/components/ReactWeather';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "France",
      input: null,
      lang: "fr",
    };
  }
  handleSubmit = (event) => {// City input OnSubmit fucntion
    this.setState({ city: this.state.input });
    event.preventDefault();
  }
  handleCityChange = (event) => {// City input OnSubmit fucntion
    this.setState({ input: event.target.value });
  }
  handleChangeLanguage = (event) => {// Language radio OnChange fucntion
    this.setState({ lang: event.target.value });
  }
  render() {
    let selectedCity = this.state.city;
    let selectedLang = this.state.lang;
    return (
      <div className="App" >
        <form className="overlay-content" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="France, Tunisia, Canada ..." onChange={this.handleCityChange} />
        </form>
        <div className="radio">
          <label>
            <input type="radio" value="fr"
              checked={this.state.lang === 'fr'}
              onChange={this.handleChangeLanguage} />
            Français
          </label>
          <label>
            <input type="radio" value="en"
              checked={this.state.lang === 'en'}
              onChange={this.handleChangeLanguage} />
            English
          </label>
        </div>
        <ReactWeather
          forecast="5days"
          apikey="9d4fd4a5a861081fd3dacac1c84a2fd9"
          type="city"
          city={selectedCity}
          lang={selectedLang}
        />
      </div>
    );
  }
}

export default App;
