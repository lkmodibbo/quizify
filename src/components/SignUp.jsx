import React, { useState } from 'react';
import '../components/styles/SignUp.css';

const SignUp = ({ onSwitchToLogin }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword){
      setError("Password do not match")
      return;
    }
    console.log("SignUp Submitted:", formData);
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    setError("");
    alert("Sign-up successfull")
  };

  return (
    <form className='signup-form' onSubmit={handleSubmit}>
      {error && <p className='error-text'>{error}</p>}
      <div>
        <input 
          type="text"
          id="fullname"
          name="username"
          placeholder="Enter Your Full Name"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <input 
          type="email"
          id="email"
          name="email"
          placeholder="Enter Your Email"
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
          placeholder="Enter Your Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <input 
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Your Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      <button type='submit' className='signin-btn'>Sign Up</button>

      <p className='switch-text'>
        Already have an account?{" "}
        <span onClick={onSwitchToLogin}>Login here</span>
      </p>
    </form>
  );
};

export default SignUp;
