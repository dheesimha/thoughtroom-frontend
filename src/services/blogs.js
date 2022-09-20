import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = async (newToken) => {
  token = await `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getSingleBlog = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const create = async (blog) => {
  const config = {
    headers: {
      authorization: token,
    },
  };

  const response = await axios.post(baseUrl, blog, config);

  return response.data;
};

const update = async (id, username) => {
  const response = await axios.put(`${baseUrl}/${id}`, { username });
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: {
      authorization: token,
    },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

let services = { getAll, setToken, create, update, deleteBlog, getSingleBlog };

export default services;
