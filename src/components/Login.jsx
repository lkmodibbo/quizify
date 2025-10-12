import React from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import '../components/styles/Login.css'


const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be atleast 8 characters")
    .required("password is required")
});

const Login = ({ onSwitchToSignup }) => {
 const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: LoginSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Login Submitted:", values) 
      resetForm()
    }
 })

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert("Password recovery feature will be added soon!");
  };
  

  return (
    <form className="login-form" onSubmit={formik.handleSubmit}>
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

      <button className="sign-in" type="submit">Sign In</button>

      <p className="switch-text">
        Don’t have an account?{" "}
        <a href="#" onClick={onSwitchToSignup}>Sign up here!</a>
      </p>
    </form>
  );
};

export default Login;
