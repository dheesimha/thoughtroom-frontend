import axios from "axios";
let token = null;
const baseUrl = "/api/blogs";

const setToken = async (newToken) => {
  token = await `bearer ${newToken}`;
};

const getAll = async () => {
  token = JSON.parse(localStorage.getItem("loggedInBlogUser")).token;
  const config = {
    headers: {
      authorization: `bearer ${token}`,
    },
  };

  try {
    let request = await axios.get(baseUrl, config);
    return request.data;
  } catch (err) {
    return err;
  }
};

const getSingleBlog = (id) => {
  token = JSON.parse(localStorage.getItem("loggedInBlogUser")).token;
  const config = {
    headers: {
      authorization: `bearer ${token}`,
    },
  };
  try {
    const request = axios.get(`${baseUrl}/${id}`, config);
    return request.then((response) => response.data);
  } catch (err) {
    return err;
  }
};

const create = async (blog) => {
  token = JSON.parse(localStorage.getItem("loggedInBlogUser")).token;
  const config = {
    headers: {
      authorization: `bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(baseUrl, blog, config);

    return response.data;
  } catch (err) {
    return err;
  }
};

const update = async (id, username) => {
  token = JSON.parse(localStorage.getItem("loggedInBlogUser")).token;
  const config = {
    headers: {
      authorization: `bearer ${token}`,
    },
  };
  try {
    const response = await axios.put(`${baseUrl}/${id}`, { username }, config);
    return response.data;
  } catch (err) {
    return err;
  }
};

const deleteBlog = async (id) => {
  token = JSON.parse(localStorage.getItem("loggedInBlogUser")).token;
  const config = {
    headers: {
      authorization: `bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  } catch (err) {
    return err;
  }
};

let services = { getAll, setToken, create, update, deleteBlog, getSingleBlog };

export default services;
