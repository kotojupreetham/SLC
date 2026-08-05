import { PROCESS_STEPS } from "@/data/processSteps";
import { SectionHeader } from "./atoms/SectionHeader";

export function ProcessTimeline() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-[rgba(255,255,255,0.08)]">
      <SectionHeader
        label="ENGINEERING METHODOLOGY // PROCESS"
        title="How We Build Reliability"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROCESS_STEPS.map((s) => (
          <div
            key={s.step}
            className="p-6 rounded-xl bg-[#0f172a] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(56,189,248,0.3)] transition-colors group"
          >
            <span className="text-3xl font-mono font-bold text-[#38bdf8] block mb-3 group-hover:text-[#818cf8] transition-colors">
              {s.step}
            </span>
            <h3 className="text-lg font-bold text-white mb-2">{s.name}</h3>
            <p className="text-xs text-[#94a3b8] leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
