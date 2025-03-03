import React, { useState, useEffect, useCallback } from 'react';
import './Quiz.css';

 function Quiz({ username }) {  
      const [questions] = useState([
    {
      question: "1. Which of the following is not a front-end technology?",
      options: ["HTML", "CSS", "Javascript", "SQL"],
      correctAnswer: "SQL",
    },
    {
      question: "2. The purpose of the Front-end framework in Full stack development _____",
      options: ["To provide the client-side interface", "To manage database", "To reduce the server load", "To send http requests"],
      correctAnswer: "To provide the client-side interface",
    },
    {
      question: "3. Amongst which of the following programming language is used as a server-side language?",
      options: ["Python", "C++", "Javascript", "Python and JS"],
      correctAnswer: "Python and JS",
    },
    {
      question: "4. Database in Full stack development is used to ____. ",
      options: ["Styling HTML pages", "Storing and retrieving data", "Handling errors on server-side", "Rendering web pages"],
      correctAnswer: "Storing and retrieving data",
    },
    {
      question: "5. What is Git?",
      options: ["Framework", "Version control system", "Package manager", "Database"],
      correctAnswer: "Version control system",
    },
    {
      question: "6. CRUD stands for ____. ",
      options: ["Create, Read, Upload, Delete", "Create, Read, Upgrade, Deploy", "Create, Remove, Upgrade, Delete", "Create, Read, Update, Delete"],
      correctAnswer: "Create, Read, Update, Delete",
    },
    {
      question: "7. Is JavaScript synchronous or asynchronous?",
      options: ["Synchronous", "Asynchronous", "Both", "Synchronous but can be used as asynchronous"],
      correctAnswer: "Synchronous but can be used as asynchronous",
    },
    {
      question: "8. SPA stands for ____. ",
      options: ["Standard Page Application", "Single Page Application", "Smart Protocol Authentication", "Scalable Performance Architecture"],
      correctAnswer: "Single Page Application",
    },
    {
      question: "9. Amongst which of the following type of database is used in Full stack development?",
      options: ["Relational", "JSON", "XML", "GraphQL"],
      correctAnswer: "Relational",
    },
    {
      question: "10. In HTML, the <iframe> tag is used to ____.",
      options: ["Embed another HTML document or a web page within the current document", "Insert a video in the HTML document", "Create a frame in an HTML document", "None of the above"],
      correctAnswer: "Embed another HTML document or a web page within the current document",
    },
    {
      question: "11. Which HTML tag is used to create vector graphics and illustrations?",
      options: ["<canvas>", "<svg>", "<video>", "<details>"],
      correctAnswer: "<svg>",
    },
    {
      question: "12. In an HTML document, which tag is used to add JavaScript code?",
      options: ["<javascript>", "<java>", "<script>", "<js>"],
      correctAnswer: "<script>",
    },
    {
      question: "13. Which of the following is an array method in JavaScript?",
      options: ["map", "every", "Reduce", "All the Above"],
      correctAnswer: "All the Above",
    },
    {
      question: "14. Which of the following is a type of pop-up box in JavaScript?",
      options: ["alert", "console", "DOM", "canvas"],
      correctAnswer: "alert",
    },
    {
      question: "15. DOM stands for ____.",
      options: ["Document Object Method", "Direct Object model", "Document Over Model", "Document Object Model"],
      correctAnswer: "Document Object Method",
    },
  
  ]);

 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showScore, setShowScore] = useState(false);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimeLeft(15);
    } else {
      setShowScore(true);
    }
  }, [currentQuestionIndex, questions.length]);

  useEffect(() => {
    if (timeLeft > 0 && !showScore) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft, showScore, handleNextQuestion]);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
    handleNextQuestion();
  };

  const saveScore = async () => {
    if (!username) {
      alert("⚠️ You must be logged in to save your score.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/save-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, score }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("✅ Score saved successfully!");
      } else {
        alert(`⚠️ ${data.message}`);
      }
    } catch (error) {
      console.error("❌ Error saving score:", error);
      alert("❌ Error saving score. Please try again.");
    }
  };

  useEffect(() => {
    if (showScore) {
      saveScore();
    }
  }, [showScore]);

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="quiz-score">
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} / {questions.length}</p>
        </div>
      ) : (
        <div>
          <div className="quiz-timer">
            <p>Time Left: {timeLeft}s</p>
          </div>
          <div className="quiz-question">
            <h3>{questions[currentQuestionIndex].question}</h3>
            <div className="quiz-options">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  className="quiz-option"
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="quiz-navigation">
            <button
              className="quiz-button"
              onClick={handleNextQuestion}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
