"use client"

import { Editor } from "@tiptap/react"
import { useState } from "react"

export default function AiButton({ editor }: { editor: Editor }) {
  const [loading, setLoading] = useState(false)
  console.log(editor)

  async function handleAi() {
    if (!editor) return
    setLoading(true)

    // Get selected text (or fallback to full content)
    const selectedText =
      editor.state.doc.textBetween(
        editor.state.selection.from,
        editor.state.selection.to,
        " "
      ) || editor.getText()

    console.log("Selected text:", selectedText)

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: selectedText }),
    })

    const data = await res.json()
    console.log("AI API response:", data)

    if (data.success && data.message) {
      // Insert AI response
      editor.chain().focus().insertContent(data.message).run()
    } else {
      alert("AI request failed: " + (data.message || "Unknown error"))
    }

    setLoading(false)
  }

  return (
    <button
      onClick={handleAi}
      disabled={loading}
      className="px-3 py-1 bg-purple-600 text-white rounded-md"
    >
      {loading ? "Thinking..." : "✨ AI Help"}
    </button>
  )
}
