import React from 'react';

import AUTH_SERVICE from '../../../services/AuthService';

export default class Signup extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    message: null
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // ES6 destructuring - the same as above:
  // handleInputChange = ({ target: { name, value } }) => {
  //   this.setState({
  //     [name]: value
  //   });
  // };

  handleFormSubmission = event => {
    event.preventDefault();

    const { username, email, password } = this.state;

    AUTH_SERVICE.signup({ username, email, password })
      .then(responseFromServer => {
        const { user } = responseFromServer.data;

        // Lift the user object to the App.js
        this.props.onUserChange(user);

        // Redirect user to home page after successful sign up
        this.props.history.push('/');
      })
      .catch(err => {
        if (err.response && err.response.data) {
          return this.setState({ message: err.response.data.message });
        }
      });
  };

  render() {
    return (
      <>
        <section>
          <h2> Sign Up </h2>

          <form onSubmit={this.handleFormSubmission}>
            <label>
              Username:
              <input
                name='username'
                type='text'
                placeholder='ana'
                value={this.state.username}
                onChange={this.handleInputChange}
              />
            </label>

            <label>
              Email:
              <input
                name='email'
                type='email'
                placeholder='ana@ironhack.com'
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </label>

            <label>
              Password:
              <input
                name='password'
                type='password'
                placeholder='**********'
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </label>

            <button> Signup </button>
          </form>

          {/* if the message is not NULL then show the message */}
          {this.state.message && <div> {this.state.message} </div>}
        </section>
      </>
    );
  }
}
