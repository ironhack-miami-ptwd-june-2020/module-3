import React from 'react';

const StudentInfo = ({ name, age }) => {
  return (
    <>
      <strong> {name} </strong> - {age}
    </>
  );
};

export default StudentInfo;
