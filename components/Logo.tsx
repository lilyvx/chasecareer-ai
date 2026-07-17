import Link from "next/link";

export default function Logo({ href = "/chasecareer" }: { href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2.5 group">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 transition-colors group-hover:bg-zinc-700">
        <span className="h-2 w-2 rounded-full bg-white" />
      </span>
      <span className="text-[17px] font-semibold tracking-tight text-zinc-900">
        ChaseCareer<span className="text-zinc-400">.</span>
      </span>
    </Link>
  );
}
