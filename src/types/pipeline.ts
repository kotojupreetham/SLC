export interface PipelineStage {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: {
    label: string;
    value: string;
  }[];
  pillars?: {
    label: string;
    icon: string;
  }[];
}

export interface ServiceModule {
  id: string;
  name: string;
  code: string;
  category: string;
  description: string;
  metrics: { label: string; value: string }[];
  tags: string[];
}

export interface TechNode {
  id: string;
  name: string;
  category: "Orchestration" | "CI/CD" | "Observability" | "IaC" | "Security";
  pipelineStage: "Plan / Code" | "Build / Test" | "Release / Deploy" | "Operate / Monitor";
  roleDescription: string;
}

export interface CaseStudy {
  id: string;
  clientCategory: string;
  title: string;
  problem: string;
  architectureFix: string;
  businessImpact: string[];
}

export interface ProcessStep {
  step: string;
  name: string;
  desc: string;
}

export interface ControlMetric {
  id: string;
  label: string;
  value: string;
  status: "healthy" | "warning" | "critical";
  progressPercent?: number;
}
