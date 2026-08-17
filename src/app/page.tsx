import React from "react";
import { Header } from "@/components/Header";
import { InteractivePipeline } from "@/components/InteractivePipeline";
import { EngineeringDashboard } from "@/components/EngineeringDashboard";
import { TechEcosystem } from "@/components/TechEcosystem";
import { DeploymentStories } from "@/components/DeploymentStories";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ControlRoom } from "@/components/ControlRoom";
import { ContactNode } from "@/components/ContactNode";
import { SITE_CONTENT } from "@/data/siteContent";
import { StatusDot } from "@/components/atoms/StatusDot";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-[#030712] text-white selection:bg-[#38bdf8] selection:text-[#030712]">
      {/* Sticky Header Navbar */}
      <Header />

      {/* Hero + Interactive Rotating Pipeline Dial */}
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

      {/* Process — Methodology */}
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
      <footer className="py-12 border-t border-[rgba(255,255,255,0.08)] bg-[#030712]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#818cf8] flex items-center justify-center font-mono font-black text-[10px] text-[#030712] shadow-[0_0_12px_rgba(56,189,248,0.4)]">
              SRE
            </div>
            <span className="text-xs font-mono font-bold text-[#94a3b8] tracking-wider">
              SMARTER RELEASE ENGINEERING
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#64748b]">
            <StatusDot status="healthy" pulse size="sm" />
            <span>SYS STATUS: 100% OPERATIONAL</span>
          </div>

          <p className="text-xs font-mono text-[#475569] tracking-wider">
            © {new Date().getFullYear()} {SITE_CONTENT.footer.copyright}
          </p>
        </div>
      </footer>
    </main>
  );
}
