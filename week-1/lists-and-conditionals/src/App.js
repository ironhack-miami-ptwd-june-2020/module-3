import React from 'react';
import './App.css';

import StudentsList from './components/StudentsList/StudentsList';

import CohortInfo from './components/CohortInfo/CohortInfo';

import ConditionalExample from './components/ConditionalExample/ConditionalExample';

// example of data:

const cohorts = [
  {
    id: '001',
    date: new Date(2020, 8, 21),
    students: [
      {
        id: 'abc',
        name: 'Alex',
        age: 29
      },
      {
        id: 'frt',
        name: 'Tom',
        age: 30
      }
    ]
  },
  {
    id: '002',
    date: new Date(2020, 11, 15),
    students: [
      {
        id: 'xcr',
        name: 'Nick',
        age: 25
      },
      {
        id: 'ytr',
        name: 'Andrew',
        age: 28
      }
    ]
  }
];

function App() {
  return (
    <div className='App'>
      <StudentsList />
      <hr />

      <h2> Cohort List </h2>
      <i>(an example with an array of objects)</i>
      {/* <ul>
        {cohorts.map(cohort => {
          return <li key={cohort.id}> {cohort.id} </li>;
        })}
      </ul> */}

      {cohorts.map(cohort => {
        return <CohortInfo key={cohort.id} date={cohort.date} students={cohort.students} />;
      })}

      <hr />

      <ConditionalExample />
    </div>
  );
}

export default App;
