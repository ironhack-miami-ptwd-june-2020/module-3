import React from 'react';

const Profile = props => {
  const { username, email } = props.currentUser;
  return (
    <>
      <h3>{username}</h3>
      <p> This is your email: {email} </p>
    </>
  );
};

// this is the same as above, just maybe a bit fancier:

// const Profile = ({ currentUser: { username, email } }) => {
//   return (
//     <>
//       <h3>{username}</h3>
//       <p> This is your email: {email} </p>
//     </>
//   );
// };

export default Profile;
