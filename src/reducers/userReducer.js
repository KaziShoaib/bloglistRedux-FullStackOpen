import loginService from '../services/login';
import blogService from '../services/blogs';
import { createNotification } from './notificationReducer';

const userReducer = (state = null, action) => {
  switch(action.type) {
    case 'INIT_USER' :
    case 'SET_USER' :
      return action.data;
    case 'CLEAR_USER':
      return null;
    default:
      return state;
  }
};


export const loginUser = ( userCredentials ) => {
  return async dispatch => {
    try {
      const userData = await loginService.login(userCredentials);
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(userData)
      );
      dispatch({
        type : 'SET_USER',
        data : userData
      });
      blogService.setToken(userData.token);
      dispatch(createNotification('success', 'Login Successful', 5000));
    } catch(exception) {
      dispatch(createNotification('error', 'Invalid username or password', 5000));
    }
  };
};


export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch({
      type: 'CLEAR_USER'
    });
    blogService.setToken(null);
    dispatch(createNotification('success', 'Logout Successful', 5000));
  };
};


export const initializeUser = (userData) => {
  return async dispatch => {
    dispatch({
      type : 'INIT_USER',
      data: userData
    });
  };
};

export default userReducer;