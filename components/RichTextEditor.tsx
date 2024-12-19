'use client'
import React, { FC } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
import Tools from './rich-text-editor/Tools';
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder';
import OrderedList from '@tiptap/extension-ordered-list'
import Heading from '@tiptap/extension-heading'

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

const RichTextEditor: FC = () => {
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none rtl prose-headings:font-cairo prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl',
        dir: 'rtl',
      },
    },
  });

  return (
    <div className='flex flex-col h-full' dir="rtl">
      <div className="sticky top-0 bg-white z-50 border-b">
        <div className="max-w-4xl mx-auto w-full">
          <Tools editor={editor}/>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-4">
          <EditorContent 
            editor={editor}
            className="min-h-[300px] [&_.is-editor-empty]:before:text-gray-400 [&_.is-editor-empty]:before:float-right [&_.is-editor-empty]:before:content-[attr(data-placeholder)] [&_.is-editor-empty]:before:pointer-events-none"
          />
        </div>
      </div>
    </div>
  )
}

export default RichTextEditor