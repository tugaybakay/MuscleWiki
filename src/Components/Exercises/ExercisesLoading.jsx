
const ExercisesLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 bg-gray-100 min-h-screen">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-2xl text-gray-700 font-medium">Exercises are loading...</p>
    </div>
  )
}

export default ExercisesLoading
