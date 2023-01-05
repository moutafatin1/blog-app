import type { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react";
import { useCallback, useState } from "react";
import { BiUnlink } from "react-icons/bi";
import { BsBoxArrowUpRight, BsPencilSquare } from "react-icons/bs";
import type { LinkOptions } from "./LinkForm";
import { LinkForm } from "./LinkForm";

type EditLinkProps = {
  editor: Editor;
};

export const EditLink = ({ editor }: EditLinkProps) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const handleOnLinkOpenClick = useCallback(() => {
    const { href } = editor.getAttributes("link");
    if (href) {
      window.open(href, "_blank");
    }
  }, [editor]);

  const handleLinkEditClick = () => {
    setShowEditForm(true);
  };

  const handleUnlinkClick = () => {
    editor.commands.unsetLink();
  };

  const handleSubmit = ({ url, openInNewTab }: LinkOptions) => {
    console.log("🚀 ~ file: EditLink.tsx:31 ~ handleSubmit ~ url", url);

    editor
      .chain()
      .focus()
      .unsetLink()
      .setLink({ href: url, target: openInNewTab ? "_blank" : null })
      .run();
  };

  const getInitialState = useCallback(() => {
    const { href, target } = editor.getAttributes("link");
    return { url: href as string, openInNewTab: target ? true : false };
  }, [editor]);

  return (
    <BubbleMenu
      shouldShow={({ editor }) => {
        return editor.isActive("link");
      }}
      editor={editor}
      tippyOptions={{
        onHidden: () => setShowEditForm(false),
      }}
    >
      <LinkForm
        visible={showEditForm}
        onSubmit={handleSubmit}
        initialState={getInitialState()}
      />
      {!showEditForm && (
        <div className="bg-primary dark:bg-primary-dark text-primary-dark dark:text-primary shadow-secondary-dark z-50 flex items-center space-x-6 rounded p-3 shadow-md">
          <button onClick={handleOnLinkOpenClick}>
            <BsBoxArrowUpRight />
          </button>

          <button onClick={handleLinkEditClick}>
            <BsPencilSquare />
          </button>

          <button onClick={handleUnlinkClick}>
            <BiUnlink />
          </button>
        </div>
      )}
    </BubbleMenu>
  );
};
