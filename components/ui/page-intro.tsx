import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link";
import { IconType } from "react-icons/lib";



const PageIntro = ({title, subtitle, imageSrc, icons}: {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  icons?: {
    icon: IconType;
    link: string;
  }[];
}) => {
  return (
    <div className="w-full p-10 relative h-[300px] rounded-xl overflow-hidden">
    <Image
      src={`${imageSrc}`}
      alt={title}
      width={500}
      height={300}
      className="w-full absolute top-0 left-0 h-full object-cover"
    />

    {/* Overlay */}
<motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 0.5 }}
  transition={{ duration: 1 }}
  className="absolute inset-0 bg-black z-10 "
/>


    {/* discription */}
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className=" mb-16 z-20 relative  "
  >
    <h1 className="text-4xl md:text-5xl mb-6 font-bold text-white ">{title} </h1>
    <p className="text-slate-200 max-w-2xl ">{subtitle}</p>
    
    {/* icons */}
    
    {icons && (
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, staggerChildren: 0.1 }}
      className="flex gap-4 mt-4"
    >
      {icons.map((icon, index) => (
        <motion.div
        key={index}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        <Link href={icon.link} className="text-white hover:text-primary_blue transition duration-200">
          <icon.icon className="w-6 h-6 " />
        </Link>
      </motion.div>
      ))}

    </motion.div>
    )}

  </motion.div>
  </div>
  )
}

export default PageIntro