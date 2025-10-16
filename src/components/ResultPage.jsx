import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import './styles/ResultPage.css';

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get data passed from QuizPage via navigate()
  const quizData = location.state || JSON.parse(sessionStorage.getItem('lastQuiz'));

  // Redirect if no quiz data is found
  if (!quizData) return <Navigate to="/setup" replace />;

  const { settings, score, total, percent } = quizData;

  return (
    <div className="result-page">
      <div className="result-card">
        <h2>Quiz Completed ✅</h2>

        <div className="result-info">
          <p><strong>Subject:</strong> {settings?.subject || 'N/A'}</p>
          <p><strong>Total Questions:</strong> {total}</p>
          <p><strong>Your Score:</strong> {score}</p>
          <p><strong>Percentage:</strong> {percent}%</p>
        </div>

        <div className="result-actions">
          <button
            className="try-again-btn"
            onClick={() => navigate('/setup')}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
