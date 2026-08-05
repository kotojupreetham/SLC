"use client";

import React, { useState } from "react";
import { MonoLabel } from "./atoms/MonoLabel";
import { StatusDot } from "./atoms/StatusDot";

export function ContactNode() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectDetails: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;
    setSubmitted(true);
  };

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto border-t border-[rgba(255,255,255,0.08)]">
      <div className="bg-[#0f172a] border border-[rgba(56,189,248,0.3)] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Terminal chrome header */}
        <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.08)] mb-8">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ef4444]/80" />
              <span className="w-3 h-3 rounded-full bg-[#f59e0b]/80" />
              <span className="w-3 h-3 rounded-full bg-[#22c55e]/80" />
            </div>
            <MonoLabel className="text-[#64748b]">
              sre-initiate-engagement.sh
            </MonoLabel>
          </div>
          <div className="flex items-center gap-2">
            <StatusDot status="accent" />
            <MonoLabel className="text-[#38bdf8]">SECURE TRANSMISSION</MonoLabel>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-xs font-mono text-[#94a3b8] uppercase mb-2 tracking-wider"
              >
                Engineer / Organization Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Jane Doe, VP of Engineering"
                className="w-full bg-[#090d16] border border-[rgba(255,255,255,0.08)] rounded-lg p-3 text-sm text-white font-mono placeholder:text-[#334155] focus:outline-none focus:border-[#38bdf8] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block text-xs font-mono text-[#94a3b8] uppercase mb-2 tracking-wider"
              >
                Work Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="jane@company.com"
                className="w-full bg-[#090d16] border border-[rgba(255,255,255,0.08)] rounded-lg p-3 text-sm text-white font-mono placeholder:text-[#334155] focus:outline-none focus:border-[#38bdf8] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="contact-details"
                className="block text-xs font-mono text-[#94a3b8] uppercase mb-2 tracking-wider"
              >
                System Infrastructure & Objectives
              </label>
              <textarea
                id="contact-details"
                rows={4}
                required
                value={formData.projectDetails}
                onChange={(e) =>
                  setFormData({ ...formData, projectDetails: e.target.value })
                }
                placeholder="Describe deployment bottlenecks, target uptime goals, or cloud migration parameters..."
                className="w-full bg-[#090d16] border border-[rgba(255,255,255,0.08)] rounded-lg p-3 text-sm text-white font-mono placeholder:text-[#334155] focus:outline-none focus:border-[#38bdf8] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-[#38bdf8] text-[#090d16] font-mono font-bold text-sm tracking-wider uppercase hover:bg-[#38bdf8]/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16]"
            >
              EXECUTE PIPELINE INITIATION
            </button>
          </form>
        ) : (
          <div className="py-16 text-center font-mono space-y-4">
            <span className="text-[#22c55e] text-4xl block">✓</span>
            <h3 className="text-xl font-bold text-white">
              TRANSMISSION RECEIVED
            </h3>
            <p className="text-[#94a3b8] text-xs max-w-md mx-auto leading-relaxed">
              Pipeline payload dispatched. An SRE technical architect will
              evaluate your specifications and connect within 24 hours.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
