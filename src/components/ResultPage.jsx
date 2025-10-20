import React from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import "./styles/ResultPage.css";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const quizData =
    location.state || JSON.parse(sessionStorage.getItem("lastQuiz"));

  if (!quizData) return <Navigate to="/setup" replace />;

  const { total, percent, correct, wrong, settings } = quizData;
  const subject = settings?.subject || "Unknown";

  const username = localStorage.getItem("username") || "guest";
  const email = localStorage.getItem("email") || "N/A";

  const quizResult = {
    username,
    email,
    subject,
    total,
    correct,
    wrong,
    percent,
    date: new Date().toLocaleString(),
  };

  const existingHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
  existingHistory.push(quizResult);
  localStorage.setItem("quizHistory", JSON.stringify(existingHistory));

  if (!sessionStorage.getItem("quizSaved")) {
    existingHistory.push(quizResult);
    localStorage.setItem("quizHistory", JSON.stringify(existingHistory));
    sessionStorage.setItem("quizSaved", "true");
  }

  return (
    <div className="result-container">
      {/* Remove the <header> here since Layout already shows navbar */}

      <main className="result-content">
        <h2 className="score-text">You Scored {percent}%</h2>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${percent}%` }}></div>
        </div>

        <div className="stats-card">
          <p className="total">Number of questions attempted: {total}</p>
          <div className="stat-box correct">
            ✅ Number of correct answers: {correct}
          </div>
          <div className="stat-box wrong">
            ❌ Number of wrong answers: {wrong}
          </div>
        </div>

        <div className="actions">
          <button className="retake-btn" onClick={() => navigate("/setup")}>
            Retake the quiz
          </button>
          <button className="history-btn" onClick={() => navigate("/history")}>
            History
          </button>
        </div>
      </main>
    </div>
  );
}
