"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { MonoLabel } from "./atoms/MonoLabel";
import { StatusDot } from "./atoms/StatusDot";
import { ScrollReveal } from "./interaction/ScrollReveal";
import { useMagneticPointer } from "@/hooks/useMagneticPointer";
import { validateContactSubmission, ValidationResult } from "@/lib/contactValidation";
import { isReducedMotion } from "@/lib/gsapHelpers";
import { AlertCircle, CheckCircle2, Loader2, Send, Terminal } from "lucide-react";

export function ContactNode() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const trafficDotsRef = useRef<HTMLDivElement>(null);
  const submitBtnRef = useMagneticPointer<HTMLButtonElement>({ maxDisplacement: 4, strength: 0.2 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectDetails: "",
    honeypot: "",
  });

  const [fieldErrors, setFieldErrors] = useState<ValidationResult["errors"]>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Client-side pre-validation
    const validation = validateContactSubmission(formData);
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.errors) {
          setFieldErrors(data.errors);
        }
        setServerError(data.message || "Transmission failed. Please check inputs and retry.");
        setIsSubmitting(false);
        return;
      }

      // FORM-03: Success sequence
      if (!isReducedMotion() && trafficDotsRef.current && cardRef.current) {
        const dots = trafficDotsRef.current.querySelectorAll("span");
        gsap.to(dots, {
          backgroundColor: "#22c55e",
          boxShadow: "0 0 12px #22c55e",
          duration: 0.2,
          stagger: 0.1,
        });

        gsap.to(cardRef.current, {
          borderColor: "rgba(34, 197, 94, 0.5)",
          boxShadow: "0 0 35px rgba(34, 197, 94, 0.25)",
          duration: 0.4,
        });
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setServerError("Network error encountered. Your input has been preserved—please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto border-t border-[rgba(255,255,255,0.08)] chapter-confidence">
      <ScrollReveal
        direction="up"
        className="bg-[#0f172a] border border-[rgba(56,189,248,0.3)] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl transition-all duration-300"
        as="div"
      >
        <div ref={cardRef}>
          {/* Terminal chrome header */}
          <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.08)] mb-8">
            <div className="flex items-center gap-3">
              <div ref={trafficDotsRef} className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ef4444]/80 shadow-[0_0_8px_rgba(239,68,68,0.5)] transition-colors duration-300" />
                <span className="w-3 h-3 rounded-full bg-[#f59e0b]/80 shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-colors duration-300" />
                <span className="w-3 h-3 rounded-full bg-[#22c55e]/80 shadow-[0_0_8px_rgba(34,197,94,0.5)] transition-colors duration-300" />
              </div>
              <div className="flex items-center gap-1.5 text-[#64748b]">
                <Terminal className="w-3.5 h-3.5" />
                <MonoLabel className="text-[#94a3b8]">sre-initiate-engagement.sh</MonoLabel>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#030712]/60 border border-[rgba(255,255,255,0.08)]">
              <StatusDot status={submitted ? "healthy" : "accent"} pulse />
              <MonoLabel className={submitted ? "text-[#22c55e]" : "text-[#38bdf8]"}>
                {submitted ? "PAYLOAD DISPATCHED" : "SECURE TRANSMISSION"}
              </MonoLabel>
            </div>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Honeypot field (hidden from real users) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website-hp">Leave this empty</label>
                <input
                  id="website-hp"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                />
              </div>

              {/* Server Error Banner */}
              {serverError && (
                <div
                  role="alert"
                  className="flex items-start gap-3 p-4 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/40 text-[#fca5a5] text-xs font-mono animate-in fade-in duration-200"
                >
                  <AlertCircle className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#f87171]">TRANSMISSION ERROR</p>
                    <p>{serverError}</p>
                  </div>
                </div>
              )}

              {/* Input: Name (FORM-01) */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-mono text-[#cbd5e1] uppercase mb-2 tracking-wider"
                >
                  Engineer / Organization Name <span className="text-[#38bdf8]">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  disabled={isSubmitting}
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: undefined });
                  }}
                  placeholder="e.g., Jane Doe, VP of Engineering"
                  className={`w-full bg-[#090d16] border rounded-xl p-3.5 text-sm text-white font-mono placeholder:text-[#475569] transition-all duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:border-transparent ${
                    fieldErrors.name
                      ? "border-[#ef4444] bg-[#ef4444]/5"
                      : "border-[rgba(255,255,255,0.08)] hover:border-[#38bdf8]/35 focus:shadow-[0_0_20px_rgba(56,189,248,0.15)]"
                  }`}
                />
                {fieldErrors.name && (
                  <p className="mt-1.5 text-xs font-mono text-[#f87171] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              {/* Input: Email (FORM-01) */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono text-[#cbd5e1] uppercase mb-2 tracking-wider"
                >
                  Work Email Address <span className="text-[#38bdf8]">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  disabled={isSubmitting}
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
                  }}
                  placeholder="jane@company.com"
                  className={`w-full bg-[#090d16] border rounded-xl p-3.5 text-sm text-white font-mono placeholder:text-[#475569] transition-all duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:border-transparent ${
                    fieldErrors.email
                      ? "border-[#ef4444] bg-[#ef4444]/5"
                      : "border-[rgba(255,255,255,0.08)] hover:border-[#38bdf8]/35 focus:shadow-[0_0_20px_rgba(56,189,248,0.15)]"
                  }`}
                />
                {fieldErrors.email && (
                  <p className="mt-1.5 text-xs font-mono text-[#f87171] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Input: Details (FORM-01) */}
              <div>
                <label
                  htmlFor="contact-details"
                  className="block text-xs font-mono text-[#cbd5e1] uppercase mb-2 tracking-wider"
                >
                  System Infrastructure & Objectives <span className="text-[#38bdf8]">*</span>
                </label>
                <textarea
                  id="contact-details"
                  rows={4}
                  required
                  disabled={isSubmitting}
                  value={formData.projectDetails}
                  onChange={(e) => {
                    setFormData({ ...formData, projectDetails: e.target.value });
                    if (fieldErrors.projectDetails)
                      setFieldErrors({ ...fieldErrors, projectDetails: undefined });
                  }}
                  placeholder="Describe deployment bottlenecks, target uptime goals, or cloud migration parameters..."
                  className={`w-full bg-[#090d16] border rounded-xl p-3.5 text-sm text-white font-mono placeholder:text-[#475569] transition-all duration-200 resize-none disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:border-transparent ${
                    fieldErrors.projectDetails
                      ? "border-[#ef4444] bg-[#ef4444]/5"
                      : "border-[rgba(255,255,255,0.08)] hover:border-[#38bdf8]/35 focus:shadow-[0_0_20px_rgba(56,189,248,0.15)]"
                  }`}
                />
                {fieldErrors.projectDetails && (
                  <p className="mt-1.5 text-xs font-mono text-[#f87171] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.projectDetails}
                  </p>
                )}
              </div>

              {/* Submit Button (FORM-02) */}
              <button
                ref={submitBtnRef}
                type="submit"
                disabled={isSubmitting}
                data-cursor="cta"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#38bdf8] via-[#60a5fa] to-[#818cf8] text-[#090d16] font-mono font-bold text-sm tracking-wider uppercase hover:opacity-95 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 shadow-[0_0_25px_rgba(56,189,248,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090d16] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#090d16]" />
                    <span>TRANSMITTING PAYLOAD...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#090d16] transition-transform duration-200 group-hover:translate-x-1" />
                    <span>EXECUTE PIPELINE INITIATION</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="py-16 text-center font-mono space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <CheckCircle2 className="w-14 h-14 text-[#22c55e] mx-auto animate-pulse" />
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                TRANSMISSION RECEIVED
              </h3>
              <p className="text-[#94a3b8] text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Your engineering specifications have been successfully validated and logged. An SRE technical architect will evaluate your requirements and connect via email.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", projectDetails: "", honeypot: "" });
                }}
                data-cursor="interactive"
                className="mt-4 px-6 py-2.5 rounded-xl border border-[rgba(255,255,255,0.15)] text-xs text-[#94a3b8] hover:text-white hover:border-[#38bdf8] hover:bg-[#38bdf8]/10 transition-all cursor-pointer"
              >
                Submit Another Inquiry
              </button>
            </div>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}
