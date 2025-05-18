import React from 'react'

/**
 * @typedef {Object} Exercise
 * @property {string} id
 * @property {string} name
 * @property {string} bodyPart
 * @property {string} equipment
 * @property {string} gifUrl
 * @property {string} target
 */


/**
 * 
 * @param {{exercise: Exercise}} props 
 *  
 */
const ExerciseCard = ({ exercise }) => {

  return (
    <a href={`/exercises/${exercise.id}`} className='w-full'>
      <li className='bg-white rounded-2xl overflow-clip shadow-md cursor-pointer'>
      <div className="bg-blue-600 flex px-2 py-1">
        <h1 className='text-2xl text-white font-semibold  px-4 py-2  grow max-sm:text-lg max-md:text-xl hover:underline '>{exercise.name}</h1>
        <img src="/white-external-link.svg" alt="External Link" className='w-8 h-auto max-sm:w-5' />
      </div>
      <img src={exercise.gifUrl} alt="Exercise Gif" className='mx-auto' />
    </li>
    </a>
  )
}

export default ExerciseCard
