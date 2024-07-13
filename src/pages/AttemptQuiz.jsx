import React, { useEffect, useState } from 'react';
import Question from '../components/Question';
import axios from 'axios';

const AttemptQuiz = () => {
  const [quizName, setQuizName] = useState('');
  const [time_limit, setTimeLimit] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [disableNext, setDisableNext] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    console.log(path);
    const quizId = path.split('/').pop();
    console.log(quizId);
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
    if (minutes === 0 && seconds === 0) {
      return;
    }
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
  }, [seconds, minutes]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setDisableNext(true);
      console.log('Quiz completed');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setDisableNext(false);
    }
  };

  const handleOptionSelect = (optionText) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [currentQuestionIndex]: optionText,
    }));
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className='mx-28 mt-10 p-4 flex flex-col gap-4'>
      <div className='flex justify-between items-center p-4'>
        <h1 className='text-5xl font-bold text-teal-600'>{quizName}</h1>
        <p className='text-xl font-bold text-center'>
          Time Limit: {time_limit} minutes
          <br />
          Timer: {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </p>
      </div>
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
          disabled={currentQuestionIndex === 0}
        >
          &#8592; Previous
        </button>
        <button 
          className='border py-3 font-bold text-white bg-teal-700 rounded-md hover:bg-teal-600 disabled:opacity-50'
          onClick={handleNextQuestion}
          disabled={disableNext}
        >
          Next &#8594;
        </button>
      </div>
      <div className='w-full border'>
        <button 
          className='border py-3 font-bold text-white bg-teal-700 rounded-md hover:bg-teal-600 w-full'
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
};

export default AttemptQuiz;
