import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx"
import Footer from "./Components/Footer.jsx"
import Home from './Pages/Home.jsx';
import Exercises from './Pages/Exercises.jsx';
import ExerciseDetails from './Pages/ExerciseDetails.jsx';
import FavoriteExercises from './Pages/FavoriteExercises.jsx';
import Search from "./Pages/Search.jsx";
import { HashRouter } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen relative flex flex-col">
        <Navbar/>

      <HashRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/bodyparts/:bodypart' element={<Exercises/>}/>
          <Route path='/exercises/:exerciseid' element={<ExerciseDetails/>} />
          <Route path='/favorites' element={<FavoriteExercises/>}/>
          <Route path='/search' element={<Search/>}/>
        </Routes>
      </HashRouter>
      <Footer/>
      </div>
    </Router>
  )
}

export default App
