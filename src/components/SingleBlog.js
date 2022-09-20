import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import blogService from "../services/blogs";
import "../App.css";
import Navbar from "./Navbar";
import { FavoriteBorderOutlined, FavoriteRounded } from "@mui/icons-material";

function SingleBlog() {
  let [blogs, setBlogs] = useState([]);
  let [user, setUser] = useState(null);
  let id = useParams().id;

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedInBlogUser");

    if (loggedInUserJSON) {
      const users = JSON.parse(loggedInUserJSON);
      setUser(users);
    } else {
      navigate("/login");
    }
  }, [navigate]);
  useEffect(() => {
    blogService.getSingleBlog(id).then((blog) => setBlogs(blog));
  }, [id]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const likeIncrement = async (id, username) => {
    // console.log(username);
    await blogService.update(id, username);
    await blogService.getSingleBlog(id).then((blog) => setBlogs(blog));
    // setErrorMessage(`Liked`);
    // let blogList = await blogService.getAll ();
    // let revBlogList = blogList.reverse(blogList);
    // setBlogs(revBlogList);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const likeDecrement = async (id, username) => {
    // console.log(username);
    await blogService.update(id, username);
    await blogService.getSingleBlog(id).then((blog) => setBlogs(blog));

    // let blogList = await blogService.getAll();
    // let revBlogList = blogList.reverse(blogList);
    // setBlogs(revBlogList);
  };

  const handleLike = (id, username) => {
    return likeIncrement(id, username);
  };

  const handleUnlike = (id, username) => {
    return likeDecrement(id, username);
  };

  if (user !== null) {
    return (
      <>
        <Navbar loggedInAs={user.name} />
        <div className="singleBlog">
          <h1 id="singleBlogHeading">{blogs.title}</h1>
          <p className="authorPara">
            Author : {blogs.user ? blogs.user.name : null}
          </p>
          <p className="authorPara">
            {new Date(blogs.timeStamp).toDateString()}
          </p>
          <br />
          <p className="blogContentPara">{blogs.content}</p>
          <p className="iconsDiv">
            {blogs.likersList ? (
              blogs.likersList.includes(user.username) ? (
                <FavoriteRounded
                  style={{ color: "red" }}
                  className="liked"
                  onClick={() => handleUnlike(blogs.id, user.username)}
                />
              ) : (
                <FavoriteBorderOutlined
                  className="notLiked"
                  color="error"
                  onClick={() => {
                    handleLike(blogs.id, user.username);
                  }}
                />
              )
            ) : null}

            {blogs.likes}
          </p>
        </div>
      </>
    );
  }
}
export default SingleBlog;
