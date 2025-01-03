"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageCollectionProps } from "@/types";

export const ImageCollection = ({ collection }: { collection: ImageCollectionProps }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Open gallery popup
  const openGallery = (index: number) => {
    setIsGalleryOpen(true);
    setCurrentImageIndex(index);
  };

  // Close gallery popup
  const closeGallery = () => {
    setIsGalleryOpen(false);
    setCurrentImageIndex(0);
  };

  // Navigate through images in the gallery
  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % collection.images.length
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? collection.images.length - 1 : prevIndex - 1
    );
  };

  // Navigate to a specific image by index
  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      {/* Image Collection Section */}
      <section
        className="relative h-80 flex flex-col justify-center items-center text-white overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
        style={{
          backgroundImage: `url(${collection.images[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={() => openGallery(0)}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Collection Content */}
        <div className="relative z-10 p-8">
          <h2 className="text-3xl font-bold mb-4">{collection.title}</h2>
          <p className="text-lg mb-6">{collection.description}</p>
          <button
            onClick={() => openGallery(0)}
            className="bg-primary_blue text-white px-6 py-2 rounded-xl hover:bg-primary_blue/90 transition-all"
          >
            عرض الصور
          </button>
        </div>
      </section>

      {/* Gallery Popup */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 p-4">
          <div className="relative w-full max-w-4xl h-[90vh] flex flex-col justify-center items-center">
            {/* Current Image */}
            <div className="w-full mb-8 flex justify-center items-center overflow-hidden">
              <Image
                src={collection.images[currentImageIndex]}
                alt={`Image ${currentImageIndex + 1}`}
                width={1920}
                height={1080}
                className="w-auto h-auto max-w-full max-h-full object-contain rounded-xl"
              />
            </div>

            {/* Thumbnail Navigation Row */}
            <div className="w-full flex justify-center items-center gap-2 overflow-x-auto py-2">
              {collection.images.map((image, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-16 h-16 cursor-pointer rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index
                      ? "border-primary_blue"
                      : "border-transparent"
                  }`}
                  onClick={() => goToImage(index)}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2  left-4 transform -translate-y-1/2 bg-white/50 text-black p-3 rounded-full hover:bg-white/75 transition-all"
            >
              &larr;
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 text-black p-3 rounded-full hover:bg-white/75 transition-all"
            >
              &rarr;
            </button>

            {/* Close Button */}
            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 bg-white/50 text-black p-3 rounded-full hover:bg-white/75 transition-all"
            >
              &times;
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white/50 text-black px-4 py-2 rounded-full">
              {currentImageIndex + 1} / {collection.images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};