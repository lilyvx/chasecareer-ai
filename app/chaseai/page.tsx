"use client";

import { useState } from "react";
import { Paperclip, ArrowUp, Sparkles } from "lucide-react";
import ChatSidebar from "@/components/chat/ChatSidebar";
import { useRouter } from "next/navigation";
import { useLatestDocument } from "@/app/hook/useLatestDocument";

type Message = {
  role: "assistant" | "user";
  text: string;
};

export default function ChatbotPage() {
  const { extractedText, error: documentError, loading: documentLoading } = useLatestDocument();
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi! I'm your ChaseCareer assistant. What would you like to work on?",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSending(true);

    //placeholder until the real chat endpoint created
  
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "(This is a placeholder response — the real analysis endpoint isn't wired up yet.)" },
      ]);
      setSending(false);
    }, 800);
  }

  //still check whether the user has a resume on file
  if (documentLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <p className="text-sm text-zinc-400">Loading your data...</p>
      </div>
    );
  }

  //no resume uploaded yet
  if (documentError) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-white text-center">
        <p className="text-lg font-semibold text-zinc-900">No resume on file yet</p>
        <p className="max-w-sm text-sm text-zinc-500">
          Upload your resume first so the ChaseAI can give you personalized guidance.
        </p>
        <button
          type="button"
          onClick={() => router.push("/chasecareer")}
          className="mt-2 inline-flex h-[44px] items-center gap-2 rounded-lg bg-zinc-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
        >
          Go to Scanner
        </button>
      </div>
    );
  }

  //resume loaded, ready to chat
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <ChatSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-zinc-100 px-8 py-4">
          <div>
            <p className="text-sm font-semibold text-zinc-900">
              ChaseCareer Assistant
            </p>
            <p className="text-xs text-zinc-400">
              Career seach on demand
            </p>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-8 py-10">
          <div className="mx-auto flex max-w-2xl flex-col gap-6">
            {messages.map((m, i) =>
              m.role === "assistant" ? (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-900">
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                  </span>
                  <div className="flex flex-col gap-3">
                    <p className="max-w-lg text-[15px] leading-relaxed text-zinc-700">
                      {m.text}
                    </p>
                  </div>
                </div>
              ) : (
                <div key={i} className="flex justify-end">
                  <p className="max-w-lg rounded-2xl rounded-tr-sm bg-zinc-900 px-4 py-3 text-[15px] leading-relaxed text-white">
                    {m.text}
                  </p>
                </div>
              )
            )}
            {sending && (
              <p className="text-sm text-zinc-400">Assistant is typing...</p>
            )}
          </div>
        </main>

        <div className="border-t border-zinc-100 bg-white px-8 py-5">
          <div className="mx-auto flex max-w-2xl items-end gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 focus-within:border-zinc-400">
            <button
              type="button"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-200 hover:text-zinc-600"
              aria-label="Attach resume"
            >
              <Paperclip className="h-4 w-4" />
            </button>
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask about your resume, a job description, or interview prep..."
              className="max-h-32 flex-1 resize-none bg-transparent py-1.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={sending}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white transition-colors hover:bg-zinc-700 disabled:opacity-50"
              aria-label="Send message"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}