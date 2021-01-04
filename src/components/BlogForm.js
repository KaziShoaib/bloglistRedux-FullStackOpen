import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createNewBlog } from '../reducers/blogReducer';
import '../index.css';

//this component creates it's own states
//it get one function in props
//once the create button is pressed the login form submission function
//sends the new blogObject to the props function


const BlogForm = () => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [dispalayFormFlag, setDisplayFormFlag] = useState(false);

  const dispatch = useDispatch();

  const hideWhenDisplayed = { display : dispalayFormFlag ? 'none' : '' };
  const showWhenDisplayed = { display : dispalayFormFlag ? '' : 'none' };

  const toggleDisplayFormFlag = () => setDisplayFormFlag(!dispalayFormFlag);

  const sendNewBlog = async (event) => {
    event.preventDefault();
    const blogObject = { title, author, url };
    await dispatch(createNewBlog(blogObject));
    setTitle('');
    setAuthor('');
    setUrl('');
    toggleDisplayFormFlag();
  };

  return (
    <div>
      <div style={hideWhenDisplayed}>
        <button onClick={toggleDisplayFormFlag}>Add a Blog</button>
      </div>
      <div style={showWhenDisplayed}>
        <h2>Add a new blog</h2>
        <form onSubmit={sendNewBlog}>
          {/* the ids are given to input fields for testing purpose */}
          <div>
            Title:
            <input
              name="Title"
              id='title'
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div>
            Author:
            <input
              name="Author"
              id='author'
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </div>
          <div>
            URL:
            <input
              name="URL"
              id='url'
              type="text"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
          </div>
          <button onClick={toggleDisplayFormFlag} type='button'>cancel</button>
          <button id='submit-blog-button' type='submit'>create</button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;