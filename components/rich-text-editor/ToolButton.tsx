import React from 'react'

interface ButtonProps {
    icon: React.ReactNode;
    onClick(): void;
    active?: boolean;
    label?: string;
}

const ToolButton: React.FC<ButtonProps> = ({icon, onClick, active, label}) => {
  return (
    <button 
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`p-2 rounded hover:bg-gray-100 ${active ? 'bg-gray-200 text-black' : 'text-gray-700'}`}
      title={label}
      type="button"
    >
      {icon}
    </button>
  )
}

export default ToolButton