"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { KeyRound, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCypherStore } from "@/lib/store";

export function UnlockButton() {
  const { isMember, openUnlockModal } = useCypherStore();

  if (isMember) {
    return (
      <span className="flex items-center gap-1.5 rounded-sm border border-signal/30 bg-signal-faint px-3 py-1.5 text-xs font-medium text-signal">
        <KeyRound size={12} /> Member
      </span>
    );
  }

  return (
    <Button size="sm" variant="outline" onClick={openUnlockModal}>
      <KeyRound size={14} /> Unlock
    </Button>
  );
}

export function UnlockModal() {
  const { unlockModalOpen, closeUnlockModal, setMember } = useCypherStore();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.message ?? "Something went wrong.");
        return;
      }
      setMember(true);
      closeUnlockModal();
      setCode("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog.Root open={unlockModalOpen} onOpenChange={(open) => !open && closeUnlockModal()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border border-surface-border bg-surface-raised p-6 shadow-glow">
          <Dialog.Title className="font-mono text-lg text-ink">Enter the Code</Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-ink-muted">
            Unlock full access to every Studio, Skill, and export.
          </Dialog.Description>

          <div className="mt-5">
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="CYPHER-XXXXXXXX"
              className="font-mono uppercase tracking-wider"
              onKeyDown={(e) => e.key === "Enter" && submit()}
              autoFocus
            />
            {error && <p className="mt-2 text-xs text-signal">{error}</p>}
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="ghost" size="md" onClick={closeUnlockModal}>
              Cancel
            </Button>
            <Button size="md" onClick={submit} disabled={loading || code.length === 0}>
              {loading ? <Loader2 className="animate-spin" size={16} /> : null}
              Unlock
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
