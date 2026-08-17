import { PipelineStage } from "@/types/pipeline";

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "plan",
    badge: "01 // ARCHITECTURE",
    title: "Plan",
    subtitle: "Mapping System Topologies",
    description: "Define goals, strategies and roadmap for successful and reliable releases.",
    metrics: [
      { label: "Target Availability", value: "99.99%" },
      { label: "RTO / RPO", value: "< 5 mins" }
    ],
    pillars: [
      { label: "Define Strategy", icon: "target" },
      { label: "Set Clear Goals", icon: "clipboard" },
      { label: "Align Teams", icon: "users" },
      { label: "Plan for Success", icon: "trending-up" }
    ]
  },
  {
    id: "code",
    badge: "02 // DEVELOPMENT",
    title: "Code",
    subtitle: "Immutable Feature Branches",
    description: "Enforcing static analysis, automated linting, and peer reviews on every merge request.",
    metrics: [
      { label: "Branch Coverage", value: "> 92%" },
      { label: "Static Checks", value: "Strict" }
    ],
    pillars: [
      { label: "Feature Branches", icon: "git-branch" },
      { label: "Strict Linting", icon: "file-check" },
      { label: "Security Scans", icon: "shield" },
      { label: "Peer Reviews", icon: "users" }
    ]
  },
  {
    id: "build",
    badge: "03 // COMPILATION",
    title: "Build",
    subtitle: "Containerized Artifacts",
    description: "Creating hermetic, reproducible runtime environments with cryptographic integrity.",
    metrics: [
      { label: "Build Time", value: "1.2 mins" },
      { label: "Image Size", value: "42MB" }
    ],
    pillars: [
      { label: "Hermetic Builds", icon: "box" },
      { label: "Fast Compiles", icon: "zap" },
      { label: "Image Signing", icon: "lock" },
      { label: "Layer Caching", icon: "layers" }
    ]
  },
  {
    id: "test",
    badge: "04 // VERIFICATION",
    title: "Test",
    subtitle: "Shift-Left Testing",
    description: "Executing integration suites, dynamic vulnerability scans, and performance stress runs.",
    metrics: [
      { label: "Security Gate", value: "Zero High/Critical" },
      { label: "Test Suite", value: "1,420 Passed" }
    ],
    pillars: [
      { label: "Automated QA", icon: "check-circle" },
      { label: "SAST & DAST", icon: "shield" },
      { label: "Stress Testing", icon: "activity" },
      { label: "Quality Gates", icon: "sliders" }
    ]
  },
  {
    id: "release",
    badge: "05 // GOVERNANCE",
    title: "Release",
    subtitle: "Approval Policy Engine",
    description: "Automated canary promotion and security sign-offs before live traffic routing.",
    metrics: [
      { label: "Policy Checks", value: "Passed" },
      { label: "Sign-off", value: "Automated" }
    ],
    pillars: [
      { label: "Canary Rules", icon: "sliders" },
      { label: "Policy Engine", icon: "file-check" },
      { label: "Auto Sign-Off", icon: "check-circle" },
      { label: "Traffic Shift", icon: "git-branch" }
    ]
  },
  {
    id: "deploy",
    badge: "06 // EXECUTION",
    title: "Deploy",
    subtitle: "Progressive Traffic Shifting",
    description: "Executing Blue-Green / Canary rollouts with real-time automated rollback safety.",
    metrics: [
      { label: "Downtime", value: "0.00ms" },
      { label: "Rollback Time", value: "< 2 secs" }
    ],
    pillars: [
      { label: "Zero Downtime", icon: "zap" },
      { label: "Fast Rollback", icon: "rotate-ccw" },
      { label: "Multi-Region", icon: "globe" },
      { label: "Blue-Green Safe", icon: "layers" }
    ]
  },
  {
    id: "operate",
    badge: "07 // INFRASTRUCTURE",
    title: "Operate",
    subtitle: "Self-Healing Clusters",
    description: "Managing auto-scaling groups, mesh routing, and automated infrastructure drift correction.",
    metrics: [
      { label: "Cluster Nodes", value: "256 Active" },
      { label: "Auto-Scale Latency", value: "< 15 secs" }
    ],
    pillars: [
      { label: "Self-Healing", icon: "refresh-cw" },
      { label: "Auto-Scaling", icon: "trending-up" },
      { label: "Drift Correct", icon: "sliders" },
      { label: "Mesh Routing", icon: "network" }
    ]
  },
  {
    id: "monitor",
    badge: "08 // OBSERVABILITY",
    title: "Monitor",
    subtitle: "Continuous Improvement Loop",
    description: "Aggregating distributed tracing, log metrics, and anomaly detection to inform future builds.",
    metrics: [
      { label: "Telemetry Ingestion", value: "4.2 GB/sec" },
      { label: "MTTD / MTTR", value: "< 1 min" }
    ],
    pillars: [
      { label: "Distributed Trace", icon: "activity" },
      { label: "Anomaly Detect", icon: "eye" },
      { label: "MTTD < 1 Min", icon: "zap" },
      { label: "Live Telemetry", icon: "trending-up" }
    ]
  }
];
