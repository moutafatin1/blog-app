import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import type { Range } from "@tiptap/react";
import { EditorContent, getMarkRange, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { MarkType } from "prosemirror-model";
import { useEffect, useState } from "react";
import { EditLink } from "./Link/EditLink";
import { ToolBar } from "./ToolBar";

export const TiptapEditor = () => {
  const [selectRange, setSelectRange] = useState<Range>();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          target: "",
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing...",
      }),
    ],
    editorProps: {
      handleClick(view, pos, event) {
        const { state } = view;
        const selectionRange = getMarkRange(
          state.doc.resolve(pos),
          state.schema.marks.link as MarkType
        );
        if (selectionRange) setSelectRange(selectionRange);
      },
      attributes: {
        class: "prose prose-lg focus:outline-none  mx-auto max-w-full h-full",
      },
    },
  });

  useEffect(() => {
    if (editor && selectRange) {
      editor.commands.setTextSelection(selectRange);
    }
  }, [editor, selectRange]);

  return (
    <div className=" flex-1 overflow-y-auto rounded-lg bg-slate-50 p-3 shadow-md">
      <ToolBar editor={editor} />
      <div className="my-3 h-[1px] w-full bg-gray-400"></div>
      {editor && <EditLink editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};
