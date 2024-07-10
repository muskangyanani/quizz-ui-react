import React from 'react'
import { FaPlus } from "react-icons/fa";


const CreateQuizBtn = () => {
  return (
    <div className='size-52 flex flex-col items-center justify-center hover:cursor-pointer'>
      <a href='/create-quiz' className='border border-teal-700 size-40 flex items-center justify-center rounded-md hover:scale-105 transition-all'>
        <FaPlus className="text-3xl text-teal-700" />
      </a>
      <p className='text-teal-700 font-bold text-lg'>Create a Quiz</p>
    </div>
  )
}

export default CreateQuizBtn
