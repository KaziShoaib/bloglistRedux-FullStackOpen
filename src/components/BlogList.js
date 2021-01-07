import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { sortBlogsByLike } from '../reducers/blogReducer';
import '../index.css';


const BlogList = () => {
  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();

  const sortBlogs = (blogs) => {
    dispatch(sortBlogsByLike(blogs));
  };

  return (
    <div>
      <button id='sort-button' onClick={() => sortBlogs(blogs)}>Sort by Likes</button>
      <h2>BLOGS</h2>
      {blogs.map(blog =>
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          <br/>
        </div>
      )}
    </div>
  );
};

export default BlogList;
