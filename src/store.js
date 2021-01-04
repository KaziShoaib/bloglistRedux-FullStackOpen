import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import loginReducer from './reducers/loginReducer';


const reducers = combineReducers({
  notifications: notificationReducer,
  blogs: blogReducer,
  login: loginReducer
});

const store = createStore( reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;
