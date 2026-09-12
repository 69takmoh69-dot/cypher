"use client";

import { useEffect, type ReactNode } from "react";
import { useCypherStore } from "@/lib/store";
import { UnlockModal } from "@/components/studio/unlock-modal";

export function AppProviders({
  initialIsMember,
  children,
}: {
  initialIsMember: boolean;
  children: ReactNode;
}) {
  const setMember = useCypherStore((s) => s.setMember);

  // Seed the client store from the server-verified session on first paint.
  useEffect(() => setMember(initialIsMember), [initialIsMember, setMember]);

  return (
    <>
      {children}
      <UnlockModal />
    </>
  );
}
