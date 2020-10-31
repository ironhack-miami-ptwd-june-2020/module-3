import React from 'react';

import BOOK_SERVICE from '../../../services/BookService';

import { Link } from 'react-router-dom';

export default class BookDetails extends React.Component {
  state = {
    book: {}
  };

  loadBookDetails = () => {
    BOOK_SERVICE.getBookDetails(this.props.match.params.id)
      .then(responseFromServer => {
        const { book } = responseFromServer.data;
        this.setState({ book });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.loadBookDetails();
  }

  deleteBook = bookId => {
    BOOK_SERVICE.deleteBook(bookId)
      .then(() => {
        this.props.onBooksChangeAfterDelete(bookId);
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  };

  render() {
    const { _id, title, description, author, rating } = this.state.book;
    return (
      <section>
        <h3>
          {title} by {author?.firstName} {author?.lastName}
        </h3>
        <b> {rating} </b>
        <p> {description} </p>
        {this.props.currentUser && (
          <>
            <Link
              to={{
                pathname: `/books/${_id}/edit`,
                book: this.state.book
              }}
            >
              Edit
            </Link>
            <br />
            <button onClick={() => this.deleteBook(_id)}>Delete</button>
          </>
        )}
      </section>
    );
  }
}
