import React from 'react';
import ListAuthors from '../Author/ListAuthors';

export default class Home extends React.Component {
  render() {
    console.log('do i have authors: ', this.props);
    return (
      <>
        <h2> This is a home page of BookClub! </h2>
        <div style={{ width: '50%', float: 'left' }}>Books</div>
        <div style={{ width: '50%', float: 'right' }}>
          <h3>Authors</h3>
          <ListAuthors authors={this.props.authors} />
        </div>
      </>
    );
  }
}
