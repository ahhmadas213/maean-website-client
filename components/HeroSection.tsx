'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HeroSection() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero_image_1.jpeg"
        alt="صورة خلفية للتطوع"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute z-0"
      />
      
      {/* Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-black z-10"
      />
      
      {/* Content */}
      <motion.div 
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col-reverse md:flex-row items-center justify-center z-20 text-center text-white px-4 sm:px-6 lg:px-8"
      >
        {/* hero content */}
        <motion.div variants={fadeIn}>
          <motion.h1 
            variants={fadeIn}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight"
          >
            معاً نصنع التغيير
          </motion.h1>
          <motion.p 
            variants={fadeIn}
            className="text-lg sm:text-2xl md:text-2xl text-gray-300 mb-8"
          >
            يدًا بيد نصنع الفرق ونجعل العالم أفضل.
          </motion.p>
          <motion.div 
            variants={staggerChildren}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse"
          >
            <motion.div variants={fadeIn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/volunteer" 
                className="bg-primary_blue hover:bg-white hover:text-primary_blue text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out block"
              >
                تطوع الآن
              </Link>
            </motion.div>
            <motion.div variants={fadeIn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/about" 
                className="bg-transparent hover:bg-white hover:text-primary_blue font-bold py-3 px-8 rounded-full border-2 border-white transition duration-300 ease-in-out block"
              >
                تعرف علينا
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* hero image */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="mb-8 md:mb-0 md:ml-8"
        >
          <motion.div
            variants={floatingAnimation}
            initial="initial"
            animate="animate"
          >
            <Image
              src="/hero.png"
              alt="صورة خلفية للتطوع"
              width={600}
              height={600}
              className="w-full h-full object-cover rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
        className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-primary_blue to-transparent z-10"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 right-0 w-64 h-64 bg-primary_blue rounded-full filter blur-3xl z-10"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-primary_blue rounded-full filter blur-3xl z-10"
      />
    </div>
  )
}