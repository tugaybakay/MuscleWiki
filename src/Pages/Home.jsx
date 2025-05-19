import SelectMuscle from "../Components/SelectMuscle.jsx"
import ActiveBodyActiveLife from "../Components/ActiveBodyActiveLife.jsx"

function Home() {

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      <p className="text-lg text-center py-3 text-blue-500 px-2 max-sm:text-sm">"Click on a body part to see exercises targeting that area."</p>
      <SelectMuscle/>
      <ActiveBodyActiveLife/>
    </div>
  )
}

export default Home
