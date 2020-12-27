import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

//this function is called from app.js when someone logs in with token returned from backend
const setToken = nowToken => {
  token = `bearer ${nowToken}`;
}

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}


const create = async (blogObject) => {
  const config = {
    headers : {Authorization : token}
  };  
  const response = await axios.post(baseUrl, blogObject, config);
  return response.data;
}


const update = async (id, newObject) => {
  let response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
}


const deleteBlog = async(id) => {
  const config = {
    headers : {Authorization : token}
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
}

export default { getAll, setToken, create, update, deleteBlog }