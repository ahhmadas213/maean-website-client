'use client'
import React, { FC, useState, useEffect } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
import Tools from './rich-text-editor/Tools';
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder';
import OrderedList from '@tiptap/extension-ordered-list'
import Heading from '@tiptap/extension-heading'
import ImageGallery from './rich-text-editor/ImageGallery';

const extensions = [StarterKit.configure({
  heading: false,
}), 
Underline, 
TextAlign.configure({
  types: ['heading', 'paragraph'],
  alignments: ['right', 'center', 'left'],
  defaultAlignment: 'right',
}), 
Placeholder.configure({
  placeholder: 'اكتب هنا ...',
}),
OrderedList.configure({
  HTMLAttributes: {
    class: 'list-decimal',
    dir: 'rtl'
  }
}),
Heading.configure({
  levels: [1, 2, 3, 4],
  HTMLAttributes: {
    dir: 'rtl',
    class: 'font-cairo',
  }
})
]

interface Props {
  setContent(value: string): void
  setImages(images: { url: string; fileName: string }[]): void
}

const RichTextEditor: FC<Props> = ({setContent, setImages}) => {

	const [showImageGallery, setShowImageGallery] = useState(false);
	const [isClient, setIsClient] = useState(false);
  
  const [uploadedImages, setUploadedImages] = useState<{ url: string; fileName: string }[]>([]);
  
  
  const setImagesHandler = (images: { url: string; fileName: string }[]) => {
    const newImages = [...uploadedImages, ...images];
    setUploadedImages(newImages);
    setImages(newImages);
  };

  const setContentHandler = () => {
  if (editor) {
    const content = editor.getHTML();
    setContent(content);
  }
};


  

// Add an onUpdate handler to the editor configuration
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none rtl prose-headings:font-cairo prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl',
        dir: 'rtl',
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    }
});


  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);


  useEffect(() => {
    setIsClient(true);
  }, []);


  return (
	<div>
  <div className='h-screen flex flex-col' dir="rtl">
      <div className="sticky top-0 bg-white z-50 border-b">
        <div className="max-w-4xl mx-auto w-full">
          <Tools editor={editor} onImageSelecttion={() => setShowImageGallery(true)}/>
        </div>
      </div>
      <div className="flex-1 ">
        <div className="max-w-4xl mx-auto px-4">
          <EditorContent 
            onChange={setContentHandler}
            editor={editor}
            className="h-full [&_.is-editor-empty]:before:text-gray-400 [&_.is-editor-empty]:before:float-right [&_.is-editor-empty]:before:content-[attr(data-placeholder)] [&_.is-editor-empty]:before:pointer-events-none"
          />
        </div>
      </div>
    </div>

		{isClient && <ImageGallery onImageUpload={setImagesHandler} visible={showImageGallery} onClose={setShowImageGallery} />}
		
	</div> 
  )
}

export default RichTextEditor