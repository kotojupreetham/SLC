import { TechNode } from "@/types/pipeline";

export const TECH_NODES: TechNode[] = [
  { id: "k8s", name: "Kubernetes", category: "Orchestration", pipelineStage: "Release / Deploy", roleDescription: "Automated container scheduling, self-healing, and zero-downtime rolling updates across multi-region clusters." },
  { id: "argocd", name: "ArgoCD", category: "CI/CD", pipelineStage: "Release / Deploy", roleDescription: "GitOps continuous delivery tool ensuring cluster state always matches Git repository specifications." },
  { id: "tf", name: "Terraform", category: "IaC", pipelineStage: "Plan / Code", roleDescription: "Declarative infrastructure management enabling reproducible, version-controlled multi-cloud deployments." },
  { id: "prom", name: "Prometheus", category: "Observability", pipelineStage: "Operate / Monitor", roleDescription: "Time-series telemetry collection for proactive incident detection, alerting, and autoscaling triggers." },
  { id: "gha", name: "GitHub Actions", category: "CI/CD", pipelineStage: "Build / Test", roleDescription: "Automated workflow execution for testing suites, vulnerability scans, artifact builds, and deployment triggers." },
  { id: "vault", name: "HashiCorp Vault", category: "Security", pipelineStage: "Plan / Code", roleDescription: "Dynamic secrets management, PKI certificate automation, and identity-based zero-trust access control." },
  { id: "docker", name: "Docker", category: "Orchestration", pipelineStage: "Build / Test", roleDescription: "Containerization platform creating portable, reproducible runtime environments for consistent deployment artifacts." },
  { id: "grafana", name: "Grafana", category: "Observability", pipelineStage: "Operate / Monitor", roleDescription: "Unified observability dashboards aggregating metrics, logs, and traces for real-time operational intelligence." },
  { id: "otel", name: "OpenTelemetry", category: "Observability", pipelineStage: "Operate / Monitor", roleDescription: "Vendor-neutral instrumentation framework for distributed tracing, metrics collection, and log correlation." }
];
