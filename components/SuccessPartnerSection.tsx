'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, PanInfo } from 'framer-motion';
import { useState, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import SectionTitle from './ui/section-title';

interface Partner {
  id: number;
  name: string;
  logo: string;
  slug: string;
}

const partners: Partner[] = [
  {
    id: 1,
    name: "شركة الأمل",
    logo: "/partners/partner1.png",
    slug: "alamal",
  },
  {
    id: 2,
    name: "مؤسسة النور",
    logo: "/partners/partner2.png",
    slug: "alnoor",
  },
  {
    id: 3,
    name: "مركز التقدم",
    logo: "/partners/partner3.png",
    slug: "progress",
  },
  {
    id: 4,
    name: "شركة التحدي",
    logo: "/partners/partner4.png",
    slug: "challenge",
  },
  {
    id: 5,
    name: "مؤسسة الإبداع",
    logo: "/partners/partner5.png",
    slug: "creativity",
  },
];

export default function SuccessPartnerSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 20; // Smaller threshold for lighter drag

    if (info.offset.x < -threshold) {
      setCurrentIndex((prev) => (prev + 1) % partners.length);
    } else if (info.offset.x > threshold) {
      setCurrentIndex((prev) => (prev - 1 + partners.length) % partners.length);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % partners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + partners.length) % partners.length);
  };

  return (
    <section className="py-16 my-10 relative overflow-hidden">
      <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle  title="شركاء النجاح" />

      <div className="relative">
        {/* Left Button */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 z-10"
        >
          <FiChevronLeft size={24} />
        </button>

        {/* Right Button */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 z-10"
        >
          <FiChevronRight size={24} />
        </button>

        <motion.div
          ref={containerRef}
          className="flex space-x-4"
          animate={{ x: `-${currentIndex * (100 / partners.length)}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
        >
          {[...partners, ...partners].map((partner, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-1/3 text-center bg-white shadow-md rounded-xl p-4"
              whileHover={{ scale: 1.05 }}
            >
              <Link href={`/${partner.slug}`} passHref>
                  <Image
                    src={"/initiatives/in3.jpg"}
                    alt={partner.name}
                    width={150}
                    height={150}
                    className="mx-auto mb-4"
                    draggable="false"
                  />
                  <p className="text-lg font-medium">{partner.name}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
      </div>
    </section>
  );
}
