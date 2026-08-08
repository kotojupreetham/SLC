import Link from "next/link";
import { MonoLabel } from "@/components/atoms/MonoLabel";
import { StatusDot } from "@/components/atoms/StatusDot";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#030308] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0f172a] border border-[rgba(255,255,255,0.08)] mb-6">
        <StatusDot status="critical" pulse />
        <MonoLabel className="text-[#ef4444]">404 // NODE NOT FOUND</MonoLabel>
      </div>

      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
        Pipeline Route Error
      </h1>

      <p className="text-[#94a3b8] text-sm sm:text-base max-w-md mb-8 leading-relaxed">
        The requested telemetry path or deployment node does not exist in the active cluster.
      </p>

      <Link
        href="/"
        className="px-6 py-3 rounded-lg bg-[#38bdf8] text-[#030308] font-mono font-bold text-xs tracking-wider uppercase hover:bg-[#38bdf8]/90 transition-colors shadow-[0_0_20px_rgba(56,189,248,0.3)]"
      >
        Return to Master Control
      </Link>
    </main>
  );
}
