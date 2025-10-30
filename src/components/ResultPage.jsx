import React, { useEffect } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import "./styles/ResultPage.css";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const quizData =
    location.state || JSON.parse(sessionStorage.getItem("lastQuiz"));

  const username = localStorage.getItem("username") || "Guest";
  const email = localStorage.getItem("email") || "N/A";
  const { total, percent, correct, wrong, settings } = quizData || {};
  const subject = settings?.subject || "Unknown";

  //  Always call hook first (no early return above it)
  useEffect(() => {
    if (!quizData) return; // safe check inside effect

    if (!sessionStorage.getItem("quizSaved")) {
      const existingHistory =
        JSON.parse(localStorage.getItem("quizHistory")) || [];
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
      existingHistory.push(quizResult);
      localStorage.setItem("quizHistory", JSON.stringify(existingHistory));
      sessionStorage.setItem("quizSaved", "true");
    }
  }, [quizData, username, email, subject, total, correct, wrong, percent]);

  //  Return redirect after hook
  if (!quizData) return <Navigate to="/setup" replace />;

  const getMessage = () => {
    if (percent >= 80) return "🏆 Excellent work! You're a star student!";
    if (percent >= 60) return "👏 Great job! Keep learning and improving!";
    if (percent >= 40) return "💡 Nice try! A bit more effort and you’ll ace it!";
    return "💪 Don’t give up! Practice makes perfect!";
  };

  return (
    <div className="result-page">
      <div className="result-card">
        <h1 className="result-title">Quiz Result</h1>
        <p className="student-name">🎓 {username}</p>
        <p className="subject-name">Subject: {subject}</p>

        <div className="score-circle" style={{ "--percent": percent }}>
          <div className="score-inner">{percent}%</div>
        </div>

        <p className="message">{getMessage()}</p>

        <div className="stats-grid">
          <div className="stat-card correct">
            ✅ Correct Answers <span>{correct}</span>
          </div>
          <div className="stat-card wrong">
            ❌ Wrong Answers <span>{wrong}</span>
          </div>
          <div className="stat-card total">
            📊 Total Questions <span>{total}</span>
          </div>
          <div className="stat-card score">
            🧠 Score <span>{percent}%</span>
          </div>
        </div>

        <div className="actions">
          <button className="btn retake" onClick={() => navigate("/setup")}>
            🔁 Retake Quiz
          </button>
          <button className="btn history" onClick={() => navigate("/history")}>
            📜 View History
          </button>
        </div>

        <p className="footer-note">Keep up the great work, {username}! 🌱</p>
      </div>
    </div>
  );
}
