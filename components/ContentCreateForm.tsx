'use client'
import React, { useState } from 'react'
import DynamicRichTextEditor from './rich-text-editor/DynacmicEditor'

const ContentCreateForm = () => {
  const [content, setContent] = useState<string>("")
  const [title, setTitle] = useState<string>("")

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="h-full ">
       <DynamicRichTextEditor setContent={setContent} />
      </div>
    </div>
  )
}

export default ContentCreateForm;
