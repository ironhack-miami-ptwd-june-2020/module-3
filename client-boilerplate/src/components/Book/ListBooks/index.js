import React from 'react';
import { Link } from 'react-router-dom';

const ListBooks = props => {
  return (
    <section>
      <ul>
        <ul>
          {props.books.map(book => (
            <Link to={`books/${book._id}`} key={book._id}>
              <li>{book.title}</li>
            </Link>
          ))}
        </ul>
      </ul>
    </section>
  );
};

export default ListBooks;
