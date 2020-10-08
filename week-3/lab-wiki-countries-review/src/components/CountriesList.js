import React from 'react';
import { Link } from 'react-router-dom';

function CountriesList(props) {
  const displayCountries = () => {
    return props.countries.map((country, i) => {
      return (
        <Link key={i} to={`/details/${country.cca3}`}>
          {country.name.official}: {country.flag}
        </Link>
      );
    });
  };

  return (
    <div>
      <h1>Countries</h1>
      <hr />
      <div className="center-content">{displayCountries()}</div>
    </div>
  );
}

export default CountriesList;
