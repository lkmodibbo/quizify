import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar-container">
      <div
        className="logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <div className="nav-mark">?</div>
        <h1 className="nav-header">QuizMaster</h1>
      </div>

      <ul className="nav-ui">
        <li>
          <a href="/setup">Home</a>
        </li>
        <li>
          <a href="about">About</a>
        </li>
        <li>
          <a href="contact">Contact</a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
