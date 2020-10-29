import React from 'react';

const ListAuthors = props => {
  return (
    <section>
      <ul>
        <ul>
          {props.authors.map(author => (
            <li key={author._id}>
              {author.firstName} {author.lastName}
            </li>
          ))}
        </ul>
      </ul>
    </section>
  );
};

export default ListAuthors;
