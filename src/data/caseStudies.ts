import { CaseStudy } from "@/types/pipeline";

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "fintech-scale",
    clientCategory: "Global Fintech Platform",
    title: "Scaling Deployment Pipeline for 200+ Microservices",
    problem: "Manual release gates and brittle Jenkins pipelines resulted in 4-hour deployment windows and high failure rates during peak load.",
    architectureFix: "Transitioned to GitOps with ArgoCD, implemented automated canary deployment strategies with dynamic rollback policies triggered by Prometheus telemetry.",
    businessImpact: [
      "Deployment time reduced from 240 mins to 4.5 mins",
      "Zero downtime across 12,000 daily API releases",
      "99.995% service availability maintained during peak market hours"
    ]
  },
  {
    id: "health-cloud",
    clientCategory: "Enterprise Healthcare Platform",
    title: "Zero-Trust DevSecOps Architecture & Compliance Automation",
    problem: "Complex compliance demands (HIPAA/SOC2) stalled release velocities, creating 3-week security audit backlogs.",
    architectureFix: "Embedded automated static scanning, container signing with Cosign, and HashiCorp Vault secrets management directly into GitHub Actions execution gates.",
    businessImpact: [
      "Security audit backlog eliminated entirely",
      "100% automated compliance reporting generation",
      "Zero security vulnerabilities introduced into production over 12 months"
    ]
  }
];
