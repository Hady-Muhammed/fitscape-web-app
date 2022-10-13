import { motion } from 'framer-motion'
import React from 'react'
import { champions } from '../championsData'
import ChampionCard from './ChampionCard'

const ChampionSection = () => {
  return (
    <section className='xs:p-2 md:p-16 main-color' id='champions'>
      <motion.div
      exit={{x: '-200vh'}}
      >
        <h2 className='text-5xl text-white font-semibold4 text-center p-12'>Some of the Greatest of ALL time Classic Physiques!</h2>
        <div className="grid md:grid-cols-2 gap-20">
            {
            champions.map(champ => (
                <ChampionCard key={champ.title} title={champ.title} img={champ.img} desc={champ.desc}/>
            ))
            }
        </div>
      </motion.div>
    </section>
  )
}

export default ChampionSection