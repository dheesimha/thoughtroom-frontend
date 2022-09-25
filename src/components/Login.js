import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { newUser } from "../reducers/userReducer";
import blogService from "../services/blogs";
import loginService from "../services/login";
import Navbar2 from "./Navbar2";
import Notification from "./Notification";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [intent, setIntent] = useState("");
  //   const [user, setUser] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      await localStorage.setItem("loggedInBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(newUser(user));
      setMessage(`Logged In as ${username}`);
      setIntent("success");
      setPassword("");
      setUsername("");
      setTimeout(() => {
        setMessage("");
        setIntent("");
        navigate("/blogs");
      }, 1500);
    } catch (err) {
      setMessage(`Login failed. Retry!`);
      setIntent("failure");
      setPassword("");
      setUsername("");
      setTimeout(() => {
        setMessage("");
        setIntent("");
      }, 3000);
    }
  };

  useEffect(() => {
    document.title = "Login - ThoughtRoom";
  }, []);
  return (
    <>
      <Navbar2 />
      {message ? <Notification message={message} intent={intent} /> : null}
      <div className="pageCol">
        <h2 id="loginHeader">Login</h2>
        <form onSubmit={handleSubmit}>
          <label id="usernameLabel" htmlFor="loginUsername">
            Username
          </label>
          <input
            id="loginUsername"
            type="text"
            autoComplete="off"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <br />
          <label id="passwordLabel" htmlFor="loginPassword">
            Password
          </label>
          <input
            id="loginPassword"
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <button id="loginSubmitBtn" type="submit">
            Login
          </button>
          <br />
          <br />
          <br />
          <p className="userLink">
            New User?{" "}
            <Link to="/register" className="signLinks">
              Sign Up
            </Link>{" "}
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
