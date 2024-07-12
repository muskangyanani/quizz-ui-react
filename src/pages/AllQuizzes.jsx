import React from 'react'
import { MdQuiz } from "react-icons/md";

const AllQuizzes = () => {
  // const [quizzes, setQuizzes] = React.useState([]);
  // fetch quizzes from the backend
  // 
  return (
    
    <div className='mt-10 mx-10 flex gap-4'>
      <div className='flex flex-col gap-3 border border-neutral-400 size-52 rounded-lg p-2'>
        <div className='flex flex-col items-center border py-5 rounded-md bg-teal-700 text-white'>
          <MdQuiz className='text-4xl'/>
          <h1>Quiz Name</h1>
        </div>
        <div className='flex justify-between'>
          <p>2:30 min</p>
          <p>10 Q</p>
        </div>
        <div>
          <button className='border border-slate-700 font-bold w-full py-1 rounded-lg text-black'>Start Quiz</button>
        </div>
      </div>
      <div className='flex flex-col gap-3 border border-neutral-400 size-52 rounded-lg p-2'>
        <div className='flex flex-col items-center border py-5 rounded-md bg-teal-700 text-white'>
          <MdQuiz className='text-4xl'/>
          <h1>Quiz Name</h1>
        </div>
        <div className='flex justify-between'>
          <p>2:30 min</p>
          <p>10 Q</p>
        </div>
        <div>
          <button className='border border-slate-700 font-bold w-full py-1 rounded-lg text-black'>Start Quiz</button>
        </div>
      </div>
    </div>
  )
}

export default AllQuizzes
