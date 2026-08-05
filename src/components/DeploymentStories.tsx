import { CASE_STUDIES } from "@/data/caseStudies";
import { SectionHeader } from "./atoms/SectionHeader";
import { MonoLabel } from "./atoms/MonoLabel";

export function DeploymentStories() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-[rgba(255,255,255,0.08)]">
      <SectionHeader
        label="PROVEN OUTCOMES // CASE STUDIES"
        title="Deployment Stories"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CASE_STUDIES.map((story) => (
          <article
            key={story.id}
            className="bg-[#0f172a] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 flex flex-col justify-between hover:border-[rgba(56,189,248,0.3)] transition-colors"
          >
            <div>
              <MonoLabel className="text-[#38bdf8] mb-2 block">{story.clientCategory}</MonoLabel>
              <h3 className="text-xl font-bold text-white mb-6 tracking-tight">{story.title}</h3>

              <div className="space-y-4 mb-8">
                <div>
                  <MonoLabel className="text-[#ef4444] block mb-1">[ CHALLENGE ]</MonoLabel>
                  <p className="text-sm text-[#94a3b8] leading-relaxed">{story.problem}</p>
                </div>
                <div>
                  <MonoLabel className="text-[#38bdf8] block mb-1">[ ARCHITECTURAL SOLUTION ]</MonoLabel>
                  <p className="text-sm text-[#cbd5e1] leading-relaxed">{story.architectureFix}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[rgba(255,255,255,0.08)]">
              <MonoLabel className="text-[#22c55e] block mb-3">[ BUSINESS IMPACT ]</MonoLabel>
              <ul className="space-y-2">
                {story.businessImpact.map((impact, idx) => (
                  <li key={idx} className="text-xs font-mono text-[#cbd5e1] flex items-start gap-2">
                    <span className="text-[#22c55e] mt-0.5">✓</span>
                    {impact}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
