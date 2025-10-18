import React, { useState, useEffect } from "react";
import "./styles/HistoryPage.css";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null); // for modal

  // Load quiz history from localStorage
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    setHistory(savedHistory);
  }, []);

  // Delete a single record
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      const updatedHistory = history.filter((_, i) => i !== index);
      setHistory(updatedHistory);
      localStorage.setItem("quizHistory", JSON.stringify(updatedHistory));
    }
  };

  // Clear all history
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
            <th>Actions</th>
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
              <tr key={index} onClick={() => setSelectedRecord(record)}>
                <td>{index + 1}</td>
                <td>{record.username}</td>
                <td>{record.subject}</td>
                <td>{record.total}</td>
                <td className={scoreClass}>{record.percent}%</td>
                <td>{record.date}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent modal open
                      handleDelete(index);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal */}
      {selectedRecord && (
        <div className="modal-overlay" onClick={() => setSelectedRecord(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Quiz Details</h2>
            <p>
              <strong>Username:</strong> {selectedRecord.username}
            </p>
            <p>
              <strong>Email:</strong> {selectedRecord.email || "N/A"}
            </p>
            <p>
              <strong>Subject:</strong> {selectedRecord.subject}
            </p>
            <p>
              <strong>Questions Attempted:</strong> {selectedRecord.total}
            </p>
            <p>
              <strong>Score:</strong> {selectedRecord.percent}%
            </p>
            <p>
              <strong>Date:</strong> {selectedRecord.date}
            </p>
            <button onClick={() => setSelectedRecord(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
