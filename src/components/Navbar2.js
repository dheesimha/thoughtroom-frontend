import "../App.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Navbar2() {
  const [selected, setSelected] = useState("");

  const loginClick = () => {
    setSelected("login");
  };

  const registerClick = () => {
    setSelected("register");
  };

  useEffect(() => {
    if (window.location.href.includes("login")) {
      setSelected("login");
    } else if (window.location.href.includes("register")) {
      setSelected("register");
    }
  }, [selected]);

  return (
    <div>
      <ul className="nav2">
        <Link to="/" className="navHeading nav2Title">
          ThoughtRoom
        </Link>
        <div className="endItems2">
          <li
            className={`listItem2 otherNavComponent2 ${
              selected === "register" ? "selectedNav" : ""
            }`}
            onClick={registerClick}
          >
            <Link to="/register">Register</Link>
          </li>
          <li
            className={`listItem2 otherNavComponent2 ${
              selected === "login" ? "selectedNav" : ""
            }`}
            onClick={loginClick}
          >
            <Link to="/login">Login</Link>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Navbar2;
