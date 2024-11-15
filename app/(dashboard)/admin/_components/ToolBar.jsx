"use client";
import { Toggle } from "@/components/ui/toggle";
import {
  List,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Bold,
  Italic,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  Link,
  Text,
  ListOrdered,
  Type,
} from "lucide-react";
import { useEffect } from "react";

export default function ToolBar({ editor }) {
  useEffect(() => {
    if (!editor) return;

    const handleKeyDown = (event) => {
      if (event.key === " ") {
        // Désactive le surlignage après un espace
        if (editor.isActive("highlight")) {
          editor.chain().focus().unsetHighlight().run(); // Annule le surlignage
        }

        // Vérifie si un lien est actif et désactive son style
        if (editor.isActive("link")) {
          // Désactive le lien après avoir appuyé sur espace
          editor.chain().focus().unsetLink().run(); // Supprime le style du lien
        }
      }
    };

    // Ajouter l'écouteur d'événement
    document.addEventListener("keydown", handleKeyDown);

    // Nettoyage
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [editor]);

  if (!editor) return null;

  const options = [
    {
      icon: <Type />,
      onClick: () => {
        editor
          .chain()
          .focus()
          .unsetAllMarks()
          .unsetLink()
          .clearNodes()
          .setParagraph()
          .run();
      },
      active: editor.isActive("paragraph"),
    },
    {
      icon: <Heading2 />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      active: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Heading4 />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      active: editor.isActive("heading", { level: 4 }),
    },
    {
      icon: <Heading5 />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      active: editor.isActive("heading", { level: 5 }),
    },
    {
      icon: <Heading6 />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
      active: editor.isActive("heading", { level: 6 }),
    },
    {
      icon: <Bold />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
    },
    {
      icon: <Italic />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      active: editor.isActive("strike"),
    },
    {
      icon: <AlignLeft />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      active: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      active: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      active: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
    },
    {
      icon: <Highlighter />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      active: editor.isActive("highlight"),
    },
    {
      icon: <Link />,
      onClick: () => {
        const url = window.prompt("Enter the URL:");
        if (url && url.trim() !== "") {
          editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
        }
      },
      active: editor.isActive("link"),
    },
  ];

  return (
    <div className="border rounded-md p-1.5 mb-1 bg-slate-50 space-x-1">
      {options.map((option, i) => (
        <Toggle
          key={i}
          size="sm"
          pressed={option.active}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
}
