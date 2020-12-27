import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)  
  //we will use this ref to access functions defined in other components
  //i.e. components that are rendered from the App component
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])  

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
  }, [])


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
      
    }
    catch(exception){
      setErrorMessage('Invalid username or password');
      setTimeout(()=>{
        setErrorMessage(null);
      }, 5000);
    }
  }


  const handleLogout = () => {
    //clearing the local storage of the userData
    window.localStorage.removeItem('loggedBlogappUser');
    //setting the blogService local variable token to null
    blogService.setToken(null);
    setUser(null);
  }


  const addBlog = async (blogObject) => {
    //we can access the toggleVisible function defined in the 
    //Togglable component from this App component because of the ref mechanism
    //details inside the Togglable component
    blogFormRef.current.toggleVisible();
    try {
      const returnedBlog = await blogService.create(blogObject);
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);      
      setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`);
      setTimeout(()=>{
        setSuccessMessage(null);
      }, 5000);
      
    } catch(exception){
      setErrorMessage(exception.response.data.error);
      setTimeout(()=>{
        setErrorMessage(null);
      }, 5000);
    }
  }

  const deleteBlog = async(id) => {
    try {
      await blogService.deleteBlog(id);
      setBlogs(blogs.filter(b => b.id !== id));
    } catch(exception) {
      setErrorMessage(exception.data.error.message);
      setTimeout(()=>{
        setErrorMessage(null)
      }, 5000);
    }
  }


  const increaseLikeOf = async (id) => {
    let blog = blogs.find(b => b.id === id);
    //console.log('old blog : ',blog)
    let likeObj = { likes : blog.likes + 1};
    //console.log('changed blog : ',changedBlog);
    try {
      // const returnedBlog = await blogService.update(id, likeObj);
      // setBlogs(blogs.map(b => b.id === id ? returnedBlog : b));
      await blogService.update(id, likeObj);
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);      
    } catch(exception) {
      setErrorMessage(`Blog ${blog.title} has been deleted`);
      setTimeout(()=>{
        setErrorMessage(null);
      }, 5000);
      setBlogs(blogs.filter(b => b.id !== id));
    }
  }
  

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
  } 

  return (
    <div>
      <Notification 
        successMessage={successMessage}
        errorMessage={errorMessage}
      />

      {
        user === null ?        
        <LoginForm handleLogin={handleLogin} /> :
        <div>
          <h2>{user.name} logged in</h2>
          <button onClick={handleLogout}>Log out</button>
          {blogForm()}
          <h2>BLOGS</h2>
          {blogs
            .sort((bloga, blogb) => blogb.likes - bloga.likes).map(blog => 
              <Blog 
                key={blog.id} 
                blog={blog} 
                addLike={()=>increaseLikeOf(blog.id)} 
                deleteBlog = {deleteBlog}
              />
           )
          }
        </div>
      }           
      
    </div>
  )
}

export default App