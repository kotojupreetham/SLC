import { ProcessStep } from "@/types/pipeline";

export const PROCESS_STEPS: ProcessStep[] = [
  { step: "01", name: "Discovery", desc: "Audit existing pipelines, identify failure points, and measure deployment metrics against industry benchmarks." },
  { step: "02", name: "Architecture", desc: "Design target infrastructure, security guardrails, and automated pipeline topologies with defined SLOs." },
  { step: "03", name: "Automation", desc: "Build hermetic CI/CD pipelines, containerize runtimes, and write declarative infrastructure specifications." },
  { step: "04", name: "Deployment", desc: "Execute progressive rollouts with automated canary testing, telemetry validation, and instant rollback safety nets." },
  { step: "05", name: "Optimization", desc: "Tune build caching, resource utilization, autoscaling rules, and end-to-end observability instrumentation." },
  { step: "06", name: "Continuous Improvement", desc: "Ongoing telemetry analysis, incident post-mortems, and iterative pipeline refinements driven by production data." }
];
