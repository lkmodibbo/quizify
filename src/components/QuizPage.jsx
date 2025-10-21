import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCategoryName } from "./CartegoryUtils";
import "./styles/QuizPage.css";

function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { settings, questions } = location.state || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [unansweredCount, setUnansweredCount] = useState(false);
  const [showIncompleteModal, setShowIncompleteModal] = useState(0)
  const [timeLeft, setTimeLeft] = useState(() => {
    const minutesPerQuestion = 1;
    const totalMinutes = (questions?.length || 10) * minutesPerQuestion;
    return totalMinutes * 60;
  });

  useEffect(() => {
    if (!questions || questions.length === 0) {
      navigate("/");
    }
  }, [settings, questions, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      finishQuiz();
    }
  }, );

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  function handleSelect(option) {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[currentIndex] = option;
      return copy;
    });
    setSelectedOption(option);
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setShowConfirm(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedOption(null);
    }
  };

  const handleManualSubmit = () => {
    const unanswered = questions.length - answers.filter(Boolean).length;
    setUnansweredCount(unanswered)

    if (unanswered > 0) {
      setShowIncompleteModal(true)
    } else {
      setShowConfirm(true)
    }
  }
  function finishQuiz() {
    if (hasSaved) return;
    setHasSaved(true);

    const total = questions.length;
    const correctCount = answers.filter(
      (answer, index) => answer === questions[index].correct_answer
    ).length;

    const quizResult = {
      username:
        (localStorage.getItem("username") || settings?.username || "Guest")
          .toLowerCase()
          .replace(/^\w/, (c) => c.toUpperCase()),
      subject: getCategoryName(Number(settings?.subject)) || "General",
      total,
      correct: correctCount,
      wrong: total - correctCount,
      percent: Math.round((correctCount / total) * 100),
      date: new Date().toLocaleString(),
    };

    const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
    history.push(quizResult);
    localStorage.setItem("quizHistory", JSON.stringify(history));

    navigate("/result", { state: quizResult });
  }

  if (!questions || questions.length === 0) {
    return <p className="loading">Loading questions...</p>;
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-wrapper">
      <div className="quiz-card">
        <div className="quiz-header">
          <button 
            className="submit-btn"
            onClick={handleManualSubmit}>
            Submit
          </button>
          <h2 className="quiz-title">
            {getCategoryName(Number(settings?.subject))} Quiz
          </h2>
          <div className="timer">⏱ {formatTime(timeLeft)}</div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="question-section">
          <h3>
            Question {currentIndex + 1}/{questions.length}
          </h3>
          <p className="question-text">{currentQuestion.question}</p>

          <div className="options-grid">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${
                  selectedOption === option ? "selected" : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="quiz-footer">
          <button
            className="nav-btn prev"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            ← Previous
          </button>
          <button
            className="nav-btn next"
            onClick={handleNext}
            disabled={!selectedOption}
          >
            {currentIndex === questions.length - 1 ? "Finish" : "Next →"}
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-card">
            <h3>Are you sure you want to submit your quiz?</h3>
            <div className="confirm-actions">
              <button className="yes-btn" onClick={finishQuiz}>
                Yes, Submit
              </button>
              <button className="no-btn" onClick={() => setShowConfirm(false)}>
                No, Go Back
              </button>
            </div>
          </div>
        </div>
      )}
      {showIncompleteModal && (
        <div className="confirm-overlay">
          <div className="confirm-card">
            <h3>You still have <span>{unansweredCount}</span>
            unanswered {unansweredCount === 1 ? "questions" : "questions"}
            </h3>
            <p>Are you sure you want to submit now ?</p>
            <div className="confirm-actions">
              <button 
                className="yes-btn"
                onClick={() => {
                  setShowIncompleteModal(false)
                  finishQuiz()
                }}
              >
                Yes, Submit
              </button>
              <button 
                className="no-btn"
                onClick={() => setShowIncompleteModal(false)}
                >
                No, Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizPage;
