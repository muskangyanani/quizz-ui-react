import React from 'react'
import { MdQuiz } from "react-icons/md";

const TakeQuizBtn = () => {
  return (
    <div className='w-40 sm:w-52 flex flex-col items-center justify-center hover:cursor-pointer hover:scale-105 transition-all'>
      <a href='/quizzes' className='border border-teal-700 bg-teal-700 w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center rounded-md'>
        <MdQuiz className="text-2xl sm:text-3xl text-white" />
      </a>
      <p className='text-teal-700 font-bold text-base sm:text-lg mt-2'>Play Quiz</p>
    </div>
  )
}

export default TakeQuizBtn