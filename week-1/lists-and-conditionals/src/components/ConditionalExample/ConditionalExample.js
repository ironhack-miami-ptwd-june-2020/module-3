import React from 'react';

export default class ConditionalExample extends React.Component {
  state = {
    active: true
  };

  toggle = () => {
    this.setState({
      active: !this.state.active
    });
  };

  render() {
    const isLoggedIn = true;

    let age = 35;

    return (
      <>
        <button onClick={this.toggle}> Toggle </button>

        {this.state.active && <p> I am here!</p>}

        {(isLoggedIn && <p> You are logged in! </p>) || <strong> You have to log in first! </strong>}

        {(age < 20 && <p> i am very young </p>) || (age < 90 && <p> I am at ok age </p>) || <p> I am very old</p>}
      </>
    );
  }
}
