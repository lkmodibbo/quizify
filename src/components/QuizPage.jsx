import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './styles/QuizPage.css';

function QuizPage({ onQuit }) {
  const location = useLocation();
  const { selectedSubject, questions } = location.state || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // const currentQuestion = questions?.[currentIndex];
  // if (!currentQuestion) return <p>Loading...</p>;

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const safeQuestions = questions && questions.length > 0
  ? questions
  : [
      {
        question: "What is the capital of Nigeria?",
        options: ["Abuja", "Lagos", "Kano", "Ibadan"],
      },
    ];
  const currentQuestion = safeQuestions[currentIndex]

  const handleNext = () => {
    if (currentIndex <safeQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedOption(null);
    }
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className='quiz-container'>
      <div className="quiz-header">
        <h2>{selectedSubject} Quiz</h2>
        <div className="timer">⏱ {formatTime(timeLeft)}</div>
      </div>

      <div className="question-section">
        <h3>Question {currentIndex + 1}/{safeQuestions.length}</h3>
        <p className='question-text'>{currentQuestion.question}</p>

        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${selectedOption === option ? "selected" : ""}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-footer">
        <button className='nav-btn' onClick={handlePrev} disabled={currentIndex === 0}>
          Prev
        </button>
        <button className='nav-btn' onClick={handleNext} disabled={currentIndex === safeQuestions.length - 1}>
          Next
        </button>
      </div>

      <button className='quit-btn' onClick={onQuit}>Submit Quiz</button>
    </div>
  );
}

export default QuizPage;
