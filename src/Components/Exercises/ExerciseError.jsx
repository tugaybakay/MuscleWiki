
const ExerciseError = () => {
  return (
    <div className="flex grow flex-col items-center justify-center space-y-4 min-h-screen text-blue-600 bg-gray-100">
      <div className="w-12 h-12 flex items-center justify-center rounded-full border-4 border-blue-600">
        <span className="text-3xl">✖</span>
      </div>
      <p className="text-2xl font-semibold text-center text-gray-700">Oops! Failed to load exercises.</p>
    </div>

  )
}

export default ExerciseError
