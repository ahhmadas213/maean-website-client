"use client";

import { ImageCollection } from "@/components/media/images/image-collection";

// Mock data for image collections
const imageCollections = [
  {
    id: 1,
    title: "حملة التشجير الوطنية",
    description: "صور من حملتنا الوطنية لزراعة مليون شجرة.",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&h=600",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&h=600",
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=1920&h=600",
    ],
  },
  {
    id: 2,
    title: "برنامج التعليم الإلكتروني",
    description: "صور من برنامج التعليم الإلكتروني الذي أطلقناه.",
    images: [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&h=600",
      "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1920&h=600",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1920&h=600",
    ],
  },
  {
    id: 3,
    title: "مهرجان التراث السنوي",
    description: "صور من مهرجان التراث السنوي الذي نظمناه.",
    images: [
      "https://images.unsplash.com/photo-1581873372796-635b67ca2008?auto=format&fit=crop&w=1920&h=600",
      "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?auto=format&fit=crop&w=1920&h=600",
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1920&h=600",
    ],
  },
  {
    id: 4,
    title: "مشروع تطوير الواجهة البحرية",
    description: "صور من مشروع تطوير الواجهة البحرية.",
    images: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1920&h=600",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1920&h=600",
      "https://images.unsplash.com/photo-1537434556162-bc8599d7a717?auto=format&fit=crop&w=1920&h=600",
    ],
  },
];

const ImagesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary_blue/10">
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-8 text-primary_blue ">
          معرض الصور
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {imageCollections.map((collection) => (
            <ImageCollection key={collection.id} collection={collection} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagesPage;