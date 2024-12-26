'use client';
import { ReactNode } from 'react';
import { FileUploader } from 'react-drag-drop-files';

interface FileUploaderWrapperProps {
  handleChange: (file: File) => void;
  children: ReactNode;
}

const FileUploaderWrapper = ({ handleChange, children }: FileUploaderWrapperProps) => {
  return (
    <FileUploader
      handleChange={handleChange}
      name="file"
      types={['jpg', 'png', 'jpeg', 'webp', 'gif']}
    >
      {children}
    </FileUploader>
  );
};

export default FileUploaderWrapper;