import { motion } from 'framer-motion'
import React from 'react'
const Loader = () => {
  return (
    <motion.div 
    className='animate-spin border-t-[4px] border-white rounded-full w-[100px] h-[100px]'
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{duration: .6}}
    >
    </motion.div>
  )
}

export default Loader