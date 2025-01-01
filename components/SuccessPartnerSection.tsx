'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
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
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const cardWidth = useRef(0);
  const maxIndex = Math.max(0, partners.length - itemsPerView);

  const updateItemsPerView = useCallback(() => {
    if (window.innerWidth < 640) {
      setItemsPerView(1);
    } else if (window.innerWidth < 1024) {
      setItemsPerView(2);
    } else {
      setItemsPerView(3);
    }
  }, []);

  useEffect(() => {
    updateItemsPerView();
    const handleResize = () => {
      updateItemsPerView();
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        cardWidth.current = containerWidth / itemsPerView;
        // Ensure current index is valid after resize
        setCurrentIndex(prev => Math.min(prev, partners.length - itemsPerView));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateItemsPerView, itemsPerView]);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      cardWidth.current = containerWidth / itemsPerView;
    }
  }, [itemsPerView]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const threshold = cardWidth.current * 0.2; // 20% of card width as threshold

    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x < 0 && currentIndex < maxIndex) {
        handleNext();
      } else if (info.offset.x > 0 && currentIndex > 0) {
        handlePrev();
      } else {
        // Snap back if threshold not met
        controls.start({ x: -currentIndex * cardWidth.current });
      }
    } else {
      // Snap back if threshold not met
      controls.start({ x: -currentIndex * cardWidth.current });
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      const nextIndex = Math.min(currentIndex + 1, maxIndex);
      setCurrentIndex(nextIndex);
      controls.start({ x: -nextIndex * cardWidth.current });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = Math.max(currentIndex - 1, 0);
      setCurrentIndex(prevIndex);
      controls.start({ x: -prevIndex * cardWidth.current });
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gray-50">
      <div className="max-w-7xl mx-auto relative px-4 sm:px-6 lg:px-8">
        <SectionTitle title="شركاء النجاح" />

        <div className="relative mt-12">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous partners"
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full",
              "bg-white shadow-lg hover:bg-gray-50 transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "hidden sm:block focus:outline-none "
            )}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next partners"
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full",
              "bg-white shadow-lg hover:bg-gray-50 transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "hidden sm:block focus:outline-none "
            )}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            className="overflow-hidden mx-4 sm:mx-12" 
            ref={containerRef}
            aria-label="Partners carousel"
          >
            <motion.div
              className="flex gap-6"
              animate={controls}
              initial={{ x: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 25 
              }}
              drag="x"
              dragConstraints={{ 
                left: -maxIndex * cardWidth.current, 
                right: 0 
              }}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              style={{
                width: `${(partners.length * 100) / itemsPerView}%`,
              }}
            >
              {partners.map((partner) => (
                <motion.div
                  key={partner.id}
                  className={cn(
                    "flex-shrink-0",
                    `w-[calc(${100 / partners.length}% - ${(partners.length - 1) * 24 / partners.length}px)]`
                  )}
                  whileHover={{ scale: isDragging ? 1 : 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    href={`/partners/${partner.slug}`}
                    className="block bg-white rounded-xl shadow-md p-6 transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <div className="aspect-square relative mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={"/initiatives/in3.jpg"}
                        alt={partner.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-center">{partner.name}</h3>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Mobile Pagination Indicators */}
          <div className="flex justify-center gap-2 mt-6 sm:hidden">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  controls.start({ x: -index * cardWidth.current });
                }}
                aria-label={`Go to slide ${index + 1}`}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  currentIndex === index ? "bg-primary w-4" : "bg-gray-300"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}