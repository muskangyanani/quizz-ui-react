import React from 'react';
import axios from 'axios';

const CreateQuizPage = () => {
  const [quizName, setQuizName] = React.useState('');
  const [timeLimit, setTimeLimit] = React.useState('');
  const [questions, setQuestions] = React.useState([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
  const [showModal, setShowModal] = React.useState(false);
  const [error, setError] = React.useState(null);

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
      }))
    };
    console.log('Quiz Data:', quizData);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/quizzes/create/', quizData);
      console.log('Quiz created successfully:', response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error creating quiz:', error);
      setShowModal(true);
      setError('Error creating quiz. Please try again later.');
    }
  };


  return (
    <div className=' mx-40 flex flex-col gap-4 mt-10'>
      <div className='flex p-4 border border-black rounded-lg gap-2'>
        <p className='size-6 bg-teal-700 text-white text-center'>1</p>
        <h2 className='font-bold'>Quiz Name: </h2>
        <input
          type='text'
          placeholder='Enter Quiz Name'
          className='outline-none w-96'
          value={quizName}
          onChange={handleQuizNameChange}
        />
      </div>
      <div className='flex p-4 border border-black rounded-lg gap-2'>
        <p className='size-6 bg-teal-700 text-white text-center'>2</p>
        <h2 className='font-bold'>Time Limit: </h2>
        <input
          type='text'
          placeholder='Enter Time Limit in minutes'
          className='outline-none w-80'
          value={timeLimit}
          onChange={handleTimeLimitChange}
        />
      </div>
      <div className='flex flex-col p-4 border border-black rounded-lg gap-2'>
        <div className='flex gap-2'>
          <p className='size-6 bg-teal-700 text-white text-center'>3</p>
          <h2 className='font-bold'>Quiz Questions: </h2>
        </div>
        {questions.map((question, qIndex) => (
          <div key={qIndex} className='border m-3 p-4 rounded-xl flex flex-col gap-3'>
            <div className='flex gap-2 items-center'>
              <p>Q{qIndex + 1}:</p>
              <input
                type='text'
                placeholder='Enter Question'
                className='outline-none border p-3 w-full rounded-md'
                value={question.questionText}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              />
            </div>
            <div className='grid grid-cols-2 gap-2 w-full'>
              {question.options.map((option, oIndex) => (
                <input
                  key={oIndex}
                  type='text'
                  placeholder={`Option ${oIndex + 1}`}
                  className='outline-none border p-3 w-full rounded-md'
                  value={option}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                />
              ))}
            </div>
            <div className='flex '>
              <p>Correct Answer:</p>
              <select
                className='outline-none border p-3 w-full rounded-md'
                value={question.correctAnswer}
                onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
              >
                {question.options.map((option, oIndex) => (
                  <option key={oIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
        <div className='w-full flex gap-4'>
          <button
            className='bg-teal-700 text-white p-3 rounded-lg hover:bg-teal-600'
            type='button'
            onClick={handleAddQuestion}
          >
            Add Question
          </button>
          <button
            className='bg-teal-700 text-white p-3 rounded-lg hover:bg-teal-600'
            type='button'
            onClick={handleRemoveQuestion}
          >
            Remove Question
          </button>
        </div>
      </div>
      <button
        className='bg-teal-700 text-white p-3 rounded-lg hover:bg-teal-600' onClick={handleSubmit}
      >
        Create Quiz
      </button>
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg'>
            <h2 className='font-bold text-xl'>{error !== null ? 'Error' : 'Success'}</h2>
            <p>{error || 'Quiz created successfully!'}</p>
            <div className='flex gap-4'>
              <button
                className='bg-teal-700 text-white p-3 rounded-lg hover:bg-teal-600 mt-4'
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className='bg-teal-700 text-white p-3 rounded-lg hover:bg-teal-600 mt-4'
                onClick={() => setShowModal(false)}
              >
                <a href='/quizzes'>View Quizzes</a>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateQuizPage;
