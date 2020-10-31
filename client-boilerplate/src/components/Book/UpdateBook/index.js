import React from 'react';

import BOOK_SERVICE from '../../../services/BookService';

export default class UpdateBook extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //     title: this.props.location.book.title ,
    //     description: this.props.location.book.description,
    //     author: this.props.location.book.author,
    //     rating: this.props.location.book.rating
    //   };

    const { _id, title, description, author, rating } = this.props.location.book;

    this.state = {
      _id,
      title,
      description,
      author,
      rating
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmission = event => {
    event.preventDefault();

    const { _id, title, description, author, rating } = this.state;

    BOOK_SERVICE.updateBook(_id, { title, description, author, rating })
      .then(responseFromServer => {
        // console.log('res from server in book update:', responseFromServer);
        const { book } = responseFromServer.data;
        this.props.history.push(`/books/${book._id}`);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { title, description, author, rating } = this.state;

    return (
      <section>
        <h2> Edit Book </h2>

        <form onSubmit={this.handleFormSubmission}>
          <label>
            Title
            <input name='title' type='text' value={title} onChange={this.handleInputChange} />
          </label>

          <label>
            Description
            <textarea name='description' type='text' value={description} onChange={this.handleInputChange} />
          </label>

          <label>
            Author
            <select value={author._id} name='author' onChange={this.handleInputChange}>
              <option></option>
              {this.props.authors.map(author => (
                <option value={author._id} key={author._id}>
                  {author.firstName} {author.lastName}
                </option>
              ))}
            </select>
          </label>

          <label>
            Rating
            <input
              name='rating'
              type='number'
              placeholder='5'
              value={rating}
              min='1'
              max='10'
              onChange={this.handleInputChange}
            />
          </label>

          <button> Save changes </button>
        </form>
      </section>
    );
  }
}
