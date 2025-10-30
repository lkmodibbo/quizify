import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate, } from "react-router-dom";
import * as Yup from "yup";
import "./styles/SetupPage.css";
// import { getCategoryName } from "./CartegoryUtils";
import SelectDropdown from "./SelectDropdown";

export default function SetupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const location = useLocation();
  // const { settings } = location.state || {};

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
      difficulty: "select",
      numQuestions: 20,
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
        {/* <h2>{getCategoryName(Number(settings?.subject))} Quiz</h2> */}
        <div className="back-to-login">
          <p className="switch-text"></p>
          <p className="muted">Fill the form below to start your quiz.</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="setup-form">
            <SelectDropdown 
              name="subject"
              placeholder="Select Subject"
              options={[
                  { value: "9", label: "General Knowledge" },
                  { value: "10", label: "Entertainment: Books" },
                  { value: "11", label: "Entertainment: Film" },
                  { value: "12", label: "Entertainment: Music" },
                  { value: "13", label: "Entertainment: Musicals & Theatres" },
                  { value: "14", label: "Entertainment: Television" },
                  { value: "15", label: "Entertainment: Video Games" },
                  { value: "16", label: "Entertainment: Board Games" },
                  { value: "17", label: "Science & Nature" },
                  { value: "18", label: "Science: Computers" },
                  { value: "19", label: "Science: Mathematics" },
                  { value: "20", label: "Mythology" },
                  { value: "21", label: "Sports" },
                  { value: "22", label: "Geography" },
                  { value: "23", label: "History" },
                  { value: "24", label: "Politics" },
                  { value: "25", label: "Art" },
                  { value: "26", label: "Celebrities" },
                  { value: "27", label: "Animals" },
                  { value: "28", label: "Vehicles" },
                  { value: "29", label: "Entertainment: Comics" },
                  { value: "30", label: "Science: Gadgets" },
                  { value: "31", label: "Entertainment: Japanese Anime & Manga" },
                  { value: "32", label: "Entertainment: Cartoon & Animations" },
              ]}
              value={formik.values.subject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.subject}
              touched={formik.touched.subject}
            />
          <label>
            <SelectDropdown 
              // label= "Difficulty"
              name= "difficulty"
              options={[

                { value: "select", label: "Select Difficulty"},
                { value: "easy", label: "Easy"},
                { value: "medium", label: "Medium"},
                { value: "hard", label: "Hard"}
              ]}
              value={formik.values.difficulty}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.difficulty}
              touched={formik.touched.difficulty}
            />
            <SelectDropdown 
              // label= "Number of Questions"
              name="numQuestions"
              options={Array.from({ length: 20}, (_, i) => ({
                value: i + 1,
                label: `${i + 1}`,
              }))}
              value={formik.values.numQuestions}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.numQuestions}
              touched={formik.touched.numQuestions}
            />
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
