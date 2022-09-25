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
  const [hideBackground, setHideBackground] = useState(true);

  const navigate = useNavigate();

  const handleClick = (val) => {
    setHideBackground(!val);
  };

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
    try {
      blogService.getSingleBlog(id).then((blog) => setBlogs(blog));
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  }, [id, navigate]);
  useEffect(() => {
    document.title = blogs.title + " - ThoughtRoom";
  }, [blogs.title]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const likeIncrement = async (id, username) => {
    try {
      await blogService.update(id, username);
      await blogService.getSingleBlog(id).then((blog) => setBlogs(blog));
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const likeDecrement = async (id, username) => {
    try {
      await blogService.update(id, username);
      await blogService.getSingleBlog(id).then((blog) => setBlogs(blog));
    } catch (err) {
      navigate("/login");
    }
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
        <Navbar loggedInAs={user.name} onClick={handleClick} />
        {hideBackground ? (
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
        ) : null}
      </>
    );
  }
}
export default SingleBlog;
