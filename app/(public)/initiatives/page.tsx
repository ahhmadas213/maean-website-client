"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Mock data for initiatives (in Arabic)
const initiatives = [
  {
    id: 1,
    title: "مبادرة 1",
    description: "هذا هو الوصف الخاص بالمبادرة 1.",
    date: "2023-10-15",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&h=600", // صورة من Unsplash
    status: "منتهية",
  },
  {
    id: 2,
    title: "مبادرة 2",
    description: "هذا هو الوصف الخاص بالمبادرة 2.",
    date: "2024-02-20",
    image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1920&h=600", // صورة من Unsplash
    status: "قادمة",
  },
  {
    id: 3,
    title: "مبادرة 3",
    description: "هذا هو الوصف الخاص بالمبادرة 3.",
    date: "2024-05-10",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&h=600", // صورة من Unsplash
    status: "قادمة",
  },
  // إضافة المزيد من المبادرات هنا
];

export default function InitiativesPage() {
  const [filterStatus, setFilterStatus] = useState<"all" | "منتهية" | "قادمة">("all");
  const [filterDate, setFilterDate] = useState<string | null>(null);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  // Get unique dates from initiatives
  const uniqueDates = Array.from(
    new Set(initiatives.map((initiative) => new Date(initiative.date).toLocaleDateString("ar-EG")))
  );

  // Filter initiatives based on status and date
  const filteredInitiatives = initiatives.filter((initiative) => {
    const matchesStatus = filterStatus === "all" || initiative.status === filterStatus;
    const matchesDate = !filterDate || new Date(initiative.date).toLocaleDateString("ar-EG") === filterDate;
    return matchesStatus && matchesDate;
  });

  // Group initiatives by date
  const groupedInitiatives = filteredInitiatives.reduce((acc, initiative) => {
    const date = new Date(initiative.date).toLocaleDateString("ar-EG");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(initiative);
    return acc;
  }, {} as Record<string, typeof initiatives>);

  // Handle slider change
  const handleSliderChange = (value: number) => {
    if (value === 0) setFilterStatus("all");
    else if (value === 1) setFilterStatus("منتهية");
    else if (value === 2) setFilterStatus("قادمة");
  };

  return (
    <div className="container mx-auto p-4" dir="rtl">
      <h1 className="text-3xl font-bold text-center mb-8">المبادرات</h1>

      {/* Date Filter Dropdown */}
      <div className="mb-8 relative">
        <h2 className="text-xl font-bold mb-4">تصفية حسب التاريخ</h2>
        <button
          onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
          className="w-full max-w-md px-4 py-2 bg-white rounded-xl shadow-lg text-right flex justify-between items-center"
        >
          {filterDate || "اختر تاريخ"}
          <motion.span
            animate={{ rotate: isDateDropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ▼
          </motion.span>
        </button>
        <AnimatePresence>
          {isDateDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute w-full max-w-md bg-white rounded-xl shadow-lg mt-2 z-10"
            >
              <button
                onClick={() => {
                  setFilterDate(null);
                  setIsDateDropdownOpen(false);
                }}
                className="w-full px-4 py-2 text-right hover:bg-gray-100"
              >
                الكل
              </button>
              {uniqueDates.map((date) => (
                <button
                  key={date}
                  onClick={() => {
                    setFilterDate(date);
                    setIsDateDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-right hover:bg-gray-100"
                >
                  {date}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Status Filter Slider */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">تصفية حسب الحالة</h2>
        <div className="relative w-full max-w-md mx-auto">
          <input
            type="range"
            min="0"
            max="2"
            step="1"
            defaultValue="0"
            onChange={(e) => handleSliderChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>الكل</span>
            <span>منتهية</span>
            <span>قادمة</span>
          </div>
        </div>
      </div>

      {/* Modern Grid Layout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {Object.entries(groupedInitiatives).map(([date, initiatives]) => (
          <motion.div
            key={date}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold mb-4">{date}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {initiatives.map((initiative) => (
                <Link
                  key={initiative.id}
                  href={`/initiatives/${initiative.id}`}
                  className="block"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                  >
                    {/* الصورة */}
                    <div className="relative h-48">
                      <Image
                        src={initiative.image}
                        alt={initiative.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* المحتوى */}
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-2">
                        {initiative.title}
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {initiative.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 text-sm rounded-full ${
                            initiative.status === "منتهية"
                              ? "bg-green-100 text-green-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {initiative.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}