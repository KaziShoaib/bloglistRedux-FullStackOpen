import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createNewBlog } from '../reducers/blogReducer';
import { useField } from '../hooks';
import { Form } from 'react-bootstrap';
//import '../index.css';

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
        <button className='btn btn-primary mt-3' onClick={toggleDisplayFormFlag}>Add a Blog</button>
      </div>
      <div style={showWhenDisplayed}>
        <h2 className='text-primary'>Add a new blog</h2>
        <Form onSubmit={sendNewBlog}>
          {/* the ids are given to input fields for testing purpose */}
          <Form.Label>
            Title
          </Form.Label>
          <Form.Control
            name="Title"
            id='title'
            {...title}
          />
          <Form.Label>
            Author
          </Form.Label>
          <Form.Control
            name="Author"
            id='author'
            {...author}
          />
          <Form.Label>
            URL
          </Form.Label>
          <Form.Control
            name="URL"
            id='url'
            {...url}
          />
          <button
            className='btn btn-warning mr-2 my-2' onClick={toggleDisplayFormFlag} type='button'>cancel</button>
          <button className='btn btn-primary my-2' id='submit-blog-button' type='submit'>create</button>
        </Form>
      </div>
    </div>
  );
};

export default BlogForm;