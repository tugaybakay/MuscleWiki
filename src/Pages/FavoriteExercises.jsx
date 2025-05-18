import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchExercisesByIds } from '../HelperFuncs/APIServiceFuncs';
import ExercisesLoading from '../Components/Exercises/ExercisesLoading';
import ExerciseError from '../Components/Exercises/ExerciseError';
import ExerciseCard from '../Components/Exercises/ExerciseCard';

const FavoriteExercises = () => {
  const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];

  const { data: favoriteExercises, isLoading, isError } = useQuery({
    queryKey: ['favoriteExercises', favoriteIds],
    queryFn: () => fetchExercisesByIds(favoriteIds),
    enabled: favoriteIds.length > 0,
  });

  if (isLoading) return <ExercisesLoading />;
  if (isError) return <ExerciseError />;

  if (favoriteIds.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 text-xl text-blue-500">
        You have no favorite exercises yet.
      </div>
    );
  }

  return (
    <div className='bg-gray-100 grow p-8'>
      <ul className="grid grid-cols-2 gap-12 md:grid-cols-3 max-sm:grid-cols-1 place-items-center mt-10 mb-14">
      {favoriteExercises.map((exercise) => (
        <ExerciseCard exercise={exercise}/>
      ))}
     </ul>
    </div>
  );
};

export default FavoriteExercises;
