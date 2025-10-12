import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// NOTE: I am assuming `useQuizContext` or similar is used to get `questions`,
// `current`, `answers`, `selectOption`, `handleNext`, and `handlePrev`.
// For a standalone example, these would need to be defined or imported.

// Mock data and handlers for completeness (replace with actual context/hooks)
const MOCK_QUESTIONS = [
  // ... quiz questions data structure
];
const MOCK_TOTAL_SECONDS = 600; // 10 minutes

export default function QuizPage({
  questions = MOCK_QUESTIONS,
  current = 0,
  answers = {},
  selectOption = () => {},
  handleNext = () => {},
  handlePrev = () => {},
  totalTime = MOCK_TOTAL_SECONDS,
}) {
  // 1. HOOKS and State Management
  const navigate = useNavigate();
  // We'll manage the timer state and a flag for when the quiz ends
  const [secondsLeft, setSecondsLeft] = useState(totalTime);
  const [isFinished, setFinished] = useState(false);

  // 2. SIDE EFFECTS (useEffect)

  // Timer Effect: Counts down the time and calls handleFinish when time runs out
  useEffect(() => {
    if (isFinished || secondsLeft <= 0) {
      if (secondsLeft <= 0 && !isFinished) {
        handleFinish(); // Auto-finish if time hits zero
      }
      return;
    }

    const timerId = setInterval(() => {
      setSecondsLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId); // Cleanup function
  }, [secondsLeft, isFinished]); // Re-run when time or finish status changes

  // 3. HANDLER FUNCTIONS

  /**
   * Calculates the final score, sets the finished state, and navigates to the results page.
   */
  function handleFinish() {
    setFinished(true);

    // Calculate score: accumulate 1 for every question where the selected answer (answers[q.id])
    // matches the correct answer (q.answer).
    const score = questions.reduce((acc, q) => {
      // Assuming q.answer is the index of the correct option
      return acc + (answers[q.id] === q.answer ? 1 : 0);
    }, 0);

    // Navigate and pass results data in the state
    navigate('/results', { state: { score, total: questions.length, answers } });
  }

  // 4. EARLY EXIT/GUARD CLAUSE
  // Stop rendering if there are no questions available
  if (!questions || questions.length === 0) {
    return null;
  }

  // 5. RENDER PREPARATION (Calculations)

  // Get the current question object
  const q = questions[current];

  // Timer formatting: convert secondsLeft into "MM:SS" format
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const ss = String(secondsLeft % 60).padStart(2, '0');

  // 6. RENDER LOGIC (JSX)
  return (
    <div className="page">
      <div className="panel">
        {/* --- Header/Timer Section --- */}
        <div className="flex-between">
          <button onClick={() => navigate('/setup')} className="secondary">
            Back
          </button>
          <div className="timer">
            <div className="timer-label">Time Left</div>
            {/* Display time, change color/style when time is low */}
            <div className={`timer-circle ${secondsLeft < 60 ? 'warning' : ''}`}>
              {mm}:{ss}
            </div>
          </div>
        </div>

        {/* --- Question Section --- */}
        <h3 className="question">
          **Q{current + 1}.** {q.question}
        </h3>

        {/* --- Options Section --- */}
        <div className="options">
          {q.options.map((opt, i) => (
            <button
              key={i}
              // Conditionally apply 'selected' class if this option index (i)
              // matches the answer recorded for the current question (answers[q.id])
              className={`option ${answers[q.id] === i ? 'selected' : ''}`}
              onClick={() => selectOption(q.id, i)}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* --- Navigation Controls --- */}
        <div className="controls">
          <button onClick={handlePrev} className="secondary" disabled={current === 0}>
            Previous
          </button>
          {/* Ternary operator to switch between 'Next' and 'Finish' on the last question */}
          {current === questions.length - 1 ? (
            <button onClick={handleFinish} className="primary">
              **Finish**
            </button>
          ) : (
            <button onClick={handleNext} className="primary">
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}