import React from 'react'
import { MdQuiz } from "react-icons/md";


const TakeQuizBtn = () => {
  return (
    <div className='size-52 flex flex-col items-center justify-center hover:cursor-pointer hover:scale-105 transition-all'>
      <a href='/quizzes' className='border border-teal-700 bg-teal-700 size-40 flex items-center justify-center rounded-md hover:scale-105 transition-all'>
        <MdQuiz className="text-3xl text-white" />
      </a>
      <p className='text-teal-700 font-bold text-lg'>Play Quiz</p>
    </div>
  )
}

export default TakeQuizBtn
