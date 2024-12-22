'use client'

import { createContext, useContext, useEffect, useState } from "react";
import {readAllImages} from '../actions/file'
interface Props {
  children: React.ReactNode
}

interface InitialImageContext {
  images: { url: string; fileName: string }[]
  updateImages(images: { url: string; fileName: string }[]): void
  deleteOldImages(src: string): void
} 

const Context = createContext<InitialImageContext | null>(null);
const ImageProvider = ({ children }: Props) => {
  const [images, setImages] = useState<{ url: string; fileName: string }[]>([]);

  const updateImages = (data: { url: string; fileName: string }[]) => {
    const updatedImageMap = new Map(
      [...images, ...data].map((image) => [image.url, image])
    );
    const uniqueImages = Array.from(updatedImageMap.values());
    setImages(uniqueImages);
  };

  const deleteOldImages = (src: string) => {
    const newImages = images.filter((image) => image.url !== src);
    setImages(newImages);
  };

  useEffect(() => {
    readAllImages().then((data) => {
      setImages(data);
    });
  }, []);

  return (
    <Context.Provider value={{ images, updateImages, deleteOldImages }}>
      {children}
    </Context.Provider>
  );
};

export const useImages = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('useImages must be used within a ImageProvider')
  }
  return context
}

export default ImageProvider