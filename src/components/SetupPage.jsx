import React from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Navbar from './Navbar';
import './styles/SetupPage.css'; // 👈 Import your CSS here

const SAMPLE = [
  { id: 1, question: 'What is a noun?', options: ['...', '...'], answer: 0, difficulty: 'easy' },
  { id: 2, question: 'Define photosynthesis.', options: ['...', '...'], answer: 0, difficulty: 'medium' },
  { id: 3, question: 'Advanced calculus query.', options: ['...', '...'], answer: 0, difficulty: 'hard' },
  { id: 4, question: 'What is a noun?', options: ['...', '...'], answer: 0, difficulty: 'easy' },
  { id: 5, question: 'Define photosynthesis.', options: ['...', '...'], answer: 0, difficulty: 'medium' },
  { id: 6, question: 'Advanced calculus query.', options: ['...', '...'], answer: 0, difficulty: 'hard' },
  { id: 7, question: 'What is a noun?', options: ['...', '...'], answer: 0, difficulty: 'easy' },
  { id: 8, question: 'Define photosynthesis.', options: ['...', '...'], answer: 0, difficulty: 'medium' },
  { id: 9, question: 'Advanced calculus query.', options: ['...', '...'], answer: 0, difficulty: 'hard' },
  { id: 10, question: 'What is a noun?', options: ['...', '...'], answer: 0, difficulty: 'easy' },
  { id: 11, question: 'Define photosynthesis.', options: ['...', '...'], answer: 0, difficulty: 'medium' },
  { id: 12, question: 'Advanced calculus query.', options: ['...', '...'], answer: 0, difficulty: 'hard' },
  { id: 13, question: 'What is a noun?', options: ['...', '...'], answer: 0, difficulty: 'easy' },
  { id: 14, question: 'Define photosynthesis.', options: ['...', '...'], answer: 0, difficulty: 'medium' },
  { id: 15, question: 'Advanced calculus query.', options: ['...', '...'], answer: 0, difficulty: 'hard' },
  { id: 16, question: 'What is a noun?', options: ['...', '...'], answer: 0, difficulty: 'easy' },
  { id: 17, question: 'Define photosynthesis.', options: ['...', '...'], answer: 0, difficulty: 'medium' },
  { id: 18, question: 'Advanced calculus query.', options: ['...', '...'], answer: 0, difficulty: 'hard' },

];

export default function SetupPage() {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    subject: Yup.string().required('Subject is required'),
    difficulty: Yup.string().required('Difficulty is required'),
    numQuestions: Yup.number()
      .min(1, 'Must be at least 1 question')
      .max(SAMPLE.length, `Max questions is ${SAMPLE.length}`)
      .required('Number of questions is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      subject: '',
      difficulty: 'medium',
      numQuestions: 5,
    },
    validationSchema,
    onSubmit: (values) => {
      const questions = SAMPLE.slice(0, Number(values.numQuestions));
      navigate('/quiz', { state: { settings: values, questions } });
    },
  });

  return (
    <div className="setup-page">
      <Navbar />
      <section className="setup-card">
        <div className="back-to-login">
          <p className='switch-text'>
          <Link to="/">Back to Login</Link>
        </p>
        </div>
        <h2 className="title">Welcome, {formik.values.name || 'Student'} 👋</h2>
        <p className="muted">Fill the form below to start your quiz.</p>

        <form onSubmit={formik.handleSubmit} className="setup-form">

          <label>
            Select Subject
            <select 
              name="select-subject"
              value={formik.values.selectSubject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" disabled>Select Subject</option>
              <option value="english">English</option>
              <option value="maths">Mathematics</option>
              <option value="basic-science">Basic Science</option>
              <option value="computer">Computer</option>
              <option value="social-values">National Values</option>
            </select>
            {formik.touched.selectSubject && formik.errors.selectSubject && (
              <div className="error">{formik.errors.selectSubject}</div>
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
              <option value="" disabled>Choose difficulty</option>
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
              max={SAMPLE.length}
              value={formik.values.numQuestions}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.numQuestions && formik.errors.numQuestions && (
              <div className="error">{formik.errors.numQuestions}</div>
            )}
          </label>

            <Link to="/quiz-page">
          <button 
             type="submit" className="primary-btn">   
              Start Quiz
          </button>
            </Link>
        </form>

      </section>
    </div>
  );
}
