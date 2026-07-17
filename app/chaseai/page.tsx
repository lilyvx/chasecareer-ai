import { Paperclip, ArrowUp, Sparkles } from "lucide-react";
import ChatSidebar from "@/components/chat/ChatSidebar";

const messages = [
  {
    role: "assistant" as const,
    text: "Hi! I'm your ChaseCareer assistant. Upload a resume. What would you like to work on?",
  },
  {
    role: "user" as const,
    text: "Im interested in devops role, do i qualify for it?”",
  },
  {
    role: "assistant" as const,
    text: "Here's a version that leads with impact instead of duties:",
    highlight:
      "Led a team of 5 engineers, shipping 3 major product releases and cutting sprint cycle time by 20%.",
  },
];

export default function ChatbotPage() {
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
              Resume &amp; job-search help, on demand
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
                    {m.highlight && (
                      <p className="max-w-lg rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-[15px] leading-relaxed text-zinc-900">
                        {m.highlight}
                      </p>
                    )}
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
              placeholder="Ask about your resume, a job description, or interview prep..."
              className="max-h-32 flex-1 resize-none bg-transparent py-1.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
            />
            <button
              type="button"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white transition-colors hover:bg-zinc-700"
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
