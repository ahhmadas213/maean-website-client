'use client'
import React from 'react'
import { motion } from 'framer-motion'

const SectionTitle = ({title}: {title: string}) => {
  return (
    <div>


    <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-[5rem] md:absolute top-[-90px] right-0 font-bold text-primary_blue/10" // RTL support
        >
          {title}
        </motion.h2>
    </div>

  )
}

export default SectionTitle