"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import Markdown from "react-markdown";
import TypingIndicator from "./typing-indicator";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content:
        "Hi! I'm Ayomide's AI assistant. Ask me about his projects, skills, or experience!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. Initialize Chat Session ID
  useEffect(() => {
    let storedId = localStorage.getItem("portfolio_chat_id");
    if (!storedId) {
      storedId = Date.now().toString();
      localStorage.setItem("portfolio_chat_id", storedId);
    }
    setChatId(storedId);
  }, []);

  // 2. Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // 3. Send Message Handler
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          chatId: chatId,
        }),
      });

      const data = await response.json();

      if (data.reply) {
        setMessages((prev) => [...prev, { role: "ai", content: data.reply }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Sorry, something went wrong. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* --- Chat Interface Window --- */}
      {isOpen && (
        <div className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-black border border-cyan-500/30 rounded-lg shadow-2xl flex flex-col overflow-hidden font-sans animate-in fade-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-zinc-900/50 p-4 border-b border-cyan-500/20 flex justify-between items-center backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="text-cyan-400 font-bold tracking-wide text-sm">
                AYOMIDE AI (Available 24/7)
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-cyan-400 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-cyan-500 text-black font-medium rounded-br-none"
                      : "bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-bl-none"
                  }`}
                >
                  <Markdown
                    components={{
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline hover:text-blue-600"
                        />
                      ),
                    }}
                  >
                    {msg.content}
                  </Markdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg rounded-bl-none">
                  {/* <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" /> */}
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-zinc-900/50 border-t border-zinc-800">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about my stack..."
                className="flex-1 bg-black border border-zinc-700 text-zinc-300 text-sm rounded-md px-3 py-2 focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-zinc-600"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 p-2 rounded-md hover:bg-cyan-500 hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Toggle Button --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group p-4 rounded-full shadow-lg transition-all duration-300 border ${
          isOpen
            ? "bg-cyan-500 border-cyan-500 rotate-90"
            : "bg-black border-cyan-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        }`}
      >
        {isOpen ? (
          <X className="text-black w-6 h-6" />
        ) : (
          <MessageCircle className="text-cyan-400 w-6 h-6 group-hover:scale-110 transition-transform" />
        )}
      </button>
    </div>
  );
}
