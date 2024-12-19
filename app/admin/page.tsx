'use client'
import RichTextEditor from '@/components/RichTextEditor'
import React, { useCallback } from 'react'

const Admin = () => {
  const [content, setContent] = React.useState('')

  const handleEditorChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  const handleImageUpload = useCallback(async () => {
    // Implement image upload logic here
    return '';
  }, []);

  return (
    <div>
      <h1>Admin</h1>
      <div className='container mx-auto'>
        {/* <RichTextEditor 
          value={content} 
          onChange={handleEditorChange} 
          onImageUpload={handleImageUpload} 
        /> */}
      </div>
    </div>
  )
}

export default Admin