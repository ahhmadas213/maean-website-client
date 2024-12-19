import {
  BiBold,
  BiItalic,
  BiUnderline,
  BiListUl,
  BiListOl,
  BiCode,
  BiStrikethrough,
  BiAlignLeft,
  BiAlignMiddle,
  BiAlignRight,
    BiHeading,
    BiImage
} from "react-icons/bi";
import ToolButton from "./ToolButton";

import { ChainedCommands, Editor } from "@tiptap/react";

const tools = [
  {
    task: "h1",
    icon: <BiHeading size={20}/>,
    label: "عنوان 1"
  },
  {
    task: "h2",
    icon: <BiHeading size={18}/>,
    label: "عنوان 2"
  },
  {
    task: "h3",
    icon: <BiHeading size={16}/>,
    label: "عنوان 3"
  },
  {
    task: "h4",
    icon: <BiHeading size={14}/>,
    label: "عنوان 4"
  },
  {
    task: "bold",
    icon: <BiBold size={20}/>,
    label: "غامق",
    
  },
  {
    task: "italic",
    icon: <BiItalic size={20}/>,
    label: "مائل",
  },
  {
    task: "underline",
    icon: <BiUnderline size={20}/>,
    label: "تسطير"
  },
  {
    task: "strike",
    icon: <BiStrikethrough size={20}/>,
    label: "حذف",
  },
  {
    task: "bulletList",
    icon: <BiListUl size={20}/>,
    label: "قائمة"
  },
  {
    task: "orderedList",
    icon: <BiListOl size={20}/>,
    label: "قائمة"
  },
  {
    task: "right",
    icon: <BiAlignRight size={20}/>,
    label: "محاذاة لليمين"
  },
  {
    task: "center",
    icon: <BiAlignMiddle size={20}/>,
    label: "توسيط"
  },
  {
    task: "left",
    icon: <BiAlignLeft size={20}/>,
    label: "محاذاة لليسار"
  },
  {
    task: "image",
    icon: <BiImage size={20}/>,
    label: "صورة"
  }
];

interface Props {
  editor: Editor | null;
}

const chainMethod = (editor: Editor | null, command: (chain: ChainedCommands) => ChainedCommands) => {
  if (!editor) return;
  command(editor.chain()).run();
};

const Tools = ({ editor }: Props) => {
  const getTaskHandler = (task: string) => {
    switch (task) {
      case "h1":
        return () => chainMethod(editor, (chain) => chain.toggleHeading({ level: 1 }));
      case "h2":
        return () => chainMethod(editor, (chain) => chain.toggleHeading({ level: 2 }));
      case "h3":
        return () => chainMethod(editor, (chain) => chain.toggleHeading({ level: 3 }));
      case "h4":
        return () => chainMethod(editor, (chain) => chain.toggleHeading({ level: 4 }));
      case "bold":
        return () => chainMethod(editor, (chain) => chain.toggleBold());
      case "italic":
        return () => chainMethod(editor, (chain) => chain.toggleItalic());
      case "underline":
        return () => chainMethod(editor, (chain) => chain.toggleUnderline());
      case "strike":
        return () => chainMethod(editor, (chain) => chain.toggleStrike());
      case "bulletList":
        return () => chainMethod(editor, (chain) => chain.toggleBulletList());
      case "orderedList":
        return () => chainMethod(editor, (chain) => chain.toggleOrderedList());
      case "right":
        return () => chainMethod(editor, (chain) => chain.setTextAlign('right'));
      case "center":
        return () => chainMethod(editor, (chain) => chain.setTextAlign('center'));
      case "left":
        return () => chainMethod(editor, (chain) => chain.setTextAlign('left'));
      case "image":
        return () => chainMethod(editor, (chain) => chain.insertImage({ src: '', alt: '' }));   
      default:
        return () => {};
    }
  };

  const isActive = (task: string) => {
    if (!editor) return false;
    
    switch (task) {
      case "h1":
        return editor.isActive('heading', { level: 1 });
      case "h2":
        return editor.isActive('heading', { level: 2 });
      case "h3":
        return editor.isActive('heading', { level: 3 });
      case "h4":
        return editor.isActive('heading', { level: 4 });
      case "bold":
        return editor.isActive('bold');
      case "italic":
        return editor.isActive('italic');
      case "underline":
        return editor.isActive('underline');
      case "strike":
        return editor.isActive('strike');
      case "bulletList":
        return editor.isActive('bulletList');
      case "orderedList":
        return editor.isActive('orderedList');
      case "right":
        return editor.isActive({ textAlign: 'right' });
      case "center":
        return editor.isActive({ textAlign: 'center' });
      case "left":
        return editor.isActive({ textAlign: 'left' });
      case "image":
        return editor.isActive('image');    
      default:
        return false;
    }
  };

  return (
    <div className="flex flex-wrap gap-2 p-3" dir="rtl">
      {tools.map((tool) => (
        <ToolButton
          key={tool.task}
          active={isActive(tool.task)}
          onClick={getTaskHandler(tool.task)}
          icon={tool.icon}
          label={tool.label}
        />
      ))}
    </div>
  );
};

export default Tools;