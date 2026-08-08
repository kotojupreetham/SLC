import { Header } from "@/components/Header";
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
    <main className="min-h-screen bg-[#030712] text-white">
      {/* Sticky Header Navbar */}
      <Header />

      {/* Hero + Optional Pipeline Rotation Experience */}
      <InteractivePipeline />

      {/* Services Console — Trust */}
      <div id="services">
        <EngineeringDashboard />
      </div>

      {/* Technology Matrix — Confidence */}
      <div id="matrix">
        <TechEcosystem />
      </div>

      {/* Case Studies — Proof */}
      <div id="stories">
        <DeploymentStories />
      </div>

      {/* Process — Clarity */}
      <ProcessTimeline />

      {/* Control Room — Telemetry Dashboard */}
      <div id="telemetry">
        <ControlRoom />
      </div>

      {/* Contact Terminal */}
      <div id="contact">
        <ContactNode />
      </div>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-[rgba(255,255,255,0.08)] bg-[#030712]">
        <p className="text-xs font-mono text-[#475569] tracking-wider">
          © {new Date().getFullYear()} {SITE_CONTENT.footer.copyright}
        </p>
      </footer>
    </main>
  );
}
