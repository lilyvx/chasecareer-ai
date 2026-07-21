"use client";

import { useRef, useState, useEffect} from "react";
import { ScanLine, FileCheck2 } from "lucide-react";
import DashboardHeader from "@/components/DashboardHeader";
import { useApiHealth } from "../hook/useApiHealth";
import { useDocUpload } from "../hook/useDocUpload";
import { useRouter } from "next/navigation";


export default function DashboardPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const { status, error } = useApiHealth();
  const { uploadDoc, extractedText, error: uploadError, loading } = useDocUpload();
  const router = useRouter();

  return (
  
    <div className="flex min-h-screen flex-1 flex-col bg-white">
      <DashboardHeader />

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          AI-Powered Career Forecaster 
        </div>

        <h1 className="mt-8 max-w-3xl text-5xl font-semibold tracking-tight text-zinc-900 sm:text-6xl">
          Start exploring careers now !
        </h1>
        <p className="mt-2 font-serif text-4xl italic text-zinc-400 sm:text-5xl">
          Find your path in seconds
        </p>

        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-zinc-500">
          Upload your resume to see your available path.{" "}
          <span className="font-semibold text-zinc-700">
            Keep searching.
          </span>
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mt-10 inline-flex h-[52px] items-center gap-2.5 rounded-lg bg-zinc-900 px-7 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-zinc-700"
        >
          <ScanLine className="h-4 w-4" />
          UPLOAD
        </button>

        {fileName && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-zinc-50 px-3.5 py-1.5 text-xs font-medium text-zinc-600">
            <FileCheck2 className="h-3.5 w-3.5 text-emerald-500" />
            {fileName}
          </div>
        )}

        //=========
         {fileName && (
          <button
            type="button"
            onClick={() => {
              if (fileInputRef.current?.files?.[0]) {
                uploadDoc(fileInputRef.current.files[0]);
              }
            }}
            disabled={loading}
            className="mt-4 inline-flex h-[44px] items-center gap-2 rounded-lg bg-emerald-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 disabled:opacity-60"
          >
            {loading ? "Extracting..." : "Confirm & Extract"}
          </button>
        )}

        {uploadError && (
          <p className="mt-4 text-sm text-red-500">{uploadError}</p>
        )}

        {extractedText && (
          <div className="mt-6 max-w-2xl rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-left text-sm text-zinc-700">
            <h3 className="mb-2 font-semibold text-zinc-900">Extracted Text Preview:</h3>
            <p className="whitespace-pre-wrap">{extractedText}</p>

             <button
              type="button"
              onClick={() => router.push("/chaseai")}
              className="mt-4 inline-flex h-[44px] items-center gap-2 rounded-lg bg-zinc-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-zinc-700"
              >
              Looks good, continue to chat →
            </button> 
          </div>
        )}//=========

        <div className="mt-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-zinc-400">
          <span>Free forever</span>
          <span className="text-zinc-300">&middot;</span>
          <span>PDF or DOCX</span>
          <span className="text-zinc-300">&middot;</span>
          <span>Max 5MB</span>
        </div>
      </main>
    </div>
  );
}
