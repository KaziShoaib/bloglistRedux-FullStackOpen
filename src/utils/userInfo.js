export const getUserData = () => {
  //searching for log in info in the local storage
  const loggedUserDataJSON = window.localStorage.getItem('loggedBlogappUser');
  if(loggedUserDataJSON){
    //userData contains the token, username and name
    const userData = JSON.parse(loggedUserDataJSON);
    return userData;
  }
  return null;
};
