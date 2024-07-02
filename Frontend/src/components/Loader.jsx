import React, {useState} from 'react'
import GridLoader from "react-spinners/GridLoader";

const Loader = () => {
     let [color, setColor] = useState("#2463eb");
  return (
    <div className='flex items-center justify-center h-screen'>
      <GridLoader color={color} size={15} />
    </div>
  )
}

export default Loader
