import React from 'react'
import { Link } from 'react-router-dom'
import {SiFitbit} from 'react-icons/si'
const Logo = () => {
  return (
    <Link to={'/fitscape-web-app/'}>
      <span className="z-10 absolute top-4 right-10 text-white xs:text-lg lg:text-4xl font-mono font-extrabold flex items-center">
        <span className='mr-2'>Fitscape</span>
        <SiFitbit size={25}/>
      </span>
    </Link>
  )
}

export default Logo