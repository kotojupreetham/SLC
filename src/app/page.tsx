import { InteractivePipeline } from "@/components/InteractivePipeline";
import { EngineeringDashboard } from "@/components/EngineeringDashboard";
import { TechEcosystem } from "@/components/TechEcosystem";
import { DeploymentStories } from "@/components/DeploymentStories";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ControlRoom } from "@/components/ControlRoom";
import { ContactNode } from "@/components/ContactNode";
import { SITE_CONTENT } from "@/data/siteContent";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030308] text-white">
      {/* 5-Phase Scrollytelling DevOps Experience (Hero -> Zoom -> Arc Scrub -> Move Out) */}
      <InteractivePipeline />

      {/* Services Console — Trust */}
      <div id="services">
        <EngineeringDashboard />
      </div>

      {/* Technology Matrix — Confidence */}
      <TechEcosystem />

      {/* Case Studies — Proof */}
      <DeploymentStories />

      {/* Process — Clarity */}
      <ProcessTimeline />

      {/* Control Room — Telemetry Dashboard */}
      <ControlRoom />

      {/* Contact Terminal */}
      <ContactNode />

      {/* Footer */}
      <footer className="py-8 text-center border-t border-[rgba(255,255,255,0.08)] bg-[#030308]">
        <p className="text-xs font-mono text-[#475569] tracking-wider">
          © {new Date().getFullYear()} {SITE_CONTENT.footer.copyright}
        </p>
      </footer>
    </main>
  );
}
