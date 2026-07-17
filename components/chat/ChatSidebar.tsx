import Link from "next/link";
import { Plus, MessageSquare, ScanLine, Settings } from "lucide-react";

const history = {
  Today: ["Fixing missing keywords", "Rewriting bullet points"],
  "Previous 7 days": [
    "Software engineer resume review",
    "Cover letter for PM role",
    "Formatting issues on 2-page resume",
  ],
};

export default function ChatSidebar() {
  return (
    <aside className="flex h-full w-[272px] shrink-0 flex-col bg-zinc-950 text-zinc-300">
      <div className="flex items-center gap-2.5 px-4 py-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
          <span className="h-2 w-2 rounded-full bg-zinc-950" />
        </span>
        <span className="text-[15px] font-semibold tracking-tight text-white">
          ChaseCareer<span className="text-zinc-500">.</span>
        </span>
      </div>

      <div className="px-3">
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-lg border border-zinc-800 px-3 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-900"
        >
          <Plus className="h-4 w-4" />
          New chat
        </button>
      </div>

      <nav className="mt-6 flex-1 overflow-y-auto px-3">
        {Object.entries(history).map(([group, items]) => (
          <div key={group} className="mb-5">
            <p className="mb-1.5 px-2 text-[11px] font-medium uppercase tracking-widest text-zinc-600">
              {group}
            </p>
            <ul className="flex flex-col gap-0.5">
              {items.map((item, i) => (
                <li key={item}>
                  <button
                    type="button"
                    className={`flex w-full items-center gap-2.5 truncate rounded-lg px-2.5 py-2 text-left text-sm transition-colors hover:bg-zinc-900 ${
                      group === "Today" && i === 0
                        ? "bg-zinc-900 text-white"
                        : "text-zinc-400"
                    }`}
                  >
                    <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{item}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="flex flex-col gap-1 border-t border-zinc-900 p-3">
        <Link
          href="/chasecareer"
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white"
        >
          <ScanLine className="h-4 w-4" />
          Back to Scanner
        </Link>
        <button
          type="button"
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white"
        >
          <Settings className="h-4 w-4" />
          Settings
        </button>

        <div className="mt-2 flex items-center gap-2.5 rounded-lg px-2.5 py-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xs font-semibold text-white">
            NL
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-zinc-200">
              Natallie Lily
            </p>
            <p className="truncate text-xs text-zinc-500">Free plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
