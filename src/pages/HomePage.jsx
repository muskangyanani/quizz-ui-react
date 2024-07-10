import React from 'react'
import CreateQuizBtn from '../components/CreateQuizBtn'
import TakeQuizBtn from '../components/TakeQuizBtn'

const HomePage = () => {
  return (
    <div className='flex flex-col gap-10 items-center justify-center pt-20'>
      <h1 className='text-7xl font-bold text-teal-700'>Learn, Play, Conquer</h1>
      <div className='flex items-center'>
        <CreateQuizBtn />
        or
        <TakeQuizBtn />
      </div>
    </div>
  )
}

export default HomePage
