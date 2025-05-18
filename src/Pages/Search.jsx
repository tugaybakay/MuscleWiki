import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchExercisesByName } from '../HelperFuncs/APIServiceFuncs';
import ExerciseCard from '../Components/Exercises/ExerciseCard';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const formik = useFormik({
    initialValues: {
      search: '',
    },
    validationSchema: Yup.object({
      search: Yup.string()
        .min(2, 'Minimum 2 characters required')
        .required('Search field is required'),
    }),
    onSubmit: (values) => {
      setSearchTerm(values.search.trim());
    },
  });

  const {
    data: exercises,
    isLoading,
    isError,
    isFetched,
  } = useQuery({
    queryKey: ['searchExercises', searchTerm],
    queryFn: () => fetchExercisesByName(searchTerm.toLowerCase()),
    enabled: !!searchTerm,
  });

  return (
    <div className="bg-gray-100 p-8 grow">
      {/* Search bar with Formik */}
      <form onSubmit={formik.handleSubmit} className="flex flex-col items-center gap-2 mb-8">
        <div className="flex gap-2 w-full max-w-xl">
          <input
            type="text"
            name="search"
            placeholder="Enter exercise name..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.search}
            className="p-3 rounded-md bg-white border w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
          >
            Search
          </button>
        </div>
        {formik.touched.search && formik.errors.search && (
          <div className="text-red-500 text-sm">{formik.errors.search}</div>
        )}
      </form>

      {/* Conditional content */}
      {!isFetched && (
        <div className="text-center text-blue-600 text-lg mt-20">
          Please enter the name of the exercise you want to search
        </div>
      )}

      {isLoading && (
        <div className="text-center text-gray-500">Loading exercises...</div>
      )}

      {isError && (
        <div className="text-center text-red-500">An error occurred while fetching data.</div>
      )}

      {exercises?.length === 0 && isFetched && !isLoading && (
        <div className="text-center text-gray-500">No exercises found with that name.</div>
      )}

      {exercises?.length > 0 && (
        <ul className="grid grid-cols-2 gap-12 md:grid-cols-3 max-sm:grid-cols-1 place-items-center mb-14">
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
