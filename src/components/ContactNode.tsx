"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollReveal } from "./interaction/ScrollReveal";
import { MonoLabel } from "./atoms/MonoLabel";
import { StatusDot } from "./atoms/StatusDot";
import { validateContactSubmission } from "@/lib/contactValidation";
import { Send, CheckCircle2, AlertCircle, Loader2, Terminal } from "lucide-react";
import { useMagneticPointer } from "@/hooks/useMagneticPointer";
import { isReducedMotion } from "@/lib/gsapHelpers";

export function ContactNode() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    details: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const trafficDotsRef = useRef<HTMLDivElement>(null);
  const submitBtnRef = useMagneticPointer<HTMLButtonElement>({ maxDisplacement: 4, strength: 0.2 });

  // FORM-03: GSAP Success sequence (turns lights green, glows border)
  useEffect(() => {
    if (status !== "success" || !cardRef.current || isReducedMotion()) return;

    if (trafficDotsRef.current) {
      const dots = trafficDotsRef.current.querySelectorAll("span");
      gsap.to(dots, {
        backgroundColor: "#22c55e",
        boxShadow: "0 0 12px #22c55e",
        duration: 0.2,
        stagger: 0.1,
      });
    }

    gsap.to(cardRef.current, {
      borderColor: "rgba(34, 197, 94, 0.5)",
      boxShadow: "0 0 35px rgba(34, 197, 94, 0.25)",
      duration: 0.4,
    });
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const validation = validateContactSubmission(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setServerError(data.error || "Submission failed. Please try again.");
        return;
      }

      setStatus("success");
      setFormData({ name: "", email: "", details: "", honeypot: "" });
    } catch {
      setStatus("error");
      setServerError("Network error. Please check your connection and try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto chapter-confidence">
      <ScrollReveal direction="up">
        <div
          ref={cardRef}
          className="bg-gradient-to-br from-[#0f172a]/95 via-[#131b2e]/90 to-[#0f172a]/85 border border-[rgba(129,140,248,0.3)] rounded-3xl overflow-hidden shadow-[0_16px_60px_rgba(0,0,0,0.65),0_0_40px_rgba(129,140,248,0.1),0_0_80px_rgba(168,85,247,0.05)] backdrop-blur-2xl transition-all duration-300 relative"
        >
          {/* Terminal Window Header */}
          <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.08)] bg-[#090d16]/90 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div ref={trafficDotsRef} className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ef4444]/80 shadow-[0_0_8px_rgba(239,68,68,0.5)] transition-colors duration-300" />
                <span className="w-3 h-3 rounded-full bg-[#f59e0b]/80 shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-colors duration-300" />
                <span className="w-3 h-3 rounded-full bg-[#22c55e]/80 shadow-[0_0_8px_rgba(34,197,94,0.5)] transition-colors duration-300" />
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#64748b]" />
                <MonoLabel className="text-[#94a3b8]">sre-initiate-engagement.sh</MonoLabel>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#030712]/60 border border-[rgba(129,140,248,0.2)] shadow-[0_0_10px_rgba(129,140,248,0.1)]">
              <StatusDot status={status === "success" ? "healthy" : "accent"} pulse />
              <MonoLabel className={status === "success" ? "text-[#22c55e]" : "text-[#38bdf8]"}>
                {status === "success" ? "PAYLOAD DISPATCHED" : "SECURE TRANSMISSION"}
              </MonoLabel>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 sm:p-12">
            {status === "success" ? (
              <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/40 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 className="w-8 h-8 text-[#22c55e] animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  TRANSMISSION RECEIVED
                </h3>
                <p className="text-sm text-[#94a3b8] max-w-md mx-auto leading-relaxed">
                  Our release engineering team has received your infrastructure details. An SRE architect will analyze your pipeline requirements and respond within 24 business hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  data-cursor="interactive"
                  className="mt-6 px-6 py-2.5 rounded-xl border border-[rgba(255,255,255,0.15)] text-xs font-mono text-[#94a3b8] hover:text-white hover:border-[#38bdf8] hover:bg-[#38bdf8]/10 transition-all cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Honeypot anti-spam */}
                <input
                  id="website-hp"
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="sr-only"
                  aria-hidden="true"
                />

                {/* Server-side Error Banner */}
                {serverError && (
                  <div
                    role="alert"
                    className="p-4 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/40 flex items-start gap-3 text-xs font-mono animate-in fade-in duration-200"
                  >
                    <AlertCircle className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#f87171] block font-bold">TRANSMISSION FAILED</strong>
                      <span className="text-[#fca5a5]">{serverError}</span>
                    </div>
                  </div>
                )}

                {/* Name field */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono text-[#cbd5e1] mb-2 uppercase tracking-wider"
                  >
                    Lead Engineer / Architect Name <span className="text-[#38bdf8]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    placeholder="e.g. Alex Vance"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    data-cursor="interactive"
                    className={`w-full px-4 py-3 rounded-xl bg-[#090d16] border text-sm text-white font-mono placeholder:text-[#475569] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent focus:shadow-[0_0_20px_rgba(129,140,248,0.18)] ${
                      errors.name
                        ? "border-[#ef4444] bg-[#ef4444]/5"
                        : "border-[rgba(255,255,255,0.08)] hover:border-[#818cf8]/40"
                    }`}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-xs font-mono text-[#f87171]">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Work Email field */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono text-[#cbd5e1] mb-2 uppercase tracking-wider"
                  >
                    Enterprise Work Email <span className="text-[#38bdf8]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    placeholder="alex@enterprise.corp"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    data-cursor="interactive"
                    className={`w-full px-4 py-3 rounded-xl bg-[#090d16] border text-sm text-white font-mono placeholder:text-[#475569] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent focus:shadow-[0_0_20px_rgba(129,140,248,0.18)] ${
                      errors.email
                        ? "border-[#ef4444] bg-[#ef4444]/5"
                        : "border-[rgba(255,255,255,0.08)] hover:border-[#818cf8]/40"
                    }`}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-xs font-mono text-[#f87171]">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Project Details textarea */}
                <div>
                  <label
                    htmlFor="contact-details"
                    className="block text-xs font-mono text-[#cbd5e1] mb-2 uppercase tracking-wider"
                  >
                    Infrastructure & Release Topology Details <span className="text-[#38bdf8]">*</span>
                  </label>
                  <textarea
                    id="contact-details"
                    name="details"
                    rows={4}
                    required
                    maxLength={2000}
                    placeholder="Describe your current CI/CD bottlenecks, Kubernetes setup, SLO targets, or release frequency goals..."
                    value={formData.details}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.details)}
                    aria-describedby={errors.details ? "details-error" : undefined}
                    data-cursor="interactive"
                    className={`w-full px-4 py-3 rounded-xl bg-[#090d16] border text-sm text-white font-mono placeholder:text-[#475569] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#818cf8] focus:border-transparent focus:shadow-[0_0_20px_rgba(129,140,248,0.18)] resize-y ${
                      errors.details
                        ? "border-[#ef4444] bg-[#ef4444]/5"
                        : "border-[rgba(255,255,255,0.08)] hover:border-[#818cf8]/40"
                    }`}
                  />
                  {errors.details && (
                    <p id="details-error" className="mt-1.5 text-xs font-mono text-[#f87171]">
                      {errors.details}
                    </p>
                  )}
                </div>

                {/* Submit button (FORM-02) */}
                <button
                  ref={submitBtnRef}
                  type="submit"
                  disabled={status === "submitting"}
                  data-cursor="cta"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#818cf8] text-[#090d16] font-mono font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-95 hover:scale-[1.01] active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(56,189,248,0.4),0_0_35px_rgba(129,140,248,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16] cursor-pointer disabled:opacity-50 group"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>DISPATCHING TELEMETRY ENVELOPE...</span>
                    </>
                  ) : (
                    <>
                      <span>TRANSMIT PIPELINE SPECIFICATION</span>
                      <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
