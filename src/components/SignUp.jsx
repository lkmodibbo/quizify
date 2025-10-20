import React from "react";
import "../components/styles/SignUp.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const SignUpSchema = Yup.object({
  fullName: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("email is required"),
  username: Yup.string()
    .min(3, "username must be at least 3 characters")
    .required("Enter Your username"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password do not match")
    .required("Confirm your password"),
});

const SignUp = ({ onSwitchToLogin }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("SignUp submitted:", values);

      const userData = {
        username: values.username,
        password: values.password,
        fullName: values.fullName,
        email: values.email,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      alert("Sign-up successful");
      resetForm();

      navigate("/");
    },
  });

  return (
    <form className="signup-form" onSubmit={formik.handleSubmit}>
      <div>
        <input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Enter Your Full Name"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <p className="error-text">{formik.errors.fullName}</p>
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
          <p className="error-text">{formik.errors.email}</p>
        )}
      </div>
      <div className="username">
        <input
          type="text"
          id="username"
          name="username"
          placeholder="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.username && formik.errors.username && (
          <p className="error-text">{formik.errors.username}</p>
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
          <p className="error-text">{formik.errors.password}</p>
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
          <p className="error-text">{formik.errors.confirmPassword}</p>
        )}
      </div>
      <button type="submit" className="signin-btn">
        Sign Up
      </button>
      <p className="switch-text">
        Already have an account?{" "}
        <span onClick={onSwitchToLogin}>Login here</span>
      </p>
    </form>
  );
};

export default SignUp;
