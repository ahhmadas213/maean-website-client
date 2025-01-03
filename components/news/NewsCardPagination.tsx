"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { newsItems } from '@/lib/data'

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0
  })
}

export default function NewsCardPagination() {
  const [[page, direction], setPage] = useState([0, 0])
  const [isLoading, setIsLoading] = useState(true)

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  const currentIndex = ((page % newsItems.length) + newsItems.length) % newsItems.length
  const currentNews = newsItems[currentIndex]

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1) // Move to the next news item
    }, 5000) // Change news item every 5 seconds

    return () => clearInterval(interval) // Cleanup interval on component unmount
  }, [page]) // Re-run effect when `page` changes

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      dir="rtl" 
      className="relative rounded-xl w-full h-80 md:h-96 overflow-hidden bg-gray-100"
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute w-full h-full"
        >
          <div className="relative w-full h-full">
            <Image
              src={currentNews.images![0]}
              alt={currentNews.title}
              fill
              className={`object-cover transition-opacity duration-300 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoadingComplete={() => setIsLoading(false)}
              priority
            />
            <div className="absolute inset-0 bg-black/50 p-8 flex flex-col justify-end">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="md:text-4xl text-xl font-bold text-white mb-4 font-arabic"
              >
                {currentNews.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white text-sm md:text-xl max-w-3xl font-arabic"
              >
                {currentNews.description}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute top-1/2 -translate-y-1/2 left-8 right-8 flex justify-between z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(-1)}
          className="bg-white/50 hover:bg-white/75 text-black p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/75"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-8 md:h-8" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(1)}
          className="bg-white/50 hover:bg-white/75 text-black p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/75"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 md:w-8 md:h-8" />
        </motion.button>
      </div>
    </motion.div>
  )
}