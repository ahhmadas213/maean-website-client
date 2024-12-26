'use client'
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { IoCloudUploadOutline } from 'react-icons/io5'
import { deleteImage, uploadFile } from '@/app/actions/file'
import { useImages } from '@/app/context/ImageProvider'
import GalleryImage from './GalleryImage'
import { FileUploader } from 'react-drag-drop-files'

interface Props {
  visible: boolean
  onClose(state: boolean): void
  onImageUpload(files: { url: string; fileName: string }[]): void
  onSelect?(image: {src: string, alt?: string}): void
}

const ImageGallery = ({ visible, onClose, onImageUpload, onSelect,}: Props) => {
  const [isUploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const image = useImages()
  const images = image?.images
  const updateImages = image?.updateImages
  const deleteOldImages = image?.deleteOldImages

  const handleOnClick = () => {
    onClose(!visible)
  }

  const handleFileChange = async (file: File) => {
    setError(null)
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await uploadFile(formData)
      
      if (res && updateImages) {
        // res now contains both url and fileName
        updateImages([{ url: res.url, fileName: res.fileName }])
        onImageUpload([res])
      }
    } catch (err) {
      console.error('Upload error:', err)
      setError(err instanceof Error ? err.message : 'Failed to upload file')
    } finally {
      setUploading(false)
    }
  }

  const handleSelection = (image : { url: string; fileName: string }) => {
    if (onSelect) {
      onSelect({
        src: image.url, 
        alt: image.fileName 
      });
    }
    onClose(!visible);
  }

  const hadleDelete = async (src: string) => {
    if (deleteOldImages) {
    const res = await deleteImage(src)
    if (res && updateImages) {
        updateImages([])
        deleteOldImages(src)
      }

    }
  }

  if (!visible) return null

  return (
    <div
      tabIndex={-1}
      onKeyDown={({ key }) => {
        if (key === 'Escape') {
          onClose(!visible)
        }
      }}
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50'
    >
      <div className='relative md:w-[760px] w-[80%] mx-auto h-[80%] bg-white rounded-md p-4 overflow-auto'>
        <div className='absolute top-4 p-2 z-50 right-4'>
          <button onClick={handleOnClick}>
            <IoMdClose size={20} />
          </button>
        </div>

        <FileUploader
          handleChange={handleFileChange}
          name="file"
          types={['jpg', 'png', 'jpeg', 'webp', 'gif']}
        >
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-200">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <IoCloudUploadOutline size={24} className='text-gray-500' />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold"> اضافة صو,ة </span> / اسحب و افلت
                </p>
                <p className="text-xs text-gray-500">صور فقط </p>
              </div>
            </label>
          </div>
        </FileUploader>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {images?.length === 0 && (
          <div className="mt-4 p-3 bg-red-100 text-gray-400 rounded">
            لا يوجد صور
          </div>
        )}

        <div className='grid w-full md:grid-cols-4 grid-cols-2 gap-4 mt-4'>
          {isUploading && (
            <div className='w-full aspect-square rounded animate-pulse bg-gray-200'></div>
          )}

          {images && images.map((image) => (
            <GalleryImage key={image.fileName} onDeleteClick={() => hadleDelete(image.url)} onSelectClick={() => handleSelection(image)} src={image.url}/>
          ))}
        </div>
      </div>
    </div>
  )
}
export default ImageGallery