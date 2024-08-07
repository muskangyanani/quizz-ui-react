import axios from 'axios';
import React from 'react'
import { MdQuiz } from "react-icons/md";
import { useAuth } from '../contexts/AuthContext';

const AllQuizzes = () => {
  const [quizzes, setQuizzes] = React.useState([]);
  console.log(quizzes);

  // fetch quizzes from the backend
  React.useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/quizzes/')
      .then((response) => {
        setQuizzes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching quizzes', error);
      });
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      {quizzes.length === 0 ? (
        <p className='text-teal-700 text-center font-bold text-lg'>No quizzes available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className='bg-teal-700 text-white p-4'>
                <div className="flex items-center justify-center mb-2">
                  <MdQuiz className='text-4xl' />
                </div>
                <h2 className='font-bold text-xl text-center truncate'>{quiz.name}</h2>
              </div>
              <div className='p-4'>
                <div className='flex justify-between text-sm text-gray-600 mb-2'>
                  <span>Time: {quiz.time_limit} min</span>
                  <span>Questions: {quiz.no_of_questions}</span>
                </div>
                <button
                  className='w-full bg-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors duration-300'
                  onClick={() => window.location.href = `/quiz/${quiz.id}`}
                >
                  Start Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AllQuizzes
