"use client";

import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ImageCollectionProps } from "@/types";
import { ImageCollection } from "@/components/media/images/image-collection";

export const ImageCollectionParallaxScroll = ({
  imagesCollections,
  className,
}: {
  imagesCollections: ImageCollectionProps[];
  className?: string;
}) => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef, // remove this if your container is not fixed height
    offset: ["start start", "end start"], // remove this if your container is not fixed height
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(imagesCollections.length / 3);

  const firstPart = imagesCollections.slice(0, third);
  const secondPart = imagesCollections.slice(third, 2 * third);
  const thirdPart = imagesCollections.slice(2 * third);

  // Check if there are fewer items than needed for three grids
  const isSingleGrid = imagesCollections.length <= 1;
  const isDoubleGrid = imagesCollections.length <= 2;

  return (
    <div
      className={cn(
        "h-[40rem] items-start overflow-y-auto md:overflow-y-scroll w-full ",
        className
      )}
      ref={gridRef}
    >
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 py-40 px-10",
          {
            "justify-center items-center": isSingleGrid || isDoubleGrid, // Center items if not enough for three grids
            "lg:grid-cols-1": isSingleGrid, // Single grid for one item
            "lg:grid-cols-2": isDoubleGrid, // Double grid for two items
          }
        )}
        ref={gridRef}
      >
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{ y: translateFirst }} // Apply the translateY motion value here
              key={"grid-1" + idx}
            >
              <div className="h-80 w-full object-cover object-left-top overflow-hidden rounded-xl gap-10 !m-0 !p-0 shadow-lg hover:shadow-xl transition-shadow">
                <ImageCollection collection={el} />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => (
            <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
              <div className="h-80 w-full object-cover object-left-top overflow-hidden rounded-xl gap-10 !m-0 !p-0 shadow-lg hover:shadow-xl transition-shadow">
                <ImageCollection collection={el} />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => (
            <motion.div style={{ y: translateThird }} key={"grid-3" + idx}>
              <div className="h-80 w-full object-cover object-left-top overflow-hidden rounded-xl gap-10 !m-0 !p-0 shadow-lg hover:shadow-xl transition-shadow">
                <ImageCollection collection={el} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};