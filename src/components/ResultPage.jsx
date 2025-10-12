import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Make sure you import these hooks!

// Destructure the component name to keep the file name consistent
export default function ResultsPage() {
  // 1. HOOKS and State Management
  // Use destructuring for clearer access to hook return values
  const { state: data } = useLocation();
  const navigate = useNavigate();

  // 2. SIDE EFFECT (useEffect)
  // This hook ensures that the user is redirected if they land on this page
  // without any quiz data (e.g., refreshing the page or direct navigation).
  useEffect(() => {
    // Check if the location state (data) is empty
    if (!data) {
      navigate('/setup');
    }
  }, [data, navigate]); // Dependencies are crucial for correct behavior

  // 3. EARLY EXIT/GUARD CLAUSE
  // Immediately stop rendering if the data is missing (while waiting for navigation)
  if (!data) {
    return null;
  }

  // 4. RENDER LOGIC
  // Destructure for cleaner access within the JSX
  const { score, total, answers } = data;

  return (
    <div className="page">
      <div className="panel">
        <h2>Quiz Results</h2>
        
        {/* Display Score */}
        <p className="muted">
          Score: <span className="highlight">{score}</span> / {total}
        </p>

        {/* --- Review Section --- */}
        <h3>Review</h3>
        <ul>
          {/*
            Iterate over the answers object.
            Object.entries returns an array of [key, value] pairs.
            Here, [qid, sel] represents [Question ID, Selected Answer Index]
          */}
          {Object.entries(answers).map(([qid, selectedIndex]) => (
            <li key={qid}>
              Question **{qid}** - Answer Index Picked: **{selectedIndex}**
            </li>
          ))}
        </ul>

        {/* --- Controls Section --- */}
        <div className="controls">
          <button 
            onClick={() => navigate('/setup')} 
            className="primary"
          >
            Back to Setup
          </button>
        </div>
      </div>
    </div>
  );
}