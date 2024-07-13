import React from 'react';

const Question = ({ question, currentQuestion, options, selectedOption, setSelectedOption }) => {
  return (
    <div className='flex flex-col border rounded-xl gap-6 my-4 py-4'>
      <div className='border m-3 p-4 rounded-xl flex flex-col gap-3'>
        <div className='flex gap-2 items-center'>
          <p className='text-xl'>Q{currentQuestion}: {question}</p>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-6 w-full px-3 mb-3 text-xl'>
        {options.map((option, index) => (
          <button
            key={index}
            className={`outline-none border p-3 w-full rounded-md ${
              selectedOption === option.text ? 'bg-green-500' : 'hover:bg-green-500'
            }`}
            onClick={() => setSelectedOption(option.text)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
