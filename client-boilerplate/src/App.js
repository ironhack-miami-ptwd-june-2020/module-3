import React from 'react';
import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AUTH_SERVICE from './services/AuthService';
import AUTHOR_SERVICE from './services/AuthorService';

import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';

import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile';
import CreateAuthor from './components/Author/CreateAuthor';
// import ListAuthors from './components/Author/ListAuthors';

import Home from './components/Home';

export default class App extends React.Component {
  state = {
    currentUser: null,
    authors: []
  };

  componentDidMount = () => {
    AUTHOR_SERVICE.getAuthors()
      .then(responseFromServer => {
        const { authors } = responseFromServer.data;
        this.setState({ authors });

        return AUTH_SERVICE.getAuthenticatedUser();
      })
      .then(responseFromServer => {
        const { user } = responseFromServer.data;

        this.updateUser(user);
      })
      .catch(err => console.log(err));
  };

  updateUser = user => {
    this.setState({ currentUser: user });
  };

  updateAuthors = author => {
    const updatedAuthors = [...this.state.authors, author];
    this.setState({ authors: updatedAuthors });
  };

  render() {
    console.log('user in client: ', this.state.currentUser);
    return (
      <div className='App'>
        <BrowserRouter>
          <nav>
            <NavBar currentUser={this.state.currentUser} onUserChange={this.updateUser} />
          </nav>
          <Switch>
            {/* <Route path='/somePage' component={someComponent} /> */}
            <Route exact path='/' render={props => <Home authors={this.state.authors} />} />
            <Route path='/signup-page' render={props => <Signup {...props} onUserChange={this.updateUser} />} />
            <Route path='/login-page' render={props => <Login {...props} onUserChange={this.updateUser} />} />

            <ProtectedRoute
              path='/profile'
              authorized={this.state.currentUser}
              redirect={'/signup-page'}
              render={props => <Profile {...props} currentUser={this.state.currentUser} />}
            />

            <ProtectedRoute
              path='/authors/create'
              authorized={this.state.currentUser}
              redirect={'/login-page'}
              render={props => <CreateAuthor {...props} onAuthorsChange={this.updateAuthors} />}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
