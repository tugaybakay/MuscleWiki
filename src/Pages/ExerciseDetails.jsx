import { useQuery } from '@tanstack/react-query';
import { fetchExerciseById } from '../HelperFuncs/APIServiceFuncs.js';
import ExercisesLoading from '../Components/Exercises/ExercisesLoading.jsx';
import ExerciseError from '../Components/Exercises/ExerciseError.jsx';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';

/**
 * @typedef {Object} Exercise
 * @property {string} id
 * @property {string} name
 * @property {string} bodyPart
 * @property {string} equipment
 * @property {string} gifUrl
 * @property {string} target
 */

const ExerciseDetails = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const {exerciseid} = useParams()

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(exerciseid));
  }, [exerciseid]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    let updatedFavorites;

    if (favorites.includes(exerciseid)) {
      // Favoriden çıkar
      updatedFavorites = favorites.filter(id => id !== exerciseid);
      setIsFavorite(false);
    } else {
      // Favoriye ekle
      updatedFavorites = [...favorites, exerciseid];
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };


  const { data: exercise, isLoading, isError } = useQuery({
    queryKey: ['exercise', exerciseid],
    queryFn: () => fetchExerciseById(exerciseid),
    enabled: !!exerciseid, // sadece ID varsa fetch yap
  })

  if (isLoading) return <ExercisesLoading/>
  if (isError) return <ExerciseError/>

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-10">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden mb-16">
        {/* Başlık ve yıldız */}
        <div className="flex items-center justify-between bg-blue-600 px-6 py-4">
          <h2 className="text-white text-3xl font-semibold max-sm:text-xl">{exercise.name}</h2>
          <img
            src={isFavorite ? "/yellow-star.png" : "/white-star.svg"}
            alt="Favorite Star"
            className="w-10 h-auto cursor-pointer transition-transform duration-200 hover:scale-110 max-sm:w-8"
            onClick={toggleFavorite}
          />
        </div>

        {/* Egzersiz GIF */}
        <div className="w-full p-4 flex justify-center">
          <img src={exercise.gifUrl} alt={exercise.name} className="rounded-lg max-h-96 object-contain" />
        </div>

        {/* Bilgiler */}
        <div className="px-6 py-4 space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-blue-700 mb-1 p-2 rounded-2xl bg-gray-100 max-sm:text-xl">Target Muscle</h3>
            <p className="text-gray-700 capitalize text-lg pl-2">{exercise.target}</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-blue-700 mb-1 p-2 rounded-2xl bg-gray-100 max-sm:text-xl">Equipment</h3>
            <p className="text-gray-700 capitalize text-lg pl-2">{exercise.equipment}</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-blue-700 mb-1 p-2 rounded-2xl bg-gray-100 max-sm:text-xl">Secondary Muscles</h3>
            <ul className="list-disc list-inside text-gray-700 capitalize text-lg marker:text-blue-600 pl-2">
              {exercise.secondaryMuscles.map((muscle, index) => (
                <li key={index}>{muscle}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-blue-700 mb-2 p-2 rounded-2xl bg-gray-100 max-sm:text-xl">Instructions</h3>
            <ul className="space-y-2 pl-2">
              {exercise.instructions.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="min-w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full font-semibold">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 text-lg">{step}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExerciseDetails
