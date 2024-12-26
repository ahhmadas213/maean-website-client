import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <div className="relative min-h-screen  flex items-center justify-center overflow-hidden">
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
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      
      {/* Content */}
      <div className="relative flex flex-col-reverse md:flex-row items-center justify-center z-20 text-center text-white px-4 sm:px-6 lg:px-8">

        {/* hero content */}
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
          معاً نصنع التغيير
        </h1>
        <p className="text-lg sm:text-2xl md:text-2xl text-gray-300 mb-8">
        يدًا بيد نصنع الفرق ونجعل العالم أفضل.        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
          <Link 
            href="/volunteer" 
            className="bg-primary_blue hover:bg-white hover:text-primary_blue text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            تطوع الآن
          </Link>
          <Link 
            href="/about" 
            className="bg-transparent hover:bg-white hover:text-primary_blue font-bold py-3 px-8 rounded-full border-2 border-white transition duration-300 ease-in-out transform hover:scale-105"
          >
            تعرف علينا
          </Link>
        </div>
        </div>

        
          {/* hero image */}
          <div>
          <Image
            src="/hero.png"
            alt="صورة خلفية للتطوع"
            width={600}
            height={600}
            className="w-full h-full object-cover rounded-full"
          />

        </div>

      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-primary_blue to-transparent opacity-20 z-10"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary_blue rounded-full filter blur-3xl opacity-20 z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary_blue rounded-full filter blur-3xl opacity-20 z-10"></div>
    </div>
  )
}

