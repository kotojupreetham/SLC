import {
  Rocket,
  Workflow,
  Boxes,
  Layers,
  ShieldCheck,
  Activity,
  LucideIcon,
} from "lucide-react";

export const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  "rel-eng": Rocket,
  cicd: Workflow,
  "plat-eng": Boxes,
  "infra-auto": Layers,
  devsecops: ShieldCheck,
  observability: Activity,
};

export function getServiceIcon(id: string): LucideIcon {
  return SERVICE_ICON_MAP[id] || Activity;
}
