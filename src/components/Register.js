import React, { useState } from "react";
import registerService from "../services/register";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import Notification from "./Notification";
import Navbar2 from "./Navbar2";

function Register() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [intent, setIntent] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerService.registerUser({
        name,
        username,
        password,
      });

      await setIntent("success");
      await setMessage("Successfuly Registered! Please Log in .");
      await setName("");
      await setUsername("");
      await setPassword("");
      setTimeout(() => {
        setIntent("");
        setMessage("");
        navigate("/login");
      }, 1500);
    } catch (error) {
      let finalError = error.response.data.error;
      if (
        finalError === "Username/password length must be more than 3 characters"
      ) {
        setIntent("failure");
        setMessage("Username/password length must be more than 3 characters.");
        setTimeout(() => {
          setIntent("");
          setMessage("");
          setName("");
          setUsername("");
          setPassword("");
        }, 2500);
      } else if (finalError === "username must be unique") {
        setIntent("failure");
        setMessage("Username already taken ! Try another username .");
        setTimeout(() => {
          setIntent("");
          setMessage("");
          setName("");
          setUsername("");
          setPassword("");
        }, 3000);
      } else if (finalError === "Enter all the fields") {
        setIntent("failure");
        setMessage("Enter all the fields.");
        setTimeout(() => {
          setIntent("");
          setMessage("");
          setName("");
          setUsername("");
          setPassword("");
        }, 2500);
      } else {
        setIntent("failure");
        setMessage("An error occured.Try again.");
        setTimeout(() => {
          setIntent("");
          setMessage("");
          setName("");
          setUsername("");
          setPassword("");
        }, 2500);
      }
    }
  };
  return (
    <>
      <Navbar2 />
      <div className="pageCol2">
        {message ? <Notification message={message} intent={intent} /> : null}
        <h2 id="RegisterHeader">Register</h2>
        <form onSubmit={handleSubmit}>
          <label id="nameLabel" htmlFor="name">
            First Name
          </label>
          <input
            id="RegisterName"
            type="text"
            autoComplete="off"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <label id="usernameLabel" htmlFor="RegisterUsername">
            Username
          </label>
          <input
            id="RegisterUsername"
            type="text"
            autoComplete="off"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <br />
          <label id="passwordLabel" htmlFor="RegisterPassword">
            Password
          </label>
          <input
            id="RegisterPassword"
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <br />
          <button id="RegisterSubmitBtn" type="submit">
            Sign Up
          </button>
          <br />
          <br />
          <br />
          <p className="userLink">
            Already a registered user?{" "}
            <Link to="/login" className="signLinks">
              Sign In
            </Link>{" "}
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
