'use client'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import SectionTitle from './ui/section-title'

type Initiative = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const initiatives: Initiative[] = [
  {
    id: 1,
    title: "حملة التشجير الوطنية",
    description: "انضم إلينا في زراعة مليون شجرة لمكافحة التغير المناخي وتحسين البيئة المحلية.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    link: "/initiatives/tree-planting"
  },
  {
    id: 2,
    title: "برنامج محو الأمية الرقمية",
    description: "ساعد في تعليم المهارات الرقمية الأساسية للأشخاص في المجتمعات المحرومة.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    link: "/initiatives/digital-literacy"
  },
  {
    id: 3,
    title: "مبادرة الغذاء للجميع",
    description: "ساهم في توزيع الطعام على المحتاجين وساعد في مكافحة الجوع في مجتمعنا.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    link: "/initiatives/food-for-all"
  },
  {
    id: 4,
    title: "برنامج الدعم النفسي",
    description: "قدم الدعم النفسي والعاطفي للأشخاص الذين يعانون من الضغوط والتحديات النفسية.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    link: "/initiatives/mental-health-support"
  },
  {
    id: 5,
    title: "مشروع تنظيف الشواطئ",
    description: "شارك في حماية الحياة البحرية والحفاظ على نظافة شواطئنا من خلال حملات التنظيف المنتظمة.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    link: "/initiatives/beach-cleanup"
  }
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
  }
}

export default function InitiativesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-16 my-10 bg-gray-100">
      <div className="max-w-7xl mx-auto relative px-4 sm:px-6 lg:px-8">
        <SectionTitle title="المبادرات" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {initiatives.map((initiative, index) => (
            <motion.div 
              key={initiative.id} 
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${index === 0 ? 'md:col-span-2' : ''}`}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative h-48 md:h-64">
                <Image
                  src="/initiatives/in1.jpg"
                  alt={initiative.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6 group">
                <h3 className="text-xl font-semibold text-primary_blue  mb-2 transition-transform duration-300 group-hover:translate-x-4 rtl:group-hover:-translate-x-4">{initiative.title}</h3>
                <p className="text-gray-600 mb-4 transition-transform duration-300 group-hover:translate-x-4 rtl:group-hover:-translate-x-4">{initiative.description}</p>
                <Link href={initiative.link} className="text-primary_blue hover:text-primary font-semibold inline-block transition-all duration-300 ease-in-out transform group-hover:translate-x-6 rtl:group-hover:-translate-x-6">
                  اكتشف المزيد &larr;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

