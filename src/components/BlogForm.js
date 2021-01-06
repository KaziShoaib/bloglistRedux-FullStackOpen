import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createNewBlog } from '../reducers/blogReducer';
import { useField } from '../hooks';
import '../index.css';

//this component creates it's own states


const BlogForm = () => {
  const { field: title, reset: resetTitle } = useField('text');
  const { field: author, reset: resetAuthor } = useField('text');
  const { field: url, reset: resetUrl } = useField('text');
  const [dispalayFormFlag, setDisplayFormFlag] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData);

  const hideWhenDisplayed = { display : dispalayFormFlag ? 'none' : '' };
  const showWhenDisplayed = { display : dispalayFormFlag ? '' : 'none' };

  const toggleDisplayFormFlag = () => setDisplayFormFlag(!dispalayFormFlag);

  const sendNewBlog = async (event) => {
    event.preventDefault();
    const blogObject = { title: title.value, author: author.value, url: url.value };
    await dispatch(createNewBlog(blogObject, userData));
    resetTitle();
    resetAuthor();
    resetUrl();
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
              {...title}
            />
          </div>
          <div>
            Author:
            <input
              name="Author"
              id='author'
              {...author}
            />
          </div>
          <div>
            URL:
            <input
              name="URL"
              id='url'
              {...url}
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