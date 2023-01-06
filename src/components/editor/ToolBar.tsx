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
import { EditorButton } from "./EditorButton";
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
        <EditorButton
          active={editor.isActive("bold")}
          onClick={() => getFocusedEditor(editor).toggleBold().run()}
        >
          <BsTypeBold />
        </EditorButton>
        <EditorButton
          active={editor.isActive("italic")}
          onClick={() => getFocusedEditor(editor).toggleItalic().run()}
        >
          <BsTypeItalic />
        </EditorButton>
        <EditorButton
          active={editor.isActive("underline")}
          onClick={() => getFocusedEditor(editor).toggleUnderline().run()}
        >
          <BsTypeUnderline />
        </EditorButton>
        <EditorButton
          active={editor.isActive("strike")}
          onClick={() => getFocusedEditor(editor).toggleStrike().run()}
        >
          <BsTypeStrikethrough />
        </EditorButton>
      </div>
      <div className="mx-8 h-4 w-[1px] bg-zinc-400"></div>
      <div className="flex items-center space-x-3">
        <EditorButton
          active={editor.isActive("blockquote")}
          onClick={() => getFocusedEditor(editor).toggleBlockquote().run()}
        >
          <RiDoubleQuotesL />
        </EditorButton>
        <EditorButton
          active={editor.isActive("code")}
          onClick={() => getFocusedEditor(editor).toggleCode().run()}
        >
          <BsCode />
        </EditorButton>
        <EditorButton
          active={editor.isActive("codeBlock")}
          onClick={() => getFocusedEditor(editor).toggleCodeBlock().run()}
        >
          <BsBraces />
        </EditorButton>
        {/* <InsertLink onSubmit={handleLinkSubmit} /> */}
        <EditorButton
          active={editor.isActive("bulletList")}
          onClick={() => getFocusedEditor(editor).toggleBulletList().run()}
        >
          <BsListUl />
        </EditorButton>
        <EditorButton
          active={editor.isActive("orderedList")}
          onClick={() => getFocusedEditor(editor).toggleOrderedList().run()}
        >
          <BsListOl />
        </EditorButton>
      </div>
      <div className="mx-8 h-4 w-[1px] bg-zinc-400"></div>
      <div className="flex items-center space-x-3">
        <EditorButton>
          <BsYoutube />
        </EditorButton>
        <EditorButton>
          <BsImage />
        </EditorButton>
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
