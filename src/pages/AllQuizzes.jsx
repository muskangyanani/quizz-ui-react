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
  }, []);
});
  return (
    <div className='flex'>
      {quizzes.map((quiz) => (
        <div key={quiz.id}>
           <div className='mt-10 mx-10 flex gap-2'>
             <div className='flex flex-col gap-3 border border-neutral-400 size-52 rounded-lg p-2'>
               <div className='flex flex-col items-center border py-5 rounded-md bg-teal-700 text-white'>
                 <MdQuiz className='text-4xl'/>
                 <h1>{quiz.name}</h1>
               </div>
               <div className='flex justify-between'>
                 <p>{quiz.time_limit} mins</p>
                 <p>{quiz.no_of_questions} Q</p>
               </div>
               <div>
                 <button className='border border-slate-700 font-bold w-full py-1 rounded-lg text-black'>Start Quiz</button>
               </div>
             </div>
           </div>
        </div>
      ))}
    </div>
  )
}

export default AllQuizzes
