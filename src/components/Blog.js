import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeBlog, addLikeTo } from '../reducers/blogReducer';
import '../index.css';
import { useParams, useHistory } from 'react-router-dom';

const Blog = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const id = useParams().id;
  const blogs = useSelector(state => state.blogs);
  const blog = blogs.find(b => b.id === id);

  const userData = useSelector(state => state.userData);

  if(!userData || !blog)
    return null;

  let showDeleteButton = { display : 'none' };
  if(userData){
    const userIsTheCreator = blog.user.username === userData.username;
    if(userIsTheCreator){
      showDeleteButton = { display : '' };
    }
  }

  const handleDelete = async (id) => {
    if(window.confirm(`Do you want to delete ${blog.title}?`)){
      await dispatch(removeBlog(id));
      history.push('/');
    }
  };

  const addLike = (id, blogObject) => {
    dispatch(addLikeTo(id, blogObject));
  };

  return (
    <div className='blog'>
      <p>
        {blog.title} {blog.author}
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
  );
};

export default Blog;