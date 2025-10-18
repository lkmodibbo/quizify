import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles/QuizPage.css';

function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { settings, questions } = location.state || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600);
  const [answers, setAnswers] = useState([])
  const [showConfirm, setShowConfirm] = useState(false);


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

  function finishQuiz() {
    const total = questions.length;
    const correctCount = answers.filter(
      (answer, index) => answer === questions[index].correct_answer
    ).length
    const wrongCount = total - correctCount;
    const percent = Math.round((correctCount / total) * 100);

  const quizResult = {
    username: settings?.username || "Guest",
    subject: settings?.subject || "General",
    total,
    correct: correctCount,
    wrong: wrongCount,
    percent,
    date: new Date().toLocaleString()
  };

   sessionStorage.setItem("lastQuiz", JSON.stringify(quizResult));

   const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
   history.push(quizResult)
   localStorage.setItem("quizHistory", JSON.stringify(history))

    navigate("/result", { state: quizResult })
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
 
    const handleNext = () => {
  if (currentIndex < questions.length - 1) {
    setCurrentIndex((prev) => prev + 1);
    setSelectedOption(null);
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
    <div className='quiz-container'>
      <div className="quiz-header">
        <h2>{settings?.subject?.toLowerCase()} Quiz</h2>
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
            <button className='quit-btn' onClick={() => setShowConfirm(true)}>Submit Quiz</button>
          </div>
    </div>
    {showConfirm && (
      <div className='confirm-overlay'>
        <div className='confirm-card'>
          <h3>Are you sure you want to submit your quiz</h3>
          <div className='confirm-actions'>
            <button className='yes-btn' onClick={(finishQuiz)}>Yes, Submit</button>
            <button className='no-btn' onClick={() => setShowConfirm(false)}>No, Go Back</button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

export default QuizPage;
