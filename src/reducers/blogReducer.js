import blogService from '../services/blogs';
import { createNotification } from './notificationReducer';

const blogReducer = (state=[], action) => {
  switch(action.type){
    case 'INIT_BLOGS':
    case 'SORT_BLOGS':
      return action.data;
    case 'ADD_NEW_BLOG':
      return [...state, action.data];
    case 'DELETE_BLOG': {
      const id = action.data.id;
      return state.filter(blog => blog.id !== id);
    }
    case 'INCREMENT_LIKES': {
      const id = action.data.id;
      return state.map(blog =>
        blog.id === id ? { ...blog, likes: blog.likes+1 } : blog);
    }
    default:
      return state;
  }
};


export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    });
  };
};


export const createNewBlog = (blogObject, userData) => {
  return async dispatch => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      const modifiedReturnedBlog = {
        ...returnedBlog,
        user : {
          username:userData.username,
          name:userData.name,
          id: returnedBlog.user.toString()
        }
      };
      dispatch({
        type: 'ADD_NEW_BLOG',
        data: modifiedReturnedBlog
      });
      dispatch(createNotification('success', `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 5000));
    } catch(exception){
      dispatch(createNotification('error', exception.response.data.error, 5000));
    }
  };
};

export const addLikeTo = (id, blogObject) => {
  return async dispatch => {
    try {
      const likeObject = {  likes: blogObject.likes + 1 };
      await blogService.update(id, likeObject);
      dispatch({
        type : 'INCREMENT_LIKES',
        data : { id }
      });
    } catch(exception) {
      dispatch(createNotification('error', `Blog ${blogObject.title} has been deleted`, 5000));
      dispatch({
        type : 'DELETE_BLOG',
        data : { id }
      });
    }
  };
};


export const removeBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.deleteBlog(id);
      dispatch({
        type: 'DELETE_BLOG',
        data : { id }
      });
      dispatch(createNotification('success', 'the blog has been successfully deleted', 5000));
    } catch(exception) {
      dispatch(createNotification('error', exception.data.error.message, 5000));
    }
  };
};


export const sortBlogsByLike = (blogs) => {
  return async dispatch => {
    const sortedBlogs = [...blogs].sort((bloga, blogb) => blogb.likes - bloga.likes);
    dispatch({
      type : 'SORT_BLOGS',
      data : sortedBlogs
    });
  };
};

export default blogReducer;