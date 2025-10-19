import React from "react";
import "./styles/About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About QuizMaster</h1>
      <p>
        Welcome to <strong>QuizMaster</strong> — your go-to platform for testing
        and improving your knowledge in various subjects. Whether you're a
        student preparing for exams or just curious to learn something new,
        QuizMaster makes learning fun, fast, and interactive.
      </p>

      <h2>🎯 Our Mission</h2>
      <p>
        To make learning engaging and accessible for everyone through
        interactive quizzes that help you track progress, learn from mistakes,
        and grow smarter every day.
      </p>

      <h2>🧠 What You Can Do</h2>
      <ul>
        <li>Take quizzes across different categories and difficulties.</li>
        <li>Review your past performances in the History section.</li>
        <li>Challenge yourself to beat your previous scores!</li>
      </ul>

      <p className="quote">
        “Learning becomes exciting when you test your mind — one question at a
        time.”
      </p>
    </div>
  );
};

export default About;
