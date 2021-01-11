import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { initializeUserList } from '../reducers/usersListReducer';



const User = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUserList());
  }, [dispatch]);

  const userList = useSelector(state => state.userList);
  const id = useParams().id;
  const user = userList.find(u => u.id === id);

  if(!user){
    return null;
  }

  return (
    <div>
      <h2 className='text-info mt-3'>{user.name}</h2>
      <h4 className='text-info mt-3'>Added Blogs</h4>
      <ul className='list-group mt-3'>
        {user.blogs.map(blog => <li key={blog.id} className='list-group-item'>{blog.title}</li>)}
      </ul>
    </div>
  );
};


export default User;