import React from 'react'
import { FaPlus } from "react-icons/fa";

const CreateQuizBtn = () => {
  return (
    <div className='w-40 sm:w-52 flex flex-col items-center justify-center hover:cursor-pointer hover:scale-105 transition-all'>
      <a href='/create-quiz' className='border border-teal-700 w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center rounded-md'>
        <FaPlus className="text-2xl sm:text-3xl text-teal-700" />
      </a>
      <p className='text-teal-700 font-bold text-base sm:text-lg mt-2'>Create a Quiz</p>
    </div>
  )
}

export default CreateQuizBtn