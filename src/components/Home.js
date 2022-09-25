import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Navbar2 from "./Navbar2";

function Home() {
  useEffect(() => {
    document.title = "Home - ThoughtRoom";
  }, []);
  return (
    <div className="home">
      <Navbar2 />
      <div className="homeMain">
        <div className="heroImg">
          <img
            src="/tr-home-banner.png"
            alt="home"
            width="400px"
            height="350px"
          />
        </div>

        <div className="nextSec">
          <p className="heroText">
            Stumble across thoughts,ponder over them or share your own thought !
          </p>
          <Link to="/register">
            <button id="homeSubmitBtn"> Get Started !</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
