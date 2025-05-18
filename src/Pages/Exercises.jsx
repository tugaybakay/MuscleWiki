import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchExercisesByBodyPart } from '../HelperFuncs/APIServiceFuncs.js';
import ExerciseCard from '../Components/Exercises/ExerciseCard.jsx';
import ExercisesLoading from '../Components/Exercises/ExercisesLoading.jsx';
import ExerciseError from '../Components/Exercises/ExerciseError.jsx';

const Exercises = () => {
  const { bodypart } = useParams();

  const {
    data: exercises,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['exercisesByBodyPart', bodypart],
    queryFn: () => fetchExercisesByBodyPart(bodypart),
    enabled: !!bodypart,
  })


  if (isLoading) return <ExercisesLoading/>
  if (error) return <ExerciseError/>

  return (
    <div className='bg-gray-100 p-8 grow mb-12'>
      <ul className="grid grid-cols-2 gap-12 md:grid-cols-3 max-sm:grid-cols-1 place-items-center">
        {exercises.map((ex) => (
          <ExerciseCard exercise={ex}/>
        ))}
      </ul>
    </div>
  )
}

export default Exercises
