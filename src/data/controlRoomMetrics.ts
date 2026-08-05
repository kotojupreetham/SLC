import { ControlMetric } from "@/types/pipeline";

export const CONTROL_METRICS: ControlMetric[] = [
  { id: "release-status", label: "Release Status", value: "Healthy", status: "healthy" },
  { id: "deploy-queue", label: "Deploy Queue", value: "3 Active", status: "healthy" },
  { id: "incidents", label: "Active Incidents", value: "0", status: "healthy" },
  { id: "success-rate", label: "Success Rate", value: "99.98%", status: "healthy" },
  { id: "latency", label: "Avg Latency", value: "42ms", status: "healthy" },
  { id: "build-duration", label: "Build Duration", value: "2m 14s", status: "healthy", progressPercent: 86 },
  { id: "test-coverage", label: "Test Coverage", value: "94.7%", status: "healthy", progressPercent: 95 },
  { id: "deploy-cadence", label: "Deploy Cadence", value: "12x/day", status: "healthy", progressPercent: 100 },
];
