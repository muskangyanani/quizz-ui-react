import React from 'react'
import CreateQuizBtn from '../components/CreateQuizBtn'
import TakeQuizBtn from '../components/TakeQuizBtn'

const HomePage = () => {
  return (
    <div className='flex flex-col gap-6 sm:gap-10 items-center justify-center pt-10 sm:pt-20 px-4 text-center'>
      <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-teal-700 leading-tight'>
        Learn, Play, Conquer
      </h1>
      <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-6'>
        <CreateQuizBtn />
        <span className='text-lg text-teal-700 font-medium my-2 sm:my-0'>or</span>
        <TakeQuizBtn />
      </div>
    </div>
  )
}

export default HomePage