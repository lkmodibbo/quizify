import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./styles/SetupPage.css";
import { getCategoryName } from "./CartegoryUtils";

export default function SetupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { settings } = location.state || {};

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
  const url = `${BASE_URL}?amount=${values.numQuestions}&category=${Number(values.subject)}&difficulty=${values.difficulty}&type=multiple`;
    try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.response_code === 1 || !data.results.length) {
      throw new Error("No questions found for this selection");
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

//   const getCategoryName = (id) => {
//   const categories = {
//     9: "General Knowledge",
//     10: "Entertainment: Books",
//     11: "Entertainment: Film",
//     12: "Entertainment: Music",
//     13: "Entertainment: Musicals & Theatres",
//     14: "Entertainment: Television",
//     15: "Entertainment: Video Games",
//     16: "Entertainment: Board Games",
//     17: "Science & Nature",
//     18: "Science: Computers",
//     19: "Science: Mathematics",
//     20: "Mythology",
//     21: "Sports",
//     22: "Geography",
//     23: "History",
//     24: "Politics",
//     25: "Art",
//     26: "Celebrities",
//     27: "Animals",
//     28: "Vehicles",
//     29: "Entertainment: Comics",
//     30: "Science: Gadgets",
//     31: "Entertainment: Japanese Anime & Manga",
//     32: "Entertainment: Cartoon & Animations",
//   };
//   return categories[id] || "Unknown Category";
// };

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
        <h2>{getCategoryName(Number(settings?.subject))} Quiz</h2>
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
          onBlur={formik.handleBlur}>
                <option value="" disabled>
                  Select Subject
        </option>
        <option value="9">General Knowledge</option>
        <option value="10">Entertainment: Books</option>
        <option value="11">Entertainment: Film</option>
        <option value="12">Entertainment: Music</option>
        <option value="13">Entertainment: Musicals & Theatres</option>
        <option value="14">Entertainment: Television</option>
        <option value="15">Entertainment: Video Games</option>
        <option value="16">Entertainment: Board Games</option>
        <option value="17">Science & Nature</option>
        <option value="18">Science: Computers</option>
        <option value="19">Science: Mathematics</option>
        <option value="20">Mythology</option>
        <option value="21">Sports</option>
        <option value="22">Geography</option>
        <option value="23">History</option>
        <option value="24">Politics</option>
        <option value="25">Art</option>
        <option value="26">Celebrities</option>
        <option value="27">Animals</option>
        <option value="28">Vehicles</option>
        <option value="29">Entertainment: Comics</option>
        <option value="30">Science: Gadgets</option>
        <option value="31">Entertainment: Japanese Anime & Manga</option>
        <option value="32">Entertainment: Cartoon & Animations</option>
      </select>

            {formik.touched.subject && formik.errors.subject && (
              <div className="error">{formik.errors.subject}</div>
            )}
            <select
              name="difficulty"
              value={formik.values.difficulty}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" disabled>
                Choose difficulty
              </option>
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
