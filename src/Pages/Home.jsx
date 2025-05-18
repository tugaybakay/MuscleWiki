import Navbar from "../Components/Navbar.jsx"
import SelectMuscle from "../Components/SelectMuscle.jsx"
import Footer from "../Components/Footer.jsx"
import ActiveBodyActiveLife from "../Components/ActiveBodyActiveLife.jsx"

function Home() {

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      <SelectMuscle/>
      <ActiveBodyActiveLife/>
    </div>
  )
}

export default Home
