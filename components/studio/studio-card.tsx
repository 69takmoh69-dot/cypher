import Link from "next/link";
import { Lock } from "lucide-react";
import type { Studio } from "@/types/studio";
import { resolveIcon } from "@/lib/icon";
import { Badge } from "@/components/ui/badge";

export function StudioCard({ studio }: { studio: Studio }) {
  const Icon = resolveIcon(studio.icon);

  return (
    <Link
      href={`/studio/${studio.id}`}
      className="group relative flex flex-col gap-3 rounded-lg border border-surface-border bg-surface p-5 transition-all hover:border-signal/40 hover:shadow-glow-sm"
    >
      <div className="flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded border border-surface-border bg-surface-raised text-signal">
          <Icon size={18} />
        </span>
        {studio.isPremium && (
          <Badge className="border-signal/30 text-signal">
            <Lock size={10} className="mr-1" /> Premium
          </Badge>
        )}
      </div>
      <div>
        <h3 className="font-medium text-ink">{studio.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted">{studio.description}</p>
      </div>
    </Link>
  );
}
