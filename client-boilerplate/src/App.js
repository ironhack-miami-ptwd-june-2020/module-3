import React from 'react';
import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AUTH_SERVICE from './services/AuthService';
import AUTHOR_SERVICE from './services/AuthorService';
import BOOK_SERVICE from './services/BookService';

import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';

import Home from './components/Home';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile';
import CreateAuthor from './components/Author/CreateAuthor';
import CreateBook from './components/Book/CreateBook';
import BookDetails from './components/Book/BookDetails';
import UpdateBook from './components/Book/UpdateBook';

export default class App extends React.Component {
  state = {
    currentUser: null,
    authors: [],
    books: []
  };

  componentDidMount = () => {
    Promise.all([AUTHOR_SERVICE.getAuthors(), BOOK_SERVICE.getBooks(), AUTH_SERVICE.getAuthenticatedUser()])
      .then(responseFromServer => {
        const { authors } = responseFromServer[0].data;
        const { books } = responseFromServer[1].data;
        const { user } = responseFromServer[2].data;

        this.setState({ authors, books, currentUser: user });
      })
      .catch(err => console.log(err));

    // AUTHOR_SERVICE.getAuthors()
    //   .then(responseFromServer => {
    //     const { authors } = responseFromServer.data;
    //     this.setState({ authors });

    //     return AUTH_SERVICE.getAuthenticatedUser();
    //   })
    //   .then(responseFromServer => {
    //     const { user } = responseFromServer.data;

    //     this.updateUser(user);
    //   })
    //   .catch(err => console.log(err));
  };

  updateUser = user => {
    this.setState({ currentUser: user });
  };

  updateAuthors = author => {
    const updatedAuthors = [...this.state.authors, author];
    this.setState({ authors: updatedAuthors });
  };

  updateBooks = book => {
    const updatedBooks = [...this.state.books, book];
    this.setState({ books: updatedBooks });
  };

  updateBooksAfterDelete = id => {
    // BOOK_SERVICE.getBooks()
    //   .then(responseFromServer => {
    //     const { books } = responseFromServer.data;
    //     this.setState({ books });
    //   })
    //   .catch(err => console.log(err));

    const updatedBooks = [...this.state.books];

    updatedBooks.splice(
      updatedBooks.findIndex(book => book._id === id),
      1
    );

    this.setState({ books: updatedBooks });
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
            <Route exact path='/' render={props => <Home authors={this.state.authors} books={this.state.books} />} />
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

            <ProtectedRoute
              path='/books/create'
              authorized={this.state.currentUser}
              redirect={'/login-page'}
              render={props => <CreateBook {...props} authors={this.state.authors} onBooksChange={this.updateBooks} />}
            />

            <ProtectedRoute
              path='/books/:id/edit'
              authorized={this.state.currentUser}
              redirect={'/login-page'}
              render={props => <UpdateBook {...props} authors={this.state.authors} />}
            />

            <Route
              path='/books/:id'
              render={props => (
                <BookDetails
                  {...props}
                  currentUser={this.state.currentUser}
                  onBooksChangeAfterDelete={this.updateBooksAfterDelete}
                />
              )}
            />
          </Switch>

          <footer style={{ clear: 'both' }}>Made with ❤️ at Ironhack - PTWD 06/2020</footer>
        </BrowserRouter>
      </div>
    );
  }
}
