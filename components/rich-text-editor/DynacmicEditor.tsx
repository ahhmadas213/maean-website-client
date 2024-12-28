'use client'
import dynamic from 'next/dynamic';
import RichTextEditor from './RichTextEditor';


const DynamicRichTextEditor = dynamic(() => Promise.resolve(RichTextEditor), {
    ssr: false,
});

export default DynamicRichTextEditor