import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { initializeUserList } from '../reducers/usersListReducer';

const UserList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUserList());
  }, [dispatch]);

  const userList = useSelector(state => state.userList);

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {userList.map( user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
};

export default UserList;