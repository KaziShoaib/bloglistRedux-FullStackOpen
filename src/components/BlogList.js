import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { sortBlogsByLike } from '../reducers/blogReducer';
import Blog from './Blog';
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
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
};

export default BlogList;
