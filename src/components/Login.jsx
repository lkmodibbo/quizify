import React, { useState } from 'react'
import '../components/styles/Login.css'

const Login = ({ onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Submitted:", formData);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert("Password recovery feature will be added soon!");
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          id="email"
          name="email"  
          placeholder="Email or Username"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <input
          type="password"
          id="password"
          name="password"  
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <p className="forget-password">
          Forgot your password?{" "}
          <a href="#" onClick={handleForgotPassword}>Click here!</a>
        </p>
      </div>

      <button className="sign-in" type="submit">Sign In</button>

      <p className="switch-text">
        Don’t have an account?{" "}
        <a href="#" onClick={onSwitchToSignup}>Sign up here!</a>
      </p>
    </form>
  );
};

export default Login;
