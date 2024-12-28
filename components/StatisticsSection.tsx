'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

type Statistic = {
  label: string;
  value: number;
  suffix?: string;
}

const statistics: Statistic[] = [
  { label: 'المبادرات', value: 25 },
  { label: 'المتطوعين', value: 5000, suffix: '+' },
  { label: 'ساعات التطوع', value: 50000 },
  { label: 'المستفيدين', value: 100000, suffix: '+' },
]

const CountingNumber = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  
  useEffect(() => {
    if (!inView) return;

    const duration = 2000; // 2 seconds
    const steps = 60; // Update 60 times (smoother animation)
    const stepDuration = duration / steps;
    const increment = value / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      if (currentStep < steps) {
        setCount(prev => {
          const newValue = Math.min(prev + increment, value);
          return Number(newValue.toFixed(0));
        });
        currentStep++;
      } else {
        clearInterval(timer);
        setCount(value); // Ensure we land exactly on the target value
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <motion.span 
      ref={ref}
      className="inline-block"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {count}{suffix}
    </motion.span>
  );
}

export default function StatisticsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-16 bg-primary_blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl font-bold mb-2 font-arabic">
                <CountingNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-lg font-arabic">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}