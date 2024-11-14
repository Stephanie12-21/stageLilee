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
        openOnClick: true, // Permet d'ouvrir le lien dans un nouvel onglet
        linkOnPaste: true, // Transforme automatiquement les URL collées en liens
        autolink: true, // Transforme automatiquement les URLs en liens
        HTMLAttributes: {
          target: "_blank", // Ouvre le lien dans un nouvel onglet
          rel: "noopener noreferrer", // Sécurise le lien
        },
        renderHTML({ node }) {
          return [
            "a",
            {
              href: node.attrs.href, // Lien URL
              target: node.attrs.target, // Ouvrir dans un nouvel onglet
              rel: node.attrs.rel, // Sécurité
              class: "text-blue-500 underline hover:text-blue-700", // Style bleu et souligné
            },
            node.children, // Contenu du lien
          ];
        },
      }),
    ],
    content, // Initialisation avec le contenu passé en prop
    editorProps: {
      attributes: {
        class:
          "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3 focus:outline-none", // Style de l'éditeur
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML(); // Récupère le HTML mis à jour
      console.log("Editor content updated:", html);
      onChange(html); // Appelle la fonction onChange pour notifier le parent
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
