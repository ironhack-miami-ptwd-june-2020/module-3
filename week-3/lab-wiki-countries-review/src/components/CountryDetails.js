import React from 'react';
import axios from 'axios';

class CountryDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: null,
    };
  }
  //   console.log({ props });

  componentDidMount() {
    // when calling axios to get api information, it is best to call it within it's own function and then set the state to utilize the information.
    // if it is an api call that must be made on component loading then you would call it in componentDidMount() so that it is called once prior to the component rending so as to avoid having the state updated which will cause multiple renderings of the component and give you a max stack error.
    axios
      .get(
        `https://restcountries.eu/rest/v2/alpha/${this.props.match.params.id}`
      )
      .then((country) => {
        // console.log({ country: country.data });
        this.setState({ country: country.data });
      })
      .catch((err) => console.log({ err }));

    //   there are times that componentDidMount() may not run on your project. This could happen if your getting an error or warning that is not allowing the component to render properly therefore disrupting the component from fully loading and not allowing lifecycle hooks to run.
  }

  countryDetails() {
    //   this is the method that you would use if you were getting the information from the parent component and just need to filter said information for what you are looking to display. If you are going to use an api to get the information, you would then have to call a separate function first to retrieve the information and set it to the state. Then within this function you just get the information from the state and display it.
    // return props.countries.map((country) => {
    //   if (country.cca3 === props.match.params.id) {
    //     return (
    //       <div>
    //         <h1>{country.name.official}</h1>
    //         <h2>{country.flag}</h2>
    //         <h3>Capital: {country.capital[0]}</h3>
    //         <h3>Landlocked: {country.landlocked ? 'Yes' : 'No'}</h3>
    //         <h3>Currency: </h3>
    //         <ul>
    //           {country.currency.map((currency, i) => {
    //             return <li key={i}>{currency}</li>;
    //           })}
    //         </ul>
    //         <h3>Region: {country.subregion}</h3>
    //         <h3>
    //           Location: Lat: {country.latlng[0]}, Long: {country.latlng[1]}
    //         </h3>
    //       </div>
    //     );
    //   }
    // });

    // console.log({ country });
    return (
      <div>
        <h1>{this.state.country.name}</h1>
        <img src={`${this.state.country.flag}`} alt="flag" />
        <h3>Capital: {this.state.country.capital}</h3>
        <h3>Population: {this.state.country.population}</h3>
        <h3>Currency: </h3>
        <ul>
          {this.state.country.currencies.map((currency, i) => {
            return <li key={i}>{currency.code}</li>;
          })}
        </ul>
        <h3>Region: {this.state.country.subregion}</h3>
        <h3>
          Location: Lat: {this.state.country.latlng[0]}, Long:{' '}
          {this.state.country.latlng[1]}
        </h3>
      </div>
    );
  }

  render() {
    //   if by chance the api that you are calling or the information your receiving is not coming in fast enough when the component renders, then you would want to do a condition render to make sure that the information exists prior to displaying it.
    return <div>{this.state.country && this.countryDetails()}</div>;
  }
}

export default CountryDetails;
