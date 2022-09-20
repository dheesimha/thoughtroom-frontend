import React, { useState } from "react";
import "../App.css";
import blogService from "../services/blogs";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Notification from "./Notification";

function BlogForm({ addBlog }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [intent, setIntent] = useState("");

  const addBlogHandler = async (e) => {
    e.preventDefault();
    const blogObject = {
      title: e.target[0].value,
      content: e.target[1].value,
    };

    try {
      await blogService.create(blogObject);
      await setIntent("success");
      await setMessage("Successfully published the blog !");
      setTimeout(() => {
        setIntent("");
        setMessage("");
        e.target[0].value = "";
        e.target[1].value = "";
        navigate("/blogs");
      }, 2000);
    } catch (err) {
      console.log(err);
      let finalError = err.response.data.error;

      if (finalError === "Missing token or invalid") {
        setIntent("failure");
        setMessage(finalError);
        setTimeout(() => {
          setIntent("");
          setMessage("");
          navigate("/login");
        }, 2500);
      } else if (finalError === "Title / Content missing") {
        setIntent("failure");
        setMessage(finalError);
        setTimeout(() => {
          setIntent("");
          setMessage("");
        }, 2500);
      } else {
        setIntent("failure");
        setMessage("Your token has expired. Kindly login again .");
        setTimeout(() => {
          setIntent("");
          setMessage("");
        }, 2500);
      }
      e.target[0].value = "";
      e.target[1].value = "";
    }
  };
  return (
    <div className="blogForm">
      <Navbar
        loggedInAs={JSON.parse(localStorage.getItem("loggedInBlogUser")).name}
      />
      {message ? <Notification message={message} intent={intent} /> : null}

      <div className="createBlog">
        <h1 className="blogh1">Create a new thought !</h1>
        <form onSubmit={addBlogHandler}>
          <label htmlFor="title" className="blogLabel">
            Title
          </label>
          <br />
          {/* <input
            className="titleInput"
            type="text"
            value={title}
            id="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          /> */}

          <textarea
            name="title"
            id="title"
            cols="70"
            rows="3"
            className="titleInput"
            maxLength="100"
          ></textarea>
          <br />
          <label htmlFor="content" className="blogLabel">
            Content
          </label>
          <br />
          <textarea
            name="content"
            id="content"
            cols="90"
            rows="10"
            className="contentInput"
          ></textarea>
          <br />
          <button type="submit" className="logout">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default BlogForm;
