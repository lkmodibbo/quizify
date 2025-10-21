import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Navbar from "./Navbar";
import "./styles/SetupPage.css";

export default function SetupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  console.log("BASE_URL =", BASE_URL);

  const navigate = useNavigate();
  const validationSchema = Yup.object({
    subject: Yup.string().required("Subject is required"),
    difficulty: Yup.string().required("Difficulty is required"),
    numQuestions: Yup.number()
      .min(1, "Must be at least 1 question")
      .max(20, `Max questions is 20`)
      .required("Number of questions is required"),
  });

  const fetchQuestions = async (values) => {
    const category = getCategory(values.subject);
    const url = `${BASE_URL}?amount=${values.numQuestions}&category=${category}&difficulty=${values.difficulty}&type=multiple`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // If no questions found, try again with no difficulty filter
      if (data.response_code === 1 || !data.results.length) {
        const fallbackUrl = `${BASE_URL}?amount=${values.numQuestions}&category=${category}&type=multiple`;
        const fallbackResponse = await fetch(fallbackUrl);
        const fallbackData = await fallbackResponse.json();

        if (!fallbackData.results.length) {
          throw new Error("No questions found for this selection");
        }
        return fallbackData.results;
      }

      return data.results;
    } catch (err) {
      console.error("Error fetching questions:", err);
      throw err;
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      subject: "",
      difficulty: "medium",
      numQuestions: 5,
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchQuestions(values);

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("No questions found for this selection");
        }
        const formattedQuestions = data.map((q) => ({
          question: decodeHTML(q.question),
          options: shuffleArray([
            ...q.incorrect_answers.map(decodeHTML),
            decodeHTML(q.correct_answer),
          ]),
          correct_answer: decodeHTML(q.correct_answer),
        }));

        navigate("/quiz-page", {
          state: { settings: values, questions: formattedQuestions },
        });
      } catch (err) {
        console.log(err);
        setError(err.message || "Failed to fetch questions");
      } finally {
        setLoading(false);
      }
    },
  });

  const getCategory = (subject) => {
    const categories = {
      english: 10,
      maths: 19,
      "basic-science": 17,
      computer: 18,
      "social-values": 22,
    };
    return categories[subject] || 9;
  };

  const decodeHTML = (text) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  };
  const user = JSON.parse(localStorage.getItem("user"));

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
  return (
    <div className="setup-page">
      <section className="setup-card">
        <Link className="back-to-login" to="/">
          Back to Login
        </Link>
        <h2 className="title">
          Welcome, {user?.username ? user.username : "Guest"}
        </h2>
        <div className="back-to-login">
          <p className="switch-text"></p>
          <p className="muted">Fill the form below to start your quiz.</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="setup-form">
          <label>
            Select Subject
            <select
              name="subject"
              value={formik.values.subject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" disabled>
                Select Subject
              </option>
              <option value="english">English</option>
              <option value="maths">Mathematics</option>
              <option value="basic-science">Basic Science</option>
              <option value="computer">Computer</option>
              <option value="social-values">National Values</option>
              <option value="islamic">Islamic Studies</option>
              <option value="phonics">Phonics</option>
              <option value="basic-technology">Basic Techonology</option>
              <option value="hausa">Hausa</option>
              <option value="agric-science">Agricultural Science</option>
              <option value="further-maths">Further Mathematics</option>
            </select>
            {formik.touched.subject && formik.errors.subject && (
              <div className="error">{formik.errors.subject}</div>
            )}
          </label>

          <label>
            Difficulty
            <select
              name="difficulty"
              value={formik.values.difficulty}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" disabled>
                Choose difficulty
              </option>
              <option value="easy">Choose Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            {formik.touched.difficulty && formik.errors.difficulty && (
              <div className="error">{formik.errors.difficulty}</div>
            )}
          </label>

          <label>
            Number of questions
            <input
              type="number"
              name="numQuestions"
              min="1"
              max="20"
              value={formik.values.numQuestions}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.numQuestions && formik.errors.numQuestions && (
              <div className="error">{formik.errors.numQuestions}</div>
            )}
          </label>
          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? "Loading..." : "Start Quiz"}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </section>
    </div>
  );
}
