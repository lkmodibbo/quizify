import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles/QuizPage.css';
import Navbar from './Navbar';

function QuizPage({ onQuit }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { settings, questions } = location.state || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([])

  React.useEffect(() => {
    if (!questions || questions.length === 0) {
      navigate('/')
    }
  }, [settings, questions, navigate])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      finishQuiz()
    }
  }, [timeLeft])

  function computerScore(questions, answers) {
    let score = 0;
    for (let i = 0; i < questions.length, i++){
      if (!answers[i] ) continue; // unanswerd treat as incorret
      if (answers[i] === questions[i].correct_answer) score++;
    }
    return score;
  }

  function finishQuiz() {
    const score = computerScore(questions, answers);
    const total = questions.length;
    const percent = Math.round((score / total) * 100);
    //optionally save to sessionStorage for resilience
    sessionStorage.setItem('lastQuiz', JSON.stringify({ settings, score, total, percent}))
    navigate('/result', { state: { settings, score, total, percent}})
  }
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  function handleSelect(option) {
    setAnswers(prev => {
      const copy = [...prev];
      copy[currentIndex] = option;
      return copy;
    })
    setSelectedOption(option)
  }
  // const handleSelect = (option) => {
  //   setSelectedOption(option)
  // }

  const handleNext = () => {
    const currentQuestion = questions[currentIndex];
    if (selectedOption === currentQuestion.correct_answer) {
      setScore((prev) => prev + 1);
    }
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setSelectedOption(null)
    } else {
      navigate('/result', {
        state: { score, total: questions.length, name: settings.name},
      });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedOption(null);
    }
  };
  if (!questions || questions.length === 0) {
    return <p className='loading'>Loading questions...</p>
  }
  const currentQuestion = questions[currentIndex]
  return (
    <>
     <Navbar />
    <div className='quiz-container'>
      <div className="quiz-header">
        <h2>{settings?.subject?.toUpperCase()} Quiz</h2>
        <div className="timer">⏱ {formatTime(timeLeft)}</div>
      </div>

      <div className="question-section">
        <h3>Question {currentIndex + 1}/{questions.length}</h3>
        <p className='question-text'>{currentQuestion.question}</p>

        <div className="options">
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
          className='nav-btn' 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
        >
          Prev
        </button>
        <button 
          className='nav-btn' 
          onClick={handleNext} 
          disabled={!selectedOption}
          >
         {currentIndex ===questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
          <div className='submit-btn'>
            <button className='quit-btn' onClick={onQuit}>Submit Quiz</button>
          </div>
    </div>
    </>
  );
}

export default QuizPage;
