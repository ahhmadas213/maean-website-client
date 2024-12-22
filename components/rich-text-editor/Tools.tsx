import {
  BiBold,
  BiItalic,
  BiUnderline,
  BiListUl,
  BiListOl,
  BiStrikethrough,
  BiAlignLeft,
  BiAlignMiddle,
  BiAlignRight,
  BiImage
} from "react-icons/bi";
import ToolButton from "./ToolButton";
import { ChainedCommands, Editor } from "@tiptap/react";

const tools = [
  {
    task: "bold",
    icon: <BiBold size={20}/>,
    label: "غامق",
  },
  {
    task: "italic",
    icon: <BiItalic size={20}/>,
    label: "مائل",
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
    label: "قائمة"
  },
  {
    task: "orderedList",
    icon: <BiListOl size={20}/>,
    label: "قائمة"
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
] as const;

const headOptions = [
  {task: "p", label: "فقرة", value: 'Paragraph'},
  { task: "h1", label: "كبير", value: 'Heading1' },
  { task: "h2", label: "متوسط", value: 'Heading2' },
  { task: "h3", label: "صغير", value: 'Heading3' },
] as const;

interface Props {
  editor: Editor | null;
  onImageSelecttion?(): void;
}

const chainMethod = (editor: Editor | null, command: (chain: ChainedCommands) => ChainedCommands) => {
  if (!editor) return;
  command(editor.chain()).run();
};

const Tools = ({ editor, onImageSelecttion }: Props) => {
  const getTaskHandler = (task: string) => {
    switch (task) {
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
        return onImageSelecttion ? onImageSelecttion : () => {};
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

  const handleHeadings : React.ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
    const { value } = target;
    switch (value) {
      case 'p':
        chainMethod(editor, (chain) => chain.setParagraph());
        break;
      case 'h1':
        return chainMethod(editor, (chain) => chain.toggleHeading({ level: 1 }));
      case 'h2':
        return chainMethod(editor, (chain) => chain.toggleHeading({ level: 2 }));
      case 'h3':
        return chainMethod(editor, (chain) => chain.toggleHeading({ level: 3 }));
      default:
        return chainMethod(editor, (chain) => chain.setParagraph());
    }
  };

  const handleImageResize = (size: "small" | "medium" | "large") => {
    if (!editor) return;
    
    const widthMap = {
      small: 200,
      medium: 400,
      large: 600
    };

    const { selection } = editor.state;
    const node = selection.$anchor.parent;
    
    if (node.type.name === 'image') {
      editor.commands.updateAttributes('image', {
        width: widthMap[size],
        height: 'auto'
      });
    } else {
      // If direct parent is not an image, look for nearest image node
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === 'image' && pos >= selection.from && pos <= selection.to) {
          editor.chain()
            .setNodeSelection(pos)
            .updateAttributes('image', {
              width: widthMap[size],
              height: 'auto'
            })
            .run();
          return false; // stop traversing
        }
      });
    }
  };


  const getSelectedHeading = () => {
      let result = 'p';
      if (editor?.isActive('heading', { level: 1 })) result = 'h1';
      if (editor?.isActive('heading', { level: 2 })) result = 'h2';
      if (editor?.isActive('heading', { level: 3 })) result = 'h3';
      return result;
  };

  return (
    <div className="flex items-center justify-start flex-wrap gap-2 p-3" dir="rtl">
      {tools.map((tool) => (
        <ToolButton
          key={tool.task}
          active={isActive(tool.task)}
          onClick={tool.task === 'image' ? (onImageSelecttion ? onImageSelecttion : () => {}) : getTaskHandler(tool.task)}
          icon={tool.icon}
          label={tool.label}
        />
      ))}

      <select value={getSelectedHeading()}
        className="border border-gray-300 rounded-md p-2"
        onChange={handleHeadings}
      >
        {headOptions.map((option) => (
          <option key={option.label} value={option.task}>
            {option.label}
          </option>
        ))}
      </select>

      {editor?.isActive("image") && (
        <div className="flex items-center gap-2">
          <label htmlFor="image-size" className="text-sm">
            حجم الصورة:
          </label>
          <select 
            id="image-size"
            className="border border-gray-300 rounded-md p-2"
            onChange={(e) => handleImageResize(e.target.value as "small" | "medium" | "large")}
          >
            <option value="small">صغير</option>
            <option value="medium">متوسط</option>
            <option value="large">كبير</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default Tools;