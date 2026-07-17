"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const navItems = [
  { label: "Scanner", href: "/chasecareer" },
  { label: "Chatbot", href: "/chaseai" },
];

export default function DashboardHeader() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between border-b border-zinc-100 px-6 py-4 sm:px-10">
      <Logo />
      <nav className="flex items-center gap-8">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                active ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
