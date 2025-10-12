import React from 'react';
import { useFormik } from 'formik'; // Assuming Formik is used
import { useNavigate } from 'react-router-dom'; // Assuming react-router-dom is used
import * as Yup from 'yup'; // Assuming Yup is used for validation

// --- External Dependencies Mock (Replace with your actual data/context) ---
// This is your data source for quiz questions
const SAMPLE = [
  { id: 1, question: 'What is a noun?', options: ['...', '...'], answer: 0, difficulty: 'easy' },
  { id: 2, question: 'Define photosynthesis.', options: ['...', '...'], answer: 0, difficulty: 'medium' },
  { id: 3, question: 'Advanced calculus query.', options: ['...', '...'], answer: 0, difficulty: 'hard' },
  // ... many more questions
];
// ------------------------------------------------------------------------

export default function SetupPage() {
  // 1. HOOKS and Initial Setup
  const navigate = useNavigate();

  // 2. Form Validation Schema (using Yup)
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    subject: Yup.string().required('Subject is required'),
    difficulty: Yup.string().required('Difficulty is required'),
    numQuestions: Yup.number()
      .min(1, 'Must be at least 1 question')
      .max(SAMPLE.length, `Max questions is ${SAMPLE.length}`)
      .required('Number of questions is required'),
  });

  // 3. Formik Initialization
  const formik = useFormik({
    initialValues: {
      name: '',
      subject: '',
      difficulty: 'medium',
      numQuestions: 5,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // 4. Submission Logic
      // For demo, we slice the local SAMPLE data based on user input.
      // In a real app, this is where you'd make an API call to fetch specific questions.
      const questions = SAMPLE.slice(0, Number(values.numQuestions));

      // Navigate to the quiz page, passing settings and the question set
      navigate('/quiz', { state: { settings: values, questions } });
    },
  });

  // 5. RENDER LOGIC (JSX)
  return (
    <div className="page layout-two-col">
      {/* --- Main Setup Panel --- */}
      <section className="panel">
        <h2 className="title">
          Welcome, **{formik.values.name || 'Student'}** 👋
        </h2>
        <p className="muted">Fill the form below to start your quiz.</p>

        <form onSubmit={formik.handleSubmit} className="form">
          {/* Input: Your name */}
          <label>
            Your name
            <input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="error">{formik.errors.name}</div>
            )}
          </label>

          {/* Input: Subject */}
          <label>
            Subject
            <input
              name="subject"
              value={formik.values.subject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="e.g. English"
            />
            {formik.touched.subject && formik.errors.subject && (
              <div className="error">{formik.errors.subject}</div>
            )}
          </label>

          {/* Select: Difficulty */}
          <label>
            Difficulty
            <select
              name="difficulty"
              value={formik.values.difficulty}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" disabled>Choose difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            {formik.touched.difficulty && formik.errors.difficulty && (
              <div className="error">{formik.errors.difficulty}</div>
            )}
          </label>

          {/* Input: Number of questions */}
          <label>
            Number of questions
            <input
              type="number"
              name="numQuestions"
              min="1"
              max={SAMPLE.length} // Dynamic max based on available questions
              value={formik.values.numQuestions}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.numQuestions && formik.errors.numQuestions && (
              <div className="error">{formik.errors.numQuestions}</div>
            )}
          </label>

          <button type="submit" className="primary">
            Start Quiz
          </button>
        </form>
      </section>

      {/* --- Side Preview Panel --- */}
      <aside className="panel panel-preview">
        <h3 className="title-sm">Preview</h3>
        <p className="muted">A short preview of questions will appear when you start the quiz.</p>
        <div className="preview-card">
          <h4>Q1. What is a noun?</h4>
          <ul>
            <li>Is a name of person, place, animal or thing</li>
            <li>An action word</li>
            <li>A describing word</li>
            <li>A joining word</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}