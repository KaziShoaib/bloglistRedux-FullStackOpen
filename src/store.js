import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';
import userListReducer from './reducers/usersListReducer';


const reducers = combineReducers({
  notifications: notificationReducer,
  blogs: blogReducer,
  userData : userReducer,
  userList : userListReducer
});

const store = createStore( reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;
