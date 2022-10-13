import { motion } from 'framer-motion';
import React, { useEffect, useRef , useState } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";

const VolumeCalculator = () => {
  // States
  const [total , setTotal] = useState(null)
  // Refs
  const sets = useRef();
  const reps = useRef();
  const wt = useRef();
  // Functions
  const EvaluateVol = () => {
        setTotal(sets.current.value * reps.current.value * wt.current.value);
  }
  useEffect(()=> {
    AOS.init({
      duration: 500,
    })
  },[])
return (
    <div className='main-color flex items-center justify-center h-screen flex-col space-y-8' id='volume'>
        <table data-aos="fade-up">
            <thead>
                <tr>
                    <th className='text-xl p-5 text-white'>
                        Number of Sets
                    </th>
                    <th className='text-xl p-5 text-white'>
                        Number of Reps
                    </th>
                    <th className='text-xl p-5 text-white'>
                        Weight Lifted(kg)
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='p-2'>
                        <input ref={sets} className='font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 w-[70px] outline-none' type="number" required />
                    </td>
                    <td className='p-2'>
                        <input ref={reps} className='font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 w-[70px] outline-none' type="number" required />
                    </td>
                    <td className='p-2'>
                        <input ref={wt} className='font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 w-[70px] outline-none' type="number" required />
                    </td>
                </tr>
            </tbody>
        </table>
        <div data-aos='fade-in' data-aos-delay="500">
            <motion.button 
            className='text-white border px-4 py-1 text-xl rounded-lg eval italic'
            whileHover={{scale: 1.1 , transition: {ease: "linear", repeat: Infinity, repeatType: "reverse"} }}
            transition={{ duration: .5}}
            onClick={EvaluateVol}>
                Evaluate
            </motion.button>
        </div>
        {
            total &&
            
                <>
            <motion.span 
            className='text-white text-5xl block mt-12'
            initial={{x: '-50vh'}}
            animate={{x: 0}}
            transition={{ type: "spring", stiffness: 100 }}
            >TOTAL = {total}</motion.span>
            
            <motion.span 
            className='text-2xl block mt-12 text-green-600'
            initial={{x: '100vh'}}
            animate={{x: 0}}
            transition={{ delay: 1, type: "spring", stiffness: 100 }}
            >KEEP GOING!</motion.span>
            </>
            
            
        }
    </div>

  )
}

export default VolumeCalculator