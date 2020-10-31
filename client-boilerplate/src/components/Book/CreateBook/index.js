import React from 'react';

import BOOK_SERVICE from '../../../services/BookService';

export default class CreateBook extends React.Component {
  state = {
    title: '',
    description: '',
    author: '',
    rating: '',
    message: null
    // authors: [] // in case you want to have a call to server in componentDidMount, you need authors array in the state
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmission = event => {
    event.preventDefault();

    const { title, description, author, rating } = this.state;

    BOOK_SERVICE.createBook({ title, description, author, rating })
      .then(responseFromServer => {
        const { book } = responseFromServer.data;

        this.props.onBooksChange(book);
        this.props.history.push('/');
      })
      .catch(err => {
        if (err.response && err.response.data) {
          return this.setState({ message: err.response.data.message });
        }
      });
  };

  //   in case you don't care for one more call tp your server, you can make it in componentDidMount as follows:
  //   componentDidMount = () => {
  //     AUTHOR_SERVICE.getAuthors()
  //       .then(responseFromServer => {
  //         const { authors } = responseFromServer.data;
  //         this.setState({ authors });
  //       })
  //       .catch(err => console.log(err));
  //   };

  render() {
    console.log('authors: ', this.props.authors);
    const { title, description, author, rating, message } = this.state;

    return (
      <section>
        <h2> Create new Book </h2>

        <form onSubmit={this.handleFormSubmission}>
          <label>
            Title
            <input
              name='title'
              type='text'
              placeholder='Pride and Prejudice'
              value={title}
              onChange={this.handleInputChange}
            />
          </label>

          <label>
            Description
            <textarea
              name='description'
              type='text'
              placeholder='Put some description here...'
              value={description}
              onChange={this.handleInputChange}
            />
          </label>

          <label>
            Author
            <select value={this.state.author} name='author' onChange={this.handleInputChange}>
              <option>choose author</option>

              {/* {this.state.authors.map(author => ()} -> in case you would go for additional call in componentDidMount*/}

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

          <button> Create Book </button>
        </form>

        {message && <div>{message}</div>}
      </section>
    );
  }
}
