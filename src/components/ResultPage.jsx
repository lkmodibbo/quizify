import React from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import "./styles/ResultPage.css";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get quiz data (from state or session storage)
  const quizData = location.state || JSON.parse(sessionStorage.getItem("lastQuiz"));

  if (!quizData) return <Navigate to="/setup" replace />;

  const { total, percent, correct, wrong } = quizData;

  return (
    <div className="result-container">
    
      <header className="result-header">
        <h1>QuizMaster</h1>
        <nav>
          <button onClick={() => navigate("/setup")}>Home</button>
          <button onClick={() => navigate("/history")}>History</button>
          <button onClick={() => navigate("/")}>Logout</button>
        </nav>
      </header>

      {/* Main Section */}
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
