import React, { useState } from 'react';
import '../components/styles/SignUp.css';

const SignUp = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SignUp Submitted:", formData);
  };

  return (
    <form className='signup-form' onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fullname">Full Name</label>
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
        <label htmlFor="email">Email</label>
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
        <label htmlFor="password">Password</label>
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
        <label htmlFor="confirmPassword">Confirm Password</label>
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
