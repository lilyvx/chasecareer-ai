"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hook/useAuth";

type AuthMode = "login" | "register";

const copy = {
  login: {
    heading: "Welcome back",
    subheading: "Log in to.......",
    submitLabel: "Log in",
    toggleLead: "Don't have an account?",
    toggleLinkLabel: "Register",
    toggleHref: "/register",
  },
  register: {
    heading: "Create your account",
    subheading: "Start figuring your wau.",
    submitLabel: "Create account",
    toggleLead: "Already have an account?",
    toggleLinkLabel: "Log in",
    toggleHref: "/login",
  },
} as const;

export default function AuthForm({ mode }: { mode: AuthMode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { register, login, error, loading } = useAuth();
  const router = useRouter();
  const c = copy[mode];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (mode === "register" && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const success =
    mode === "login"
        ? await login(username, password)
        : await register(username, email, password);

    if (success) router.push("/chasecareer");
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* left: form panel */}
      <div className="flex w-full flex-col justify-between px-6 py-8 sm:px-12 lg:w-[46%] lg:px-16 xl:px-20">
        <Logo href="/login" />

        <div className="mx-auto w-full max-w-sm">
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            {mode === "login" ? "Sign in" : "Get started"}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
            {c.heading}
          </h1>
          <p className="mt-2 text-[15px] text-zinc-500">{c.subheading}</p>

          <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
            <Field label="Username">
              <input
                type="text"
                placeholder="janedoe"
                className="auth-input"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Field>

            {mode === "register" && (
              <Field label="Email">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="auth-input"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
            )}

            <Field
              label="Password"
              trailing={
                mode === "login" && (
                  <Link
                    href="#"
                    className="text-xs font-medium text-zinc-500 hover:text-zinc-900"
                  >
                    Forgot password?
                  </Link>
                )
              }
            >
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="auth-input pr-10"
                  autoComplete={
                    mode === "login" ? "current-password" : "new-password"
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </Field>

            {mode === "register" && (
              <Field label="Confirm password">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  className="auth-input"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Field>
            )}

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex h-11 w-full items-center justify-center rounded-lg bg-zinc-900 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:opacity-60"
            >
              {loading ? "Please wait..." : c.submitLabel}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            {c.toggleLead}{" "}
            <Link
              href={c.toggleHref}
              className="font-semibold text-zinc-900 hover:underline"
            >
              {c.toggleLinkLabel}
            </Link>
          </p>
        </div>

        <p className="text-xs text-zinc-400">
          &copy; {new Date().getFullYear()} ChaseCareer. All rights reserved.
        </p>
      </div>

      {/* right: visual panel */}
      <div className="relative hidden overflow-hidden lg:block lg:w-[54%]">
        <div className="absolute inset-3 overflow-hidden rounded-3xl">
          <AuthVisual />

          <div className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3.5 py-1.5 text-xs font-medium text-zinc-700 backdrop-blur-sm">
            Get to know us
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>

          <div className="absolute inset-x-0 bottom-0 p-10">
            <h2 className="max-w-md text-3xl font-medium leading-tight text-zinc-900">
              Stop wasting {" "}
              <span className="font-serif italic">time</span> figuring what you're capable of.
            </h2>
            <p className="mt-4 max-w-sm border-l-2 border-zinc-900/20 pl-4 text-sm leading-relaxed text-zinc-600">
              ChaseCareer helps you etctctc so
              you can find what&apos;s holding you back.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  trailing,
  children,
}: {
  label: string;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-600">{label}</span>
        {trailing}
      </span>
      {children}
    </label>
  );
}

function AuthVisual() {
  return (
    <div className="absolute inset-0 bg-[#e9e7e2]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 15%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 60%), radial-gradient(55% 45% at 85% 30%, rgba(210,206,196,0.9) 0%, rgba(210,206,196,0) 65%), radial-gradient(70% 60% at 30% 90%, rgba(180,177,168,0.85) 0%, rgba(180,177,168,0) 60%), radial-gradient(50% 40% at 90% 85%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-70 mix-blend-overlay"
        style={{
          background:
            "conic-gradient(from 200deg at 50% 40%, #f5f4f0, #cfccc3, #e9e7e2, #b8b4a9, #f5f4f0)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />
    </div>
  );
}