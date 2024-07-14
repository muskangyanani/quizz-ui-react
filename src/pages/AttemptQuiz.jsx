import React, { useEffect, useState } from 'react';
import Question from '../components/Question';
import axios from 'axios';

const AttemptQuiz = () => {
  const [startTimer, setStartTimer] = useState(5);
  const [showTimerModal, setShowTimerModal] = useState(true);
  const [quizName, setQuizName] = useState('');
  const [timeLimit, setTimeLimit] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  let no_of_questions = questions.length;

  useEffect(() => {
    const path = window.location.pathname;
    const quizId = path.split('/').pop();
    axios.get(`http://localhost:8000/api/quizzes/${quizId}/`)
      .then((response) => {
        setQuestions(response.data.questions);
        setQuizName(response.data.name);
        setTimeLimit(response.data.time_limit);
        setMinutes(response.data.time_limit - 1);
        setSeconds(59);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!showTimerModal && minutes === 0 && seconds === 0 && !isSubmitted) {
      setTimeUp(true);
      handleSubmitQuiz();
      return;
    }
    if (!showTimerModal && !isSubmitted) {
      const interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds, minutes, showTimerModal, isSubmitted]);

  useEffect(() => {
    if (startTimer === 0) {
      setShowTimerModal(false);
    } else {
      const timer = setInterval(() => {
        setStartTimer((prevStartTimer) => prevStartTimer - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTimer]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOptionSelect = (optionText) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [currentQuestionIndex]: optionText,
    }));
  };

  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmitQuiz = () => {
    let answerSubmitted = selectedOptions;
    let correctAnswers = {};
    let tempScore = 0;

    questions.forEach((question, index) => {
      question.options.forEach(option => {
        if (option.is_correct) {
          correctAnswers[index] = option.text;
        }
      });
    });

    for (let key in answerSubmitted) {
      if (answerSubmitted[key] === correctAnswers[key]) {
        tempScore += 1;
      }
    }
    setScore(tempScore);
    setIsSubmitted(true);
  };

  return (
    <div className='mx-28 mt-10 p-4 flex flex-col gap-4'>
      <div className='flex justify-between items-center p-4'>
        <h1 className='text-5xl font-bold text-teal-600'>{quizName}</h1>
        <div className='text-xl font-bold text-center'>
          <p>Time Limit: {timeLimit} minutes</p>
          <p className='text-red-600'>Timer: {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</p>
        </div>
      </div>
      {showTimerModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 flex-col '>
          <h2 className='font-bold text-4xl text-white'>Quiz Starts in</h2>
          <h1 className='text-4xl text-red-600 font-bold'>{startTimer === 0 ? 'Start!' : `${startTimer} seconds`}</h1>
        </div>
      )}
      {timeUp && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 flex-col '>
          <h2 className='font-bold text-4xl text-white'>Time's up!</h2>
          <button
            className='border p-3 mt-4 font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-md'
            onClick={() => setTimeUp(false)}
          >
            Show Result
          </button>
        </div>
      )}

      <p className='mx-5 text-neutral-600'>{`${currentQuestionIndex + 1} / ${no_of_questions}`}</p>
      {currentQuestion && (
        <Question
          question={currentQuestion.text}
          currentQuestion={currentQuestionIndex + 1}
          options={currentQuestion.options}
          selectedOption={selectedOptions[currentQuestionIndex]}
          setSelectedOption={handleOptionSelect}
        />
      )}
      <div className='grid grid-cols-2 gap-4'>
        <button
          className='border py-2 font-bold text-white bg-teal-700 rounded-md hover:bg-teal-600 disabled:opacity-50'
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0 || isSubmitted}
        >
          &#8592; Previous
        </button>
        <button
          className='border py-3 font-bold text-white bg-teal-700 rounded-md hover:bg-teal-600 disabled:opacity-50'
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === questions.length - 1 || isSubmitted}
        >
          Next &#8594;
        </button>
      </div>
      <div className='flex items-center justify-between'>
        <button
          className='border p-3 px-4 font-bold text-white bg-red-600 rounded-md hover:bg-red-500'
          onClick={() => window.location.replace('/quizzes')}
          disabled={isSubmitted}
        >
          Cancel
        </button>
        <button
          className='border p-3 font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-md disabled:opacity-50'
          onClick={handleSubmitQuiz}
          disabled={isSubmitted}
        >
          Submit Quiz
        </button>
      </div>
      {isSubmitted && !timeUp ? (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 flex-col'>
          <div className='bg-white p-6 px-10 rounded-lg text-center flex flex-col gap-4'>
            {score === no_of_questions ?
              <h2 className='text-4xl text-green-500 font-bold'>Congratulations</h2>
              :
              <h2 className='text-4xl text-green-500 font-bold'>You Scored</h2>
            }

            <p className='text-lg'>Your Score</p>
            <p className='text-2xl font-bold'><span className='text-green-500'>{score}</span> / {no_of_questions}</p>
            <button
              className='w-full p-3 bg-teal-700 text-white rounded-lg text-lg'
              onClick={() => window.location.replace('/quizzes')}
            >
              Continue
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AttemptQuiz;
