/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { BiCheck, BiSolidTrash } from 'react-icons/bi'


interface Props {
    src?: string
    onDeleteClick?(): void
    onSelectClick?(): void
}


const GalleryImage = ({src, onDeleteClick, onSelectClick}: Props) => {
return (
    <div className='w-full aspect-square overflow-hidden rounded relative'>
    <img
    alt='image'
    src={src}
    className='w-full h-full object-cover'
    />

    <div className='flex w-full absolute bottom-0 right-0'>

        <button className='flex bg-red-400 flex-1  text-white items-center justify-center p-2  hover:bg-opacity-80' onClick={onDeleteClick}>
            <BiSolidTrash  />
        </button>

        <button className='flex bg-blue-400 flex-1 text-white items-center justify-center p-2  hover:bg-opacity-80' onClick={onSelectClick}>
            <BiCheck  />
        </button>
    </div>
  </div>
  )
}

export default GalleryImage