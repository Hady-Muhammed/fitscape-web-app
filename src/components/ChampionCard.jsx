import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";

const ChampionCard = ({title , img , desc , olymp}) => {
useEffect(()=> {
    AOS.init({
      duration: 500,
    })
  },[])
  return (
    <div className='text-white text-center space-y-5' data-aos='flip-up'>
        <img className='w-full h-[700px] object-cover rounded-md mx-auto duration-300' src={img} alt={title} />
        <h2 className='text-3xl font-bold'>{title}</h2>
        <p className=''>{desc.slice(0,200) + '...'}</p>
  </div>
  )
}

export default ChampionCard