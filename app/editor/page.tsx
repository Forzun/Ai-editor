"use client";
import AgentResponse from "@/components/AgentResponse";
import TiptapEditor from "@/components/AiTextEditor";
import { Editor } from "@tiptap/react";
import { useState } from "react";

export default function EditorPage() {
  const [editor , setEditor] = useState<Editor>()

  return (
    <div className="w-screen h-screen bg-neutral-950">
      <div className="flex h-full">
        <div className="flex-1 no-scrollbar overflow-y-auto">
          <TiptapEditor  onReady={setEditor} />
        </div>

        <div className="flex-1 flex flex-col">
          {editor && <AgentResponse editor={editor} />}
        </div>
      </div>
    </div>
  );
}
