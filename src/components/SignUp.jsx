import React from 'react';
import '../components/styles/SignUp.css';
import * as Yup from "yup"
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

const SignUpSchema = Yup.object({
  username: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password do not match")
    .required("Confirm your password")
  });

const SignUp = ({ onSwitchToLogin }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: SignUpSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("SignUp submitted:", values);
      alert("Sign-up successful")
      resetForm();
    }
  })

  return (
    <form className='signup-form' onSubmit={formik.handleSubmit}>
      {/* {error && <p className='error-text'>{error}</p>} */}
      <div>
        <input 
          type="text"
          id="fullname"
          name="username"
          placeholder="Enter Your Full Name"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.username && formik.errors.username && (
          <p className='error-text'>{formik.errors.username}</p>
        )}
      </div>

      <div>
        <input 
          type="email"
          id="email"
          name="email"
          placeholder="Enter Your Email"
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
          placeholder="Enter Your Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.password && formik.errors.password && (
          <p className='error-text'>{formik.errors.password}</p>
        )}
      </div>

      <div>
        <input 
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Your Password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <p className='error-text'>{formik.errors.confirmPassword}</p>
        )}
      </div>
        <Link to="/setup" className='sign-up-link'>
            <button type='submit' className='signin-btn'>Sign Up</button>
        </Link>
      <p className='switch-text'>
        Already have an account?{" "}
        <span onClick={onSwitchToLogin}>Login here</span>
      </p>
    </form>
  );
};

export default SignUp;
