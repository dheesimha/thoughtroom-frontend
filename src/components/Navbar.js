import "../App.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Navbar({ loggedInAs }) {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();

    window.localStorage.clear();
    navigate("/login");
  };

  const [selected, setSelected] = useState("");

  const readClick = () => {
    setSelected("read");
  };

  const writeClick = () => {
    setSelected("write");
  };

  useEffect(() => {
    if (window.location.href.includes("write")) {
      setSelected("write");
    } else {
      setSelected("read");
    }
  }, [selected]);

  return (
    <div>
      <ul className="nav">
        <Link to="/blogs" className="navHeading" id="navTitle">
          ThoughtRoom
        </Link>
        <div className="endItems">
          <li
            className={`listItem otherNavComponent ${
              selected === "read" ? "selectedNav" : ""
            }`}
            onClick={readClick}
          >
            <Link to="/blogs">Read</Link>
          </li>
          <li
            className={`listItem otherNavComponent ${
              selected === "write" ? "selectedNav" : ""
            }`}
            onClick={writeClick}
          >
            <Link to="/write">Write</Link>
          </li>
          <li className="listItem usernameComponent">{loggedInAs} </li>
          <li className="listItem">
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
