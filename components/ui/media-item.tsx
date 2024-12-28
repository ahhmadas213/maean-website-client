import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
interface MediaItemProps {
  src: string;
  type: "image" | "video";
  title: string;
  description: string;
}
const MediaItem = ({ src, type, title, description }: MediaItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden group rounded-xl shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {type === "image" ? (
        <Image
          width={500}
          height={300}
          src={src}
          alt={title}
          className="w-full h-[300px] object-cover transform transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <video
          src={src}
          className="w-full h-[300px] object-cover"
          controls
          preload="metadata"
        />
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 100 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-right" // RTL support
      >
        <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
        <p className="text-white/90 text-sm">{description}</p>
      </motion.div>
    </motion.div>
  );
};
export default MediaItem;