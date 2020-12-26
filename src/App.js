import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserDataJSON = window.localStorage.getItem('loggedBlogAppUser');
    if(loggedUserDataJSON){
      const userData = JSON.parse(loggedUserDataJSON);
      setUser(userData);
      blogService.setToken(userData.token);
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault();
    try{
      const userData = await loginService.login({username, password});
      setUser(userData);
      blogService.setToken(userData.token);
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(userData));
      setUsername('');
      setPassword('');
    }
    catch(exception){
      setErrorMessage('Invalid username or password');
      setTimeout(()=>{
        setErrorMessage(null);
      }, 5000);
    }
  }


  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    blogService.setToken(null);
    setUser(null);
  }


  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const returnedBlog = await blogService.create({
        title, author, url
      });
      setBlogs(blogs.concat(returnedBlog));
      setTitle('');
      setAuthor('');
      setUrl('');
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

  
  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h2>Log in to application</h2>
        <div>
          Username:
            <input 
              name="Username"
              value={username}
              type="text"
              onChange = {event => setUsername(event.target.value)}
            />
        </div>
        <div>
          Password:
            <input 
              name="Password"
              value={password}
              type="password"
              onChange = {event => setPassword(event.target.value)}
            />
        </div>
        <button type="submit">Log in</button>
      </form>
    )
  }


  const blogForm = () => {
    return (
      <form onSubmit={addBlog}>
        <h2>Add a new blog</h2>
        <div>
          Title:
          <input 
            name="Title"
            type="text"
            value={title}
            onChange={(event)=>setTitle(event.target.value)}
          />
        </div>
        <div>
          Author:
          <input 
            name="Author"
            type="text"
            value={author}
            onChange={(event)=>setAuthor(event.target.value)}
          />
        </div>
        <div>
          URL:
          <input 
            name="URL"
            type="text"
            value={url}
            onChange={(event)=>setUrl(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    )
  }

  return (
    <div>
      <Notification 
        successMessage={successMessage}
        errorMessage={errorMessage}
      />

      {
        user === null ?        
        loginForm() :
        <div>
          <h2>{user.name} logged in</h2>
          <button onClick={handleLogout}>Log out</button>
          {blogForm()}
          <h2>BLOGS</h2>
          {blogs.map(blog => 
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }           
      
    </div>
  )
}

export default App