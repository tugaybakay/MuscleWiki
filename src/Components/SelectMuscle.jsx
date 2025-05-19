import FrontBodyMap from './BodyMaps/FrontBodyMap'
import BackBodyMap from './BodyMaps/BackBodyMap'

const SelectMuscle = () => {
  return (
    <div className='grid grid-cols-2 grid-rows-1 mx-auto items-center w-full max-sm:grid-rows-2 max-sm:grid-cols-1 grow mb-8'>
      <FrontBodyMap/>
      <BackBodyMap/>
    </div>
  )
}

export default SelectMuscle
