import React, { useState, useEffect } from "react";

const Quiz = ({ htmlQuestions, goback }) => {
  // State to track the current question index
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600);
  // State to store the user's answers
  const [userAnswers, setUserAnswers] = useState(
    Array(htmlQuestions.length).fill(null)
  );

  // Timer state (60 seconds)


  // Timer functionality (countdown)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Auto-submit when time runs out
    if (timeLeft === 0) {
      handleSubmit();
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Function to handle moving to the previous question
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prevIndex) => prevIndex - 1);
    }
  };

  // Function to handle moving to the next question
  const handleNextQuestion = () => {
    if (currentQuestion < htmlQuestions.length - 1) {
      setCurrentQuestion((prevIndex) => prevIndex + 1);
    }
  };

  // Function to handle the user's answer selection
  const handleAnswerSelect = (index) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = index; // Save the selected answer for the current question
    setUserAnswers(newAnswers);
    console.log(newAnswers)
  };

  // Function to check if all questions are answered
  const allQuestionsAnswered = () => {
    return userAnswers.every((answer) => answer !== null);
  };

  // Function to handle quiz submission
  const handleSubmit = () => {
    // If the time has run out, auto-submit without confirmation
    if (timeLeft === 0) {
      calculateResult();
      return;
    }
  
    // Check if all questions are answered
    if (!allQuestionsAnswered()) {
      // Ask for confirmation if there are unanswered questions
      if (window.confirm("You haven't answered all the questions. Do you want to submit anyway?")) {
        calculateResult();
      }
    } else {
      calculateResult();
    }
  };
  

  // Function to calculate the result of the quiz
  const calculateResult = () => {
    const correctAnswers = htmlQuestions.filter((question, index) => {
      return question.answerIndex == userAnswers[index];
    }).length;
    console.log()
    const correctAnswer = htmlQuestions.filter((question, index) => {
        return question.answerIndex == userAnswers[index];
      });
    console.log(correctAnswer)
    alert(`Quiz submitted! You scored ${correctAnswers} out of ${htmlQuestions.length}`);
  };

  return (
    <div className="quizbox">
      <div className="startimageblock telephone shorters"></div>
      <div className="herocontainer">
        <div className="quizquestion">
          <div className="story">
            {/* Timer and Level Info */}
            <div className="helperblock" onClick={() => goback(0)}>
              <div className="helperitems story">
                <span className="material-symbols-outlined">schedule</span> {timeLeft} seconds
              </div>

              <div className="helperitems story">
                <span className="material-symbols-outlined">menu_book</span> Beginners
              </div>
            </div>

            {/* Display current question */}
            <div className="valuetitle">{htmlQuestions[currentQuestion]?.topic}</div>
            <p>{htmlQuestions[currentQuestion].question}</p>

            {/* Chevron buttons to navigate questions */}
            <div className="controls">
              {currentQuestion > 0 && (
                <div className="control" onClick={handlePrevQuestion}>
                  <span className="material-symbols-outlined">chevron_left</span>
                </div>
              )}
              {currentQuestion < htmlQuestions.length - 1 && (
                <div className="control" onClick={handleNextQuestion}>
                  <span className="material-symbols-outlined">chevron_right</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Options to select answers */}
        <div className="quizoptions">
          <div className="valuetitle">Options</div>
          <div className="quizoptgrid">
            {htmlQuestions[currentQuestion].options.map((myoption, index) => (
              <div
                className={`qact ${userAnswers[currentQuestion] === index ? 'selected' : ''}`}
                key={index}
                onClick={() => handleAnswerSelect(index)}
              >
                {myoption}
              </div>
            ))}
          </div>
        </div>

        {/* Show submit button on the last question */}
        {currentQuestion === htmlQuestions.length - 1 && (
          <div className="submit-container">
            <button className="submit-btn" onClick={handleSubmit}>
              Submit Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
