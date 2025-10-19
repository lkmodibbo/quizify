import React from "react";
import "./styles/About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About QuizMaster</h1>
      <p className="intro-text">
        Welcome to <strong>QuizMaster</strong> — your go-to platform for testing
        and improving your knowledge in various subjects. Whether you're a
        student preparing for exams or just curious to learn something new,
        QuizMaster makes learning fun, fast, and interactive.
      </p>

      <div className="cards-container">
        {/* Mission Card */}
        <div className="about-card">
          <div className="card-icon">🎯</div>
          <h2>Our Mission</h2>
          <p>
            To make learning engaging and accessible for everyone through
            interactive quizzes that help you track progress, learn from
            mistakes, and grow smarter every day.
          </p>
        </div>

        {/* Vision Card */}
        <div className="about-card">
          <div className="card-icon">🌟</div>
          <h2>Our Vision</h2>
          <p>
            To be a global leader in quiz-based education technology, inspiring
            learners to achieve excellence and curiosity-driven growth.
          </p>
        </div>

        {/* What We Do Card */}
        <div className="about-card">
          <div className="card-icon">🧠</div>
          <h2>What We Do</h2>
          <ul>
            <li>Provide quizzes across different subjects and levels.</li>
            <li>Offer instant results and detailed feedback.</li>
            <li>Help users track progress through their quiz history.</li>
          </ul>
        </div>
      </div>

      <p className="quote">
        “Learning becomes exciting when you test your mind — one question at a
        time.”
      </p>
    </div>
  );
};

export default About;
