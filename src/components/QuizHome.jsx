import React, { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import "../components/styles/QuizHome.css";

const QuizHome = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="home-page">
      {/* Overlay for better contrast */}
      <div className="overlay"></div>

      {/* Main content */}
      <div className="home-content">
        <div className="logo-section">
          <div className="mark">?</div>
          <h1 className="header">QuizMaster</h1>
        </div>

        <p className="subtitle">
          Challenge your mind. Master your knowledge. 🧠
        </p>

        <div className="btns">
          <div className="switch-btns">
            {/* <button
              className={`switch-btn ${showLogin ? 'active' : ''}`}
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
            <button
              className={`switch-btn ${!showLogin ? 'active' : ''}`}
              onClick={() => setShowLogin(false)}
            >
              Sign Up
            </button> */}
          </div>

          <div className="form-container">
            {showLogin ? (
              <Login onSwitchToSignup={() => setShowLogin(false)} />
            ) : (
              <SignUp onSwitchToLogin={() => setShowLogin(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizHome;
