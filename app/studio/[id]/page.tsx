import { notFound } from "next/navigation";
import { getStudioById } from "@/lib/studios";
import { resolveIcon } from "@/lib/icon";
import { GenerationForm } from "@/components/studio/generation-form";
import { LockedStudio } from "@/components/studio/locked-studio";
import { getCurrentSession } from "@/lib/session";

export default async function StudioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const studio = getStudioById(id);
  if (!studio) notFound();

  const session = await getCurrentSession();
  const isMember = session?.isMember ?? false;
  const Icon = resolveIcon(studio.icon);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded border border-surface-border bg-surface text-signal">
          <Icon size={22} />
        </span>
        <div>
          <h1 className="text-2xl font-medium text-ink">{studio.name}</h1>
          <p className="text-sm text-ink-muted">{studio.description}</p>
        </div>
      </div>

      <div className="mt-10">
        {studio.isPremium && !isMember ? (
          <LockedStudio studioName={studio.name} />
        ) : (
          <GenerationForm studio={studio} />
        )}
      </div>
    </div>
  );
}
