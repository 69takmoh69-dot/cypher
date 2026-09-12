"use client";

import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCypherStore } from "@/lib/store";

export function LockedStudio({ studioName }: { studioName: string }) {
  const openUnlockModal = useCypherStore((s) => s.openUnlockModal);

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-surface-border bg-surface px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-signal/30 bg-signal-faint text-signal">
        <Lock size={20} />
      </span>
      <div>
        <h2 className="font-medium text-ink">{studioName} is a Premium Studio</h2>
        <p className="mt-1 max-w-sm text-sm text-ink-muted">
          Unlock full membership to generate here, plus every other Premium Studio and Skill.
        </p>
      </div>
      <Button onClick={openUnlockModal}>Enter unlock code</Button>
    </div>
  );
}
