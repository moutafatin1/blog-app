import type { Editor } from "@tiptap/react";
import { AiFillCaretDown } from "react-icons/ai";
import {
  BsBraces,
  BsCode,
  BsImage,
  BsListOl,
  BsListUl,
  BsTypeBold,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsTypeUnderline,
  BsYoutube,
} from "react-icons/bs";
import { RiDoubleQuotesL } from "react-icons/ri";
import { DropdownOptions } from "../common";
import { Button } from "./Button";
import { InsertLink } from "./Link/InsertLink";
import type { LinkOptions } from "./Link/LinkForm";
import { getFocusedEditor } from "./utils";

type ToolBarProps = {
  editor: Editor | null;
};

export const ToolBar = ({ editor }: ToolBarProps) => {
  if (!editor) return null;
  const options = [
    {
      label: "Paragraph",
      onClick: () => getFocusedEditor(editor).setParagraph().run(),
    },
    {
      label: "Heading 1",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 1 }).run(),
    },
    {
      label: "Heading 2",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Heading 3",
      onClick: () => getFocusedEditor(editor).toggleHeading({ level: 3 }).run(),
    },
  ];
  const getLabel = () => {
    if (editor.isActive("heading", { level: 1 })) return "Heading 1";
    if (editor.isActive("heading", { level: 2 })) return "Heading 2";
    if (editor.isActive("heading", { level: 3 })) return "Heading 3";

    return "Paragraph";
  };

  const handleLinkSubmit = (link: LinkOptions) => {
    editor.commands.setLink({
      href: link.url,
      target: link.openInNewTab ? "_blank" : null,
    });
  };
  return (
    <div className="flex items-center">
      <DropdownOptions options={options} head={<Head label={getLabel()} />} />
      <div className="mx-8 h-4 w-[1px] bg-zinc-400"></div>
      <div className="flex items-center space-x-3">
        <Button
          active={editor.isActive("bold")}
          onClick={() => getFocusedEditor(editor).toggleBold().run()}
        >
          <BsTypeBold />
        </Button>
        <Button
          active={editor.isActive("italic")}
          onClick={() => getFocusedEditor(editor).toggleItalic().run()}
        >
          <BsTypeItalic />
        </Button>
        <Button
          active={editor.isActive("underline")}
          onClick={() => getFocusedEditor(editor).toggleUnderline().run()}
        >
          <BsTypeUnderline />
        </Button>
        <Button
          active={editor.isActive("strike")}
          onClick={() => getFocusedEditor(editor).toggleStrike().run()}
        >
          <BsTypeStrikethrough />
        </Button>
      </div>
      <div className="mx-8 h-4 w-[1px] bg-zinc-400"></div>
      <div className="flex items-center space-x-3">
        <Button
          active={editor.isActive("blockquote")}
          onClick={() => getFocusedEditor(editor).toggleBlockquote().run()}
        >
          <RiDoubleQuotesL />
        </Button>
        <Button
          active={editor.isActive("code")}
          onClick={() => getFocusedEditor(editor).toggleCode().run()}
        >
          <BsCode />
        </Button>
        <Button
          active={editor.isActive("codeBlock")}
          onClick={() => getFocusedEditor(editor).toggleCodeBlock().run()}
        >
          <BsBraces />
        </Button>
        <InsertLink onSubmit={handleLinkSubmit} />
        <Button
          active={editor.isActive("bulletList")}
          onClick={() => getFocusedEditor(editor).toggleBulletList().run()}
        >
          <BsListUl />
        </Button>
        <Button
          active={editor.isActive("orderedList")}
          onClick={() => getFocusedEditor(editor).toggleOrderedList().run()}
        >
          <BsListOl />
        </Button>
      </div>
      <div className="mx-8 h-4 w-[1px] bg-zinc-400"></div>
      <div className="flex items-center space-x-3">
        <Button>
          <BsYoutube />
        </Button>
        <Button>
          <BsImage />
        </Button>
      </div>
    </div>
  );
};

const Head = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center space-x-2 text-gray-800">
      <p>{label}</p>
      <AiFillCaretDown />
    </div>
  );
};
