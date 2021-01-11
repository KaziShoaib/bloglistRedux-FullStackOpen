import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { initializeUserList } from '../reducers/usersListReducer';

const UserList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUserList());
  }, [dispatch]);

  const userList = useSelector(state => state.userList);

  return (
    <div>
      <h2 className='text-primary mt-3'>Users</h2>
      <Table bordered className='mt-3'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Added</th>
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
      </Table>

    </div>
  );
};

export default UserList;