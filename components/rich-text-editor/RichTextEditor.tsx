'use client'
import React, { FC, useState, useEffect } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
import Tools from './Tools';
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder';
import OrderedList from '@tiptap/extension-ordered-list'
import Heading from '@tiptap/extension-heading'
import ImageGallery from './ImageGallery';
import Image from '@tiptap/extension-image'
import "@/app/globals.css";

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
}),
Image.configure({
  inline: false,
  allowBase64: true,
  HTMLAttributes: {
    class: 'resize-image',
  },
}),
]

interface Props {
    setContent(value: string): void
  }

const RichTextEditor: FC<Props> = ({setContent}) => {

	const [showImageGallery, setShowImageGallery] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<{ url: string; fileName: string }[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const editor = useEditor({
    extensions,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none rtl prose-headings:font-cairo prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl h-full',
        dir: 'rtl',
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    }
  });

  const setImagesHandler = (images: { url: string; fileName: string }[]) => {
    const newImages = [...uploadedImages, ...images];
    setUploadedImages(newImages);
  };

  const setContentHandler = () => {
    if (editor) {
      const content = editor.getHTML();
      setContent(content);
    }
  };

  const onImageSelect = ({ src, alt }: { src: string; alt?: string }) => {
    editor?.chain().focus().setImage({ src, alt }).run();
    setShowImageGallery(false);
  };



// Modify useEffect
useEffect(() => {
  setIsMounted(true);
  return () => editor?.destroy();
}, [editor]);


// Add check before return
if (!isMounted) return null;


  return (
    <div className="h-screen flex items-center justify-center">
    <div className="h-full w-full max-w-2xl mx-auto px-4 flex flex-col">
      <div className="sticky top-0 bg-white z-50 border-b">
        <Tools editor={editor} onImageSelecttion={() => setShowImageGallery(true)} />
      </div>
      <div className="flex-1 flex">
        <EditorContent
          onChange={setContentHandler}
          editor={editor}
          className="h-full w-full [&_.is-editor-empty]:before:text-gray-400 [&_.is-editor-empty]:before:float-right [&_.is-editor-empty]:before:content-[attr(data-placeholder)] [&_.is-editor-empty]:before:pointer-events-none"
        />
      </div>
    </div>

    {/* TODO fix image gallery bug */}
    <ImageGallery
      onImageUpload={setImagesHandler}
      visible={showImageGallery}
      onClose={setShowImageGallery}
      onSelect={onImageSelect}
    />
  </div>
  );
}

export default RichTextEditor;
