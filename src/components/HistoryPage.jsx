import React, { useState, useEffect } from "react";
import "./styles/HistoryPage.css";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  // Load quiz history from localStorage
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    setHistory(savedHistory);
  }, []);

  // Clear all quiz history
  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear all quiz history?")) {
      localStorage.removeItem("quizHistory");
      setHistory([]);
    }
  };

  if (history.length === 0) {
    return (
      <div className="history-container">
        <h2>No quiz history yet 📚</h2>
        <p>Take some quizzes to see your results here!</p>
      </div>
    );
  }

  return (
    <div className="history-container">
      <div className="history-header">
        <h1>📖 Quiz History</h1>
        <button className="clear-btn" onClick={handleClearHistory}>
          Clear History
        </button>
      </div>

      <table className="history-table">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Username</th>
            <th>Subject</th>
            <th>Questions</th>
            <th>Score (%)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map((record, index) => {
            const scoreClass =
              record.percent >= 80
                ? "high"
                : record.percent >= 50
                ? "medium"
                : "low";

            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{record.username}</td>
                <td>{record.subject}</td>
                <td>{record.total}</td>
                <td className={scoreClass}>
                  <div className="score-container">
                    <span>{record.percent}%</span>
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{
                          width: `${record.percent}%`,
                          background:
                            record.percent >= 80
                              ? "#16a34a"
                              : record.percent >= 50
                              ? "#facc15"
                              : "#dc2626",
                        }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>{record.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryPage;
