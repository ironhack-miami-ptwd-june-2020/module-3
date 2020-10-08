import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import countries from './countries';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';

class App extends Component {
  constructor() {
    super();
    this.state = {
      countries,
    };
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <CountriesList countries={this.state.countries} />
            )}
          />

          <Route
            exact
            path="/details/:id"
            render={(props) => (
              <CountryDetails {...props} countries={this.state.countries} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
