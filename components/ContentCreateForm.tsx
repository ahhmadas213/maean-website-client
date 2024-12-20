'use client'
import React, { useState } from 'react'
import RichTextEditor from './RichTextEditor'

const ContentCreateForm = () => {
  const [content, setContent] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [images, setImages] = useState<{ url: string; fileName: string }[]>([])
  console.log({content, title, images})
  return (
    <div>
        <div className='container mx-auto w-full'>
            <RichTextEditor setContent={setContent} setImages={setImages} />
        </div>
    </div>
  )
}

export default ContentCreateForm