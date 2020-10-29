import React from 'react';

const Profile = props => {
  return (
    <>
      <h3>{props.currentUser.username}</h3>
      <p> This is your email: {props.currentUser.email} </p>
    </>
  );
};

export default Profile;
