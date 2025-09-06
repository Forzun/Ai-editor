"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { Editor } from "@tiptap/react";

interface Response {
  role: string;
  content: string;
  status?: "pending" | "accepted" | "rejected";
}

export default function AgentResponse({ editor }: { editor: Editor }) {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<Response[]>([
    {
      role: "assistant",
      content: "Hello, how can I help you today?",
      status: "pending",
    },
  ]);

  const handleResponse = async (e: React.MouseEvent) => {
    e.preventDefault();
    setResponse((prev) => [
      ...prev,
      { role: "user", content: question, status: "pending" },
    ]);
    const response = await axios.post("/api/ai", {text: question} , {
        headers: { "Content-Type": "application/json" }
    });

    setResponse((prev) => [
      ...prev,
      { role: "assistant", content: response.data.message, status: "pending" },
    ]);
    setQuestion("");
  };

  const handleReject = (index: number) => {
    setResponse((prev) => prev.map((item, id) => 
        id === index ? { ...item, status: "rejected" } : item
    ));
    editor.commands.insertContent(response[index].content);
  };

  const handleAccept = (index: number) => {
    const item = response[index]; // capture before state update
  
    // Update status
    setResponse((prev) =>
      prev.map((msg, id) =>
        id === index ? { ...msg, status: "accepted" } : msg
      )
    );
  
    // Insert into Tiptap
    if (editor && item?.content) {
      editor.commands.insertContent(item.content);
    }
  };

  console.log(editor);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 no-scrollbar overflow-y-auto p-4">
        {response.map((item, index) => (
          <div
            key={index}
            className={`flex gap-4 my-2 overflow-y-hidden ${
              item.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <h1
              className={`py-3 px-4 rounded-lg max-w-[70%] ${
                item.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-white"
              }`}
            >
              {item.content}
              {item.status === "pending" && item.role === "assistant" && (
                <div className="flex gap-2 items-start">
                  <Button
                    onClick={() => handleAccept(index)}
                    size="sm"
                    className="bg-green-600/60 "
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => handleReject(index)}
                    size="sm"
                    className="bg-red-600/60 "
                  >
                    Reject
                  </Button>
                </div>
              )}
            </h1>
          </div>
        ))}
      </div>
      <form action="submit" className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Enter your question here"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full h-full p-4 text-white bg-gray-800 rounded-lg focus:outline-none"
        />
        <Button
          onClick={handleResponse}
          className="cursor-pointer bg-purple-500"
        >
          ✨ AI Help
        </Button>
      </form>
    </div>
  );
}
