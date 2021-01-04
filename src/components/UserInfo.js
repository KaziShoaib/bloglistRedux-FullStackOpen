import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/userReducer';

const UserInfo = () => {

  const userData = useSelector(state => state.userData);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <h2>{userData.name} logged in</h2>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default UserInfo;