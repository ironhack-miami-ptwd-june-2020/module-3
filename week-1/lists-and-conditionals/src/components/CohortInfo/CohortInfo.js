import React from 'react';

import StudentInfo from '../StudentInfo/StudentInfo';

export default class CohortInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { date, students } = this.props;

    return (
      <>
        <p> Cohort Start date: {date.toDateString()} </p>

        <h3> Students </h3>

        {students.map(student => (
          <StudentInfo key={student.id} name={student.name} age={student.age} />
        ))}
      </>
    );
  }
}
