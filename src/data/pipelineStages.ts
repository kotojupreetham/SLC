import { PipelineStage } from "@/types/pipeline";

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "plan",
    badge: "01 // ARCHITECTURE",
    title: "Plan & Strategy",
    subtitle: "Mapping System Topologies",
    description: "Defining deployment targets, security constraints, and failure modes before code creation.",
    metrics: [
      { label: "Target Availability", value: "99.99%" },
      { label: "RTO / RPO", value: "< 5 mins" }
    ]
  },
  {
    id: "code",
    badge: "02 // DEVELOPMENT",
    title: "Versioned Codebase",
    subtitle: "Immutable Feature Branches",
    description: "Enforcing static analysis, automated linting, and peer reviews on every merge request.",
    metrics: [
      { label: "Branch Coverage", value: "> 92%" },
      { label: "Static Checks", value: "Strict" }
    ]
  },
  {
    id: "build",
    badge: "03 // COMPILATION",
    title: "Deterministic Builds",
    subtitle: "Containerized Artifacts",
    description: "Creating hermetic, reproducible runtime environments with cryptographic integrity.",
    metrics: [
      { label: "Build Time", value: "1.2 mins" },
      { label: "Image Size", value: "42MB" }
    ]
  },
  {
    id: "test",
    badge: "04 // VERIFICATION",
    title: "Automated QA & Security",
    subtitle: "Shift-Left Testing",
    description: "Executing integration suites, dynamic vulnerability scans, and performance stress runs.",
    metrics: [
      { label: "Security Gate", value: "Zero High/Critical" },
      { label: "Test Suite", value: "1,420 Passed" }
    ]
  },
  {
    id: "release",
    badge: "05 // GOVERNANCE",
    title: "Release Staging",
    subtitle: "Approval Policy Engine",
    description: "Automated canary promotion and security sign-offs before live traffic routing.",
    metrics: [
      { label: "Policy Checks", value: "Passed" },
      { label: "Sign-off", value: "Automated" }
    ]
  },
  {
    id: "deploy",
    badge: "06 // EXECUTION",
    title: "Zero-Downtime Deployment",
    subtitle: "Progressive Traffic Shifting",
    description: "Executing Blue-Green / Canary rollouts with real-time automated rollback safety.",
    metrics: [
      { label: "Downtime", value: "0.00ms" },
      { label: "Rollback Time", value: "< 2 secs" }
    ]
  },
  {
    id: "operate",
    badge: "07 // INFRASTRUCTURE",
    title: "Platform Operation",
    subtitle: "Self-Healing Clusters",
    description: "Managing auto-scaling groups, mesh routing, and automated infrastructure drift correction.",
    metrics: [
      { label: "Cluster Nodes", value: "256 Active" },
      { label: "Auto-Scale Latency", value: "< 15 secs" }
    ]
  },
  {
    id: "monitor",
    badge: "08 // OBSERVABILITY",
    title: "Telemetry & Feedback",
    subtitle: "Continuous Improvement Loop",
    description: "Aggregating distributed tracing, log metrics, and anomaly detection to inform future builds.",
    metrics: [
      { label: "Telemetry Ingestion", value: "4.2 GB/sec" },
      { label: "MTTD / MTTR", value: "< 1 min" }
    ]
  }
];
