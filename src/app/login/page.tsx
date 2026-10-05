import { Suspense } from "react";
import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#2997FF]/[0.08] blur-[120px] rounded-full pointer-events-none" />

      {/* Top Bar */}
      <header className="relative z-10 flex items-center justify-between max-w-7xl w-full mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#86868B] hover:text-foreground transition-colors py-2 px-3 rounded-lg hover:bg-white/[0.04]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Landing</span>
        </Link>

        <Link
          href="/cloud"
          className="text-xs text-[#86868B] hover:text-[#2997FF] transition-colors"
        >
          Explore Cloud Fleet →
        </Link>
      </header>

      {/* Centered Form */}
      <main className="relative z-10 flex-1 flex items-center justify-center my-12">
        <Suspense fallback={<div className="text-center text-xs text-[#86868B]">Loading console...</div>}>
          <AuthForm />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-[11px] text-[#86868B] py-4">
        © 2026 OpenSuperIntelligence. An Arcane Echos Technologies SAS product. All rights reserved.
      </footer>
    </div>
  );
}
