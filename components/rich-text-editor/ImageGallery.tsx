'use client'
import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { FileUploader } from 'react-drag-drop-files'
import { IoCloudUploadOutline } from 'react-icons/io5'
import GalleryImage from './GalleryImage'
import { uploadFile } from '@/app/actions/UploadFile'
interface Props {
  visible: boolean
  onClose(state: boolean): void
  onImageUpload(files:{url: string; fileName: string}[]): void
}

const imageSrc = "https://images.unsplash.com/photo-1730247147351-6db1dc7b2dbc?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

const ImageGallery = ({ visible, onClose, onImageUpload }: Props) => {

  const handleOnClick = () => {
    onClose(!visible)
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
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50'>
      <div className='relative md:w-[760px] w-[80%] mx-auto h-[80%] bg-white rounded-md p-4 overflow-auto'>
        <div className='absolute top-4 p-2 z-50  right-4'>
          <button
            onClick={handleOnClick}
          >
            <IoMdClose size={20} />
          </button>
        </div>

        <FileUploader
          handleChange={async (file: File)  => {

            const formData = new FormData();
            formData.append('file', file);

            const res = await uploadFile(formData);
            onImageUpload([{url: res, fileName: file.name}]);
            console.log("this is the file", res);
            
          }}
          name="file"
          types={['jpg', 'png', 'jpeg', 'svg', 'webp', 'gif', 'mp4']}
        >
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-200">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <IoCloudUploadOutline size={24} className='text-gray-500' />
                <p className="mb-2 text-sm text-gray-500 "><span className="font-semibold">اضغط هنا للرفع</span> او اسحب و افلت الصورة</p>
                <p className="text-xs text-gray-500">ملف صورة</p>
              </div>
            </label>
          </div>
        </FileUploader>

        <p className='text-center text-2xl font-semibold opacity-45'>لا يوجد صور...</p>

        <div className='grid md:grid-cols-4 grid-cols-2 gap-4 mt-4'>
          <GalleryImage src={imageSrc} />       
        </div>
      </div>


    </div>
  )
}

export default ImageGallery