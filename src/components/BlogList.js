import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

import { sortBlogsByLike } from '../reducers/blogReducer';
//import '../index.css';


const BlogList = () => {
  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();

  const sortBlogs = (blogs) => {
    dispatch(sortBlogsByLike(blogs));
  };

  return (
    <div>
      <button className='btn btn-primary my-3' id='sort-button' onClick={() => sortBlogs(blogs)}>Sort by Likes</button>
      <h2 className='text-primary'>BLOGS</h2>
      <Table bordered className='my-5'>
        <thead>
          <th>Title</th>
          <th>Author</th>
          <th>Likes</th>
        </thead>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`} className='blog-title'>{blog.title}</Link>
              </td>
              <td>
                {blog.author}
              </td>
              <td>
                {blog.likes}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default BlogList;
