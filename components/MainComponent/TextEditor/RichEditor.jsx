"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Link from "@tiptap/extension-link";
import ToolBar from "./ToolBar";

export default function RichTextEditor({ content, onChange = () => {} }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [2, 3, 4, 5, 6],
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-3",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-3",
        },
      }),
      Highlight,
      Link.configure({
        openOnClick: true,
        linkOnPaste: true,
        autolink: true,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
        renderHTML({ node }) {
          return [
            "a",
            {
              href: node.attrs.href,
              target: node.attrs.target,
              rel: node.attrs.rel,
              class: "text-blue-500 underline hover:text-blue-700",
            },
            node.children,
          ];
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "min-h-[500px]  border rounded-md bg-slate-50 py-2 px-3 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log("Editor content updated:", html);
      onChange(html);
    },
  });

  if (!editor) return null;

  return (
    <div>
      <ToolBar editor={editor} />
      <EditorContent editor={editor} className="editor-content" />
    </div>
  );
}
