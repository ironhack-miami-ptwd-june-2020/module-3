import React from 'react';

import './App.css';

import AUTH_SERVICE from './services/AuthService';

import Signup from './components/Authentication/Signup';

export default class App extends React.Component {
  state = {
    currentUser: null
  };

  componentDidMount = () => {
    AUTH_SERVICE.getAuthenticatedUser()
      .then(responseFromServer => {
        console.log('res isLoggedIn: ', responseFromServer);
        const { user } = responseFromServer.data;

        this.updateUser(user);
      })
      .catch(err => console.log(err));
  };

  updateUser = user => {
    this.setState({ currentUser: user });
  };

  logout = () => {
    AUTH_SERVICE.logout()
      .then(() => {
        this.setState({ currentUser: null });
      })
      .catch(err => console.log(err));
  };

  render() {
    console.log('user in client: ', this.state.currentUser);
    return (
      <div className='App'>
        <button onClick={this.logout}>Logout</button>
        <Signup />
      </div>
    );
  }
}
