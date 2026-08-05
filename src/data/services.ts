import { ServiceModule } from "@/types/pipeline";

export const SERVICES: ServiceModule[] = [
  {
    id: "rel-eng",
    name: "Release Engineering",
    code: "SRE-MOD-01",
    category: "Delivery Pipelines",
    description: "Designing zero-downtime, automated progressive delivery pipelines with automated safety checks and instant rollbacks.",
    metrics: [{ label: "Deployment Frequency", value: "10x/day" }, { label: "Change Fail Rate", value: "< 0.1%" }],
    tags: ["Canary Releases", "Blue-Green", "GitOps", "Policy Enforcers"]
  },
  {
    id: "cicd",
    name: "CI/CD & Pipeline Design",
    code: "SRE-MOD-02",
    category: "Automation",
    description: "Hermetic build pipelines with static code analysis, parallelized testing suites, and dependency caching.",
    metrics: [{ label: "Avg Build Time", value: "1.4 min" }, { label: "Cache Hit Rate", value: "98.5%" }],
    tags: ["GitHub Actions", "ArgoCD", "Tekton", "Dagger"]
  },
  {
    id: "plat-eng",
    name: "Platform Engineering",
    code: "SRE-MOD-03",
    category: "Internal Developer Platforms",
    description: "Self-service developer portals that standardize cloud resource provisioning, guardrails, and environment creation.",
    metrics: [{ label: "Onboarding Time", value: "< 15 mins" }, { label: "Dev Satisfaction", value: "94%" }],
    tags: ["Backstage", "Crossplane", "Terraform", "Custom IDPs"]
  },
  {
    id: "infra-auto",
    name: "Infrastructure Automation",
    code: "SRE-MOD-04",
    category: "Cloud Native",
    description: "Declarative, immutable Infrastructure as Code (IaC) architectures with automated drift detection and remediation.",
    metrics: [{ label: "Drift Remediation", value: "Automated" }, { label: "Provision Speed", value: "3x Faster" }],
    tags: ["Terraform", "OpenTofu", "Pulumi", "Ansible"]
  },
  {
    id: "devsecops",
    name: "DevSecOps & Compliance",
    code: "SRE-MOD-05",
    category: "Security",
    description: "Shifting security left by embedding automated SAST/DAST, software supply chain verification (SBOM), and secrets scanning.",
    metrics: [{ label: "Vulnerability Gate", value: "Zero Critical" }, { label: "Compliance", value: "SOC2 / ISO" }],
    tags: ["Trivy", "Cosign", "Vault", "SonarQube"]
  },
  {
    id: "observability",
    name: "Observability & Incident Engine",
    code: "SRE-MOD-06",
    category: "Operations",
    description: "Full-stack distributed tracing, log aggregation, and metric telemetry paired with AI-driven anomaly detection.",
    metrics: [{ label: "MTTD", value: "< 30 sec" }, { label: "MTTR", value: "< 3 mins" }],
    tags: ["Prometheus", "Grafana", "OpenTelemetry", "Datadog"]
  }
];
