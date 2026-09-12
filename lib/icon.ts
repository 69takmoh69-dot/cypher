import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function resolveIcon(name: string): LucideIcon {
  const icon = (Icons as unknown as Record<string, LucideIcon>)[name];
  return icon ?? Icons.Sparkles;
}
