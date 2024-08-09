import React from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const CreateQuizPage = () => {
  const [quizName, setQuizName] = React.useState('');
  const [timeLimit, setTimeLimit] = React.useState('');
  const [questions, setQuestions] = React.useState([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
  const [showModal, setShowModal] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { user } = useAuth();
  console.log(user)

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleRemoveQuestion = () => {
    if (questions.length > 1) {
      setQuestions(questions.slice(0, -1));
    }
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = questions.map((question, qIndex) => {
      if (index === qIndex) {
        return { ...question, questionText: value };
      }
      return question;
    });
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = questions.map((question, questionIndex) => {
      if (qIndex === questionIndex) {
        const newOptions = question.options.map((option, optionIndex) => {
          if (oIndex === optionIndex) {
            return value;
          }
          return option;
        });
        return { ...question, options: newOptions };
      }
      return question;
    });
    setQuestions(newQuestions);
  };

  const handleQuizNameChange = (e) => {
    setQuizName(e.target.value);
  };

  const handleTimeLimitChange = (e) => {
    setTimeLimit(e.target.value);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const newQuestions = questions.map((question, questionIndex) => {
      if (qIndex === questionIndex) {
        return { ...question, correctAnswer: value };
      }
      return question;
    });
    setQuestions(newQuestions);
  };

  const handleSubmit = async () => {
    const quizData = {
      name: quizName,
      time_limit: timeLimit,
      questions: questions.map(question => ({
        text: question.questionText,
        options: question.options.map(option => ({
          text: option,
          is_correct: option === question.correctAnswer
        }))
      })),
      created_by: user.user_id
    };
    console.log('Quiz Data:', quizData);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/quizzes/create/', quizData);
      console.log('Quiz created successfully:', response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error creating quiz:', error.response ? error.response.data : error.message);
      setShowModal(true);
      setError('Error creating quiz. Please try again later.');
    }
  };


  
  return (
    <div className='max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6'>
      <h1 className='text-3xl font-bold text-teal-700 text-center mb-6'>Create a New Quiz</h1>
      
      <div className='bg-white shadow-md rounded-lg p-6'>
        <div className='mb-4'>
          <label htmlFor="quizName" className='block text-sm font-medium text-gray-700 mb-1'>Quiz Name</label>
          <input
            id="quizName"
            type='text'
            placeholder='Enter Quiz Name'
            className='w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500'
            value={quizName}
            onChange={handleQuizNameChange}
          />
        </div>
        
        <div className='mb-4'>
          <label htmlFor="timeLimit" className='block text-sm font-medium text-gray-700 mb-1'>Time Limit (minutes)</label>
          <input
            id="timeLimit"
            type='number'
            placeholder='Enter Time Limit'
            className='w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500'
            value={timeLimit}
            onChange={handleTimeLimitChange}
          />
        </div>
      </div>

      <div className='bg-white shadow-md rounded-lg p-6'>
        <h2 className='text-xl font-semibold mb-4'>Quiz Questions</h2>
        {questions.map((question, qIndex) => (
          <div key={qIndex} className='mb-6 p-4 bg-gray-50 rounded-lg'>
            <div className='mb-3'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Question {qIndex + 1}</label>
              <input
                type='text'
                placeholder='Enter Question'
                className='w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500'
                value={question.questionText}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-3'>
              {question.options.map((option, oIndex) => (
                <input
                  key={oIndex}
                  type='text'
                  placeholder={`Option ${oIndex + 1}`}
                  className='w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500'
                  value={option}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                />
              ))}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Correct Answer</label>
              <select
                className='w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500'
                value={question.correctAnswer}
                onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
              >
                <option value="">Select correct answer</option>
                {question.options.map((option, oIndex) => (
                  <option key={oIndex} value={option}>
                    {option || `Option ${oIndex + 1}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
        <div className='flex flex-wrap gap-3'>
          <button
            className='bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors'
            type='button'
            onClick={handleAddQuestion}
          >
            Add Question
          </button>
          <button
            className='bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors'
            type='button'
            onClick={handleRemoveQuestion}
          >
            Remove Last Question
          </button>
        </div>
      </div>

      <button
        className='w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition-colors text-lg font-semibold'
        onClick={handleSubmit}
      >
        Create Quiz
      </button>

      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white p-6 rounded-lg max-w-sm w-full mx-4'>
            <h2 className='font-bold text-xl mb-2'>{error !== null ? 'Error' : 'Success'}</h2>
            <p className='mb-4'>{error || 'Quiz created successfully!'}</p>
            <a
              href='/quizzes'
              onClick={() => setShowModal(false)}
              className='block w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition-colors text-center'
            >
              View Quizzes
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateQuizPage;

