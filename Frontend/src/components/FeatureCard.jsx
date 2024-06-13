import React from 'react'
import HassleFree from '../assets/Hasslefree.svg'


const FeatureCard = ({ImageSrc,MainText,SecondaryText}) => {
  return (
    <div>
    <div className=' dark:shadow-none '>
    <img src={ImageSrc} alt="HassleFree" className="object-fit"/>
    </div>
    <div className='items-center mt-1'>
     <h2 className='dark:text-white text-base font-semibold'>{MainText}</h2>
     <p className='dark:text-gray-400  text-gray-500 text-xs font-normal'>{SecondaryText}</p>
    </div>
    </div>
  )
}

export default FeatureCard
