import axios from 'axios';
import React from 'react'
import { MdQuiz } from "react-icons/md";

const AllQuizzes = () => {
  const [quizzes, setQuizzes] = React.useState([]);
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
    <div className='grid grid-cols-5 gap-4 m-10'>
      {quizzes.length === 0 ? 
      <p className='text-teal-700 w-screen text-center font-bold text-lg'>No quizzes available</p> 
        : 
      null}
      {quizzes.map((quiz) => (
            <div key={quiz.id} className='flex flex-col gap-3 border border-neutral-600 size-52 rounded-lg p-2 hover:scale-105 transition-all'>
               <div className='flex flex-col items-center border py-5 rounded-md bg-teal-700 text-white'>
                 <MdQuiz className='text-4xl'/>
                 <h1 className='font-bold'>{quiz.name}</h1>
               </div>
               <div className='flex justify-between'>
                 <p>{quiz.time_limit} min</p>
                 <p>{quiz.no_of_questions} Q</p>
               </div>
               <div>
                 <button 
                  className='border border-neutral-500 font-bold w-full py-1 rounded-lg text-black'
                  onClick={() => window.location.href = `/quiz/${quiz.id}`}
                  >
                    Start Quiz
                  </button>
               </div>
             </div>
      ))}
    </div>
  )
}

export default AllQuizzes
