"use client";
import React from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Type,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";
import AiButton from "./custom/button";
import { Markdown } from "tiptap-markdown";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b border-gray-700 p-2 flex flex-wrap gap-1 bg-gray-800">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-700 disabled:opacity-50 text-gray-300 ${
          editor.isActive("bold") ? "bg-gray-600" : ""
        }`}
      >
        <Bold size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-700 disabled:opacity-50 text-gray-300 ${
          editor.isActive("italic") ? "bg-gray-600" : ""
        }`}
      >
        <Italic size={16} />
      </button>

      <div className="w-px bg-gray-600 mx-1"></div>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded hover:bg-gray-700 text-gray-300 ${
          editor.isActive("heading", { level: 1 }) ? "bg-gray-600" : ""
        }`}
      >
        <Heading1 size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-gray-700 text-gray-300 ${
          editor.isActive("heading", { level: 2 }) ? "bg-gray-600" : ""
        }`}
      >
        <Heading2 size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-2 rounded hover:bg-gray-700 text-gray-300 ${
          editor.isActive("heading", { level: 3 }) ? "bg-gray-600" : ""
        }`}
      >
        <Heading3 size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`p-2 rounded hover:bg-gray-700 text-gray-300 ${
          editor.isActive("paragraph") ? "bg-gray-600" : ""
        }`}
      >
        <Type size={16} />
      </button>

      <div className="w-px bg-gray-600 mx-1"></div>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-700 text-gray-300 ${
          editor.isActive("bulletList") ? "bg-gray-600" : ""
        }`}
      >
        <List size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-700 text-gray-300 ${
          editor.isActive("orderedList") ? "bg-gray-600" : ""
        }`}
      >
        <ListOrdered size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded hover:bg-gray-700 text-gray-300 ${
          editor.isActive("blockquote") ? "bg-gray-600" : ""
        }`}
      >
        <Quote size={16} />
      </button>

      <div className="w-px bg-gray-600 mx-1"></div>

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="p-2 rounded hover:bg-gray-700 disabled:opacity-50 text-gray-300"
      >
        <Undo size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="p-2 rounded hover:bg-gray-700 disabled:opacity-50 text-gray-300"
      >
        <Redo size={16} />
      </button>
    </div>
  );
};

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown.configure({
        html: true, // allow HTML inside markdown
      }),
    ],
    immediatelyRender: false,
    content: ``,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4 text-white",
      },
    },
  });

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">
          Rich Text Editor
        </h2>
      </div>

      <MenuBar editor={editor} />

      <div className="min-h-[400px] bg-gray-900">
        {editor && <EditorContent editor={editor} className="tiptap-editor" />}

        {editor && <AiButton editor={editor} />}
      </div>

      <style jsx>{`
        .tiptap-editor .ProseMirror {
          outline: none;
          padding: 1rem;
          min-height: 300px;
        }

        .tiptap-editor .ProseMirror h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
          line-height: 1.2;
        }

        .tiptap-editor .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
          line-height: 1.3;
        }

        .tiptap-editor .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
          line-height: 1.4;
        }

        .tiptap-editor .ProseMirror p {
          margin: 0.5rem 0;
          line-height: 1.6;
        }

        .tiptap-editor .ProseMirror ul,
        .tiptap-editor .ProseMirror ol {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
        }

        .tiptap-editor .ProseMirror li {
          margin: 0.25rem 0;
        }

        .tiptap-editor .ProseMirror blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #6b7280;
        }

        .tiptap-editor .ProseMirror strong {
          font-weight: bold;
        }

        .tiptap-editor .ProseMirror em {
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default TiptapEditor;
