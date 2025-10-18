import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import '../components/styles/Login.css'
import { Link } from 'react-router-dom';


const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be atleast 8 characters")
    .required("password is required")
});

const Login = ({ onSwitchToSignup }) => {
  const [error, setError] = useState("")

 const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: LoginSchema,
    onSubmit: (values, { resetForm }) => {
      localStorage.setItem("username", values.email)
      const storedUser = JSON.parse(localStorage.getItem("user"))
      if (!storedUser) {
        setError("No User Found. Please sign up first")
        return;
      }

      if (
        values.username === storedUser.username && 
        values.password === storedUser.password
      ) {
        localStorage.setItem("username", formik.values.username);
        window.location.href = "/setup"
        resetForm()
      } else {
        setError("Invalid username or password")
      }
      console.log("Login Submitted:", values) 

      localStorage.setItem("username", values.email)
    }
 })

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert("Password recovery feature will be added soon!");
  };

  return (
    <form className="login-form" onSubmit={formik.handleSubmit}>
      {error && <p className='error-text'>{error}</p>}
      
      <div>
        <input
          type="email"
          id="email"
          name="email"  
          placeholder="Email or Username"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.email && formik.errors.email && (
          <p className='error-text'>{formik.errors.email}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          id="password"
          name="password"  
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.password && formik.errors.password && (
          <p className='error-text'>{formik.errors.password}</p>
        )}
        <p className="forget-password">
          Forgot your password?{" "}
          <a href="#" onClick={handleForgotPassword}>Click here!</a>
        </p>
      </div>

        <Link to="/setup" className='sign-in-link'>
            <button className="sign-in" type="submit">Sign In</button>
        </Link>
        
      <p className="switch-text">
        Don’t have an account?{" "}
        <a href="#" onClick={onSwitchToSignup}>Sign up here!</a>
      </p>
    </form>
  );
};

export default Login;
