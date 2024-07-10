import React from 'react'

const CreateQuizPage = () => {
  return (
    <div className='border mx-40 flex flex-col gap-4 mt-20'>
      <div className='flex p-4 border border-black rounded-lg gap-2'>
        <p className='size-6 bg-teal-700 text-white text-center'>1</p>
        <h2 className='font-bold'>Quiz Name: </h2>
        <input type="text" placeholder='Enter Quiz Name...' className='outline-none' />
      </div>
      <div className='flex flex-col p-4 border border-black rounded-lg gap-2'>
        <div className='flex gap-2'>
          <p className='size-6 bg-teal-700 text-white text-center'>2</p>
          <h2 className='font-bold'>Quiz Questions: </h2>
        </div>
        <div className='border m-3 p-4 rounded-xl'>
          <div className='flex gap-2 items-center'>
            <p>Q1:</p>
            <input type="text" placeholder='Enter Question...' className='outline-none border p-3 w-full' />
          </div>
          {/* TODO: Start From Here */}
        </div>
      </div>
    </div>
  )
}

export default CreateQuizPage
