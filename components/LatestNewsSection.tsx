'use client'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import SectionTitle from './ui/section-title'

type NewsItem = {
  id: number;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  link: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "إطلاق حملة التشجير الوطنية الكبرى",
    date: "١٥ يونيو ٢٠٢٣",
    description: "بدأنا حملتنا الوطنية لزراعة مليون شجرة في جميع أنحاء البلاد. انضم إلينا في هذه المبادرة البيئية الهامة.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    link: "/news/national-tree-planting-campaign"
  },
  {
    id: 2,
    title: "برنامج التدريب الصيفي للشباب",
    date: "١ يوليو ٢٠٢٣",
    description: "أعلنا عن بدء التسجيل في برنامج التدريب الصيفي للشباب. فرصة رائعة لاكتساب مهارات جديدة وخدمة المجتمع.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    link: "/news/summer-youth-training-program"
  },
  {
    id: 3,
    title: "نجاح مبادرة توزيع الطعام في رمضان",
    date: "٢٥ أبريل ٢٠٢٣",
    description: "بفضل جهود متطوعينا الكرام، نجحنا في توزيع أكثر من ١٠٠,٠٠٠ وجبة للمحتاجين خلال شهر رمضان المبارك.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    link: "/news/ramadan-food-distribution-success"
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: { 
    scale: 1.05,
    transition: { 
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
}

const buttonVariants = {
  hover: { 
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { scale: 0.95 }
}

export default function LatestNewsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-16 my-10 relative bg-white">

      <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="اخبارنا" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover="hover"
              transition={{ delay: index * 0.1 }}
            >
              <Link href={item.link} className="block h-full">
                <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg h-full">
                  <div className="relative h-48 md:h-64">
                    <Image
                      src="/initiatives/in2.jpg"
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-all duration-300 ease-in-out group-hover:opacity-75"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-primary_blue mb-2">{item.date}</p>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 transition-all duration-300 ease-in-out group-hover:text-blue-600">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="text-center h-20 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link href="/news" className="inline-block mb-4 bg-primary_blue hover:bg-white hover:text-primary_blue hover:border hover:border-primary_blue text-white font-semibold py-3 px-8 rounded-full">
              عرض جميع الأخبار
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

