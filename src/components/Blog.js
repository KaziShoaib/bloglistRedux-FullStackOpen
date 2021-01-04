import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeBlog, addLikeTo } from '../reducers/blogReducer';
import '../index.css';

const Blog = ({ blog }) => {
  const [detailflag, setDetailflag] = useState(false);

  const showWhenHidden = { display : detailflag ? 'none' : '' };
  const showWhenDetail = { display : detailflag ? '' : 'none' };

  const toggleDetailFlag = () => setDetailflag(!detailflag);

  let showDeleteButton = { display : 'none' };
  const userData = useSelector(state => state.userData);
  if(userData){
    const userIsTheCreator = blog.user.username === userData.username;
    if(userIsTheCreator){
      showDeleteButton = { display : '' };
    }
  }

  //this function should be async
  //it should await the deleteBlog function
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if(window.confirm(`Do you want to delete ${blog.title}?`)){
      dispatch(removeBlog(id));
    }
  };

  const addLike = (id, blogObject) => {
    dispatch(addLikeTo(id, blogObject));
  };

  return (
    <div className='blog'>
      {/* the className blogSummary is given for test purpose */}
      <div style={showWhenHidden} className='blogSummary'>
        <p>
          {blog.title} {blog.author} <button onClick={toggleDetailFlag} className='view-button'>view</button>
        </p>
      </div>
      {/* the className blogDetail is given for test purpose */}
      <div style={showWhenDetail} className='blogDetail'>
        <p>
          {blog.title} {blog.author} <button onClick={toggleDetailFlag}>hide</button>
        </p>
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          Likes <span className='like-count'>{blog.likes}</span> <button onClick={() => addLike(blog.id, blog)} className='like-button'>Like</button>
        </p>
        <p>
          {blog.user.name}
        </p>
        <button style={showDeleteButton} className='delete-button' onClick={() => handleDelete(blog.id)}>Delete</button>
      </div>
    </div>
  );
};

export default Blog;