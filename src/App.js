import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import Blog from './components/Blog';
import blogService from './services/blogs';
import Notification from './components/Notification';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';

import { createNotification } from './reducers/notificationReducer';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  //we will use this ref to access functions defined in other components
  //i.e. components that are rendered from the App component
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, []);

  useEffect(() => {
    //searching for log in info in the local storage
    const loggedUserDataJSON = window.localStorage.getItem('loggedBlogappUser');
    if(loggedUserDataJSON){
      //userData contains the token, username and name
      const userData = JSON.parse(loggedUserDataJSON);
      setUser(userData);
      //setToken will prepared a bearer token in the blogService local variable token
      blogService.setToken(userData.token);
    }
  }, []);

  const dispatch = useDispatch();


  const handleLogin = async (userCredentials) => {

    try{
      //userData will have the username, name and token returned from backend
      const userData = await loginService.login(userCredentials);
      //saving the userData in the local storage
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(userData)
      );
      setUser(userData);
      //creating a bearer token in the blogService local variable token
      blogService.setToken(userData.token);
      dispatch(createNotification('success', 'Login Successful', 5000));
    }
    catch(exception){
      dispatch(createNotification('error', 'Invalid username or password', 5000));
    }
  };


  const handleLogout = () => {
    //clearing the local storage of the userData
    window.localStorage.removeItem('loggedBlogappUser');
    //setting the blogService local variable token to null
    blogService.setToken(null);
    setUser(null);
    dispatch(createNotification('success', 'Logout Successful', 5000));
  };


  const addBlog = async (blogObject) => {
    //we can access the toggleVisible function defined in the
    //Togglable component from this App component because of the ref mechanism
    //details inside the Togglable component
    blogFormRef.current.toggleVisible();
    try {
      const returnedBlog = await blogService.create(blogObject);
      //the returnedBlog's user field is not populated
      //it just contains the id of the creator
      const modifiedReturnedBlog = {
        ...returnedBlog,
        user:{
          username:user.username, //from the user state
          name:user.name, // from the user state
          id:returnedBlog.user.toString()
        }
      };
      setBlogs(blogs.concat(modifiedReturnedBlog));
      dispatch(createNotification('success', `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 5000));
    } catch(exception){
      dispatch(createNotification('error', exception.response.data.error, 5000));
    }
  };

  const deleteBlog = async(id) => {
    try {
      await blogService.deleteBlog(id);
      setBlogs(blogs.filter(b => b.id !== id));
      dispatch(createNotification('success', 'the blog has been successfully deleted', 5000));
    } catch(exception) {
      dispatch(createNotification('error', exception.data.error.message, 5000));
    }
  };


  const increaseLikeOf = async (id) => {
    let blog = blogs.find(b => b.id === id);
    let likeObj = { likes : blog.likes + 1 };
    try {
      await blogService.update(id, likeObj);
      //we can't just replace the old blog with the returned blog because
      //the user field is not populated in the returned blog
      setBlogs(blogs.map(blog => {
        return blog.id===id ? { ...blog, likes:blog.likes+1 } : blog;
      }));
    } catch(exception) {
      dispatch(createNotification('error', `Blog ${blog.title} has been deleted`, 5000));
      setBlogs(blogs.filter(b => b.id !== id));
    }
  };


  const blogForm = () => {
    //The Togglable component has opening and closing tag
    //the BlogForm component is inside the Togglable component
    //BlogForm component will be available to the Togglable component
    //as {props.children}
    return (
      //the ref is transferred because we want to access a function
      //defined in the Togglable component from here
      //i.e. from the App component
      <Togglable buttonLabel="add a blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
    );
  };


  const sortBlogs = () => {
    const sortedBlog = [...blogs].sort((bloga, blogb) => blogb.likes - bloga.likes);
    setBlogs(sortedBlog);
  };

  return (
    <div>
      <Notification />

      {
        user === null ?
          <LoginForm handleLogin={handleLogin} /> :
          <div>
            <h2>{user.name} logged in</h2>
            <button onClick={handleLogout}>Log out</button>
            {blogForm()}
            <h2>BLOGS</h2>
            <button onClick={sortBlogs} id='sort-button'>Sort by likes</button>
            {blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                addLike={() => increaseLikeOf(blog.id)}
                deleteBlog = {deleteBlog}
              />
            )
            }
          </div>
      }

    </div>
  );
};

export default App;