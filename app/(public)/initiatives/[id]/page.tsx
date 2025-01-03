"use client";

import { useParams } from "next/navigation";
import Image from "next/image";

// Mock data for initiatives (in Arabic)
const initiatives = [
  {
    id: 1,
    title: "مبادرة 1",
    description: "هذا هو الوصف الخاص بالمبادرة 1.",
    date: "2023-10-15",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&h=600",
      "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1920&h=600",
    ],
    videos: [],
    status: "منتهية",
  },
  {
    id: 2,
    title: "مبادرة 2",
    description: "هذا هو الوصف الخاص بالمبادرة 2.",
    date: "2024-02-20",
    images: [],
    videos: ["https://www.youtube.com/embed/dQw4w9WgXcQ"], // مثال لرابط فيديو من YouTube
    status: "قادمة",
  },
  // إضافة المزيد من المبادرات هنا
];

export default function InitiativePage() {
  const params = useParams();
  const initiative = initiatives.find(
    (initiative) => initiative.id === parseInt(params.id as string)
  );

  if (!initiative) {
    return (
      <div className=" h-screen mx-auto w-full ">
          <div className="flex mx-auto items-center justify-center h-full container">
              <p className="text-gray-600 mb-4">هذا المبادرة غير موجود.</p>
          </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4" dir="rtl">
      <h1 className="text-3xl font-bold text-center mb-8">{initiative.title}</h1>

      {/* محتوى المبادرة */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <p className="text-gray-600 mb-4">{initiative.description}</p>

        {/* التاريخ والحالة */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-gray-500">
            التاريخ: {new Date(initiative.date).toLocaleDateString("ar-EG")}
          </span>
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

        {/* الصور */}
        {initiative.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {initiative.images.map((image, index) => (
              <div key={index} className="rounded-xl overflow-hidden">
                <Image
                  src={image}
                  alt={`صورة ${index + 1}`}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* الفيديوهات */}
        {initiative.videos.length > 0 && (
          <div className="grid grid-cols-1 gap-4 mb-6">
            {initiative.videos.map((video, index) => (
              <div key={index} className="rounded-xl overflow-hidden">
                <iframe
                  src={video}
                  title={`فيديو ${index + 1}`}
                  className="w-full h-64"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}