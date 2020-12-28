import React, { useState } from 'react'
import '../index.css'

const Blog = ({ blog, addLike, deleteBlog }) => {
  const [detailflag, setDetailflag] = useState(false);

  const showWhenHidden = {display : detailflag ? 'none' : ''}
  const showWhenDetail = {display : detailflag ? '' : 'none'}

  const toggleDetailFlag = () => setDetailflag(!detailflag);
  
  const loggedUserDataJSON = window.localStorage.getItem('loggedBlogappUser');
  const userData = JSON.parse(loggedUserDataJSON); 
  const userIsTheCreator = blog.user.username === userData.username;
  const showDeleteButton = {display : userIsTheCreator ? '' : 'none'};

  //this function should be async 
  //it should await the deleteBlog function
  const handleDelete = (id) => {
    if(window.confirm(`${blog.title}`)){
      deleteBlog(id);
    }
    
  }

  return (
    <div className='blog'>
      <div style={showWhenHidden}>
        <p>
          {blog.title} {blog.author} <button onClick={toggleDetailFlag}>view</button>
        </p>
      </div>
      <div style={showWhenDetail}>
        <p>
          {blog.title} {blog.author} <button onClick={toggleDetailFlag}>hide</button>
        </p>
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          Likes <span>{blog.likes}</span> <button onClick={addLike}>Like</button>
        </p>
        <p>
          {blog.user.name}
        </p>
        <div style={showDeleteButton}>
          <button onClick={() => handleDelete(blog.id)}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
