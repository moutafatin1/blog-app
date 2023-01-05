import type { Editor } from "@tiptap/react";
import { URL } from "url";

export const getFocusedEditor = (editor: Editor) => editor.chain().focus();

// export const validateUrl = (url: string) => {
//   let finalUrl: URL;
//   try {
//     finalUrl = new URL(url);
//   } catch (error) {
//     finalUrl = new URL("http://" + url);
//   }
//   return finalUrl.origin;
// };
