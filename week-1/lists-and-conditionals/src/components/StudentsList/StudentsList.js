// import React, { Component } from 'react';
import React from 'react';

export default class StudentsList extends React.Component {
  // constructor(props){
  //     super(props)
  //     this.state = {}
  // }

  state = {
    students: ['Tom', 'Andrew', 'Alex']
  };

  render() {
    // console.log(this.state);

    const { students } = this.state;

    return (
      // <div></div>
      // <section></section>
      <>
        <h1>Students List</h1>
        <i>(an example with an array of strings)</i>

        <ul>
          {students.map((student, index) => {
            return <li key={index}> {student} </li>;
          })}
        </ul>
      </>
    );
  }
}

// export default StudentsList;
