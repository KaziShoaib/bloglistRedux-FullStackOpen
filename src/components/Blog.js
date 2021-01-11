import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeBlog, addLikeTo, addCommentTo } from '../reducers/blogReducer';
import '../index.css';
import { useParams, useHistory } from 'react-router-dom';

const Blog = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const id = useParams().id;
  const blogs = useSelector(state => state.blogs);
  const blog = blogs.find(b => b.id === id);

  const userData = useSelector(state => state.userData);

  //this condition is for helpint with delete, more in the handDelete function
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
      //this line does not work
      // after deleting instead of going back to home page
      // this component is reloaded
      // to prevent that an if condition is added above
      // that checks if the userData or blog does not exist null is returned
    }
  };

  const addLike = (id, blogObject) => {
    dispatch(addLikeTo(id, blogObject));
  };

  const addComment = (event) => {
    event.preventDefault();
    const newComment = event.target.comment.value;
    event.target.comment.value = '';
    dispatch(addCommentTo(blog.id, blog, newComment));
  };

  return (
    <div>
      <h4 className='mt-3'>
        {blog.title} <em>{blog.author}</em>
      </h4>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        Likes <span className='like-count'>{blog.likes}</span> <button onClick={() => addLike(blog.id, blog)} className='like-button'>Like</button>
      </p>
      <p>
        Added by {blog.user.name}
      </p>
      <button style={showDeleteButton} className='delete-button' onClick={() => handleDelete(blog.id)}>Delete</button>
      <div>
        <form onSubmit={(event) => addComment(event)}>
          <input type='text' name='comment' />
          <button type='submit'>Add a comment</button>
        </form>
      </div>
      <div>
        <h4>comments</h4>
        <ul>
          {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default Blog;