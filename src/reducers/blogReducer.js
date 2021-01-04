import blogService from '../services/blogs';
import { getUserData } from '../utils/userInfo';
import { createNotification } from './notificationReducer';

const blogReducer = (state=[], action) => {
  switch(action.type){
    case 'INIT_BLOGS':
      return action.data;
    case 'ADD_NEW_BLOG':
      return [...state, action.data];
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


export const createNewBlog = (blogObject) => {
  return async dispatch => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      const userData = getUserData();
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

export default blogReducer;