"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import AiButton from "./button";

export default function Eitdor() {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    content: "<p>Write something…</p>",
  });

  return (
    <div>
      {editor && <AiButton editor={editor} />}
      {editor && <EditorContent editor={editor} />}
    </div>
  );
}
