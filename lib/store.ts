import { create } from "zustand";

type CypherState = {
  isMember: boolean;
  unlockModalOpen: boolean;
  setMember: (value: boolean) => void;
  openUnlockModal: () => void;
  closeUnlockModal: () => void;
};

// Client-side mirror of the server-verified `Session.isMember` flag, set
// once on page load (see AppProviders) and flipped on a successful
// /api/unlock call. The server route is the actual source of truth —
// this store only drives instant UI state, it never gates real access.
export const useCypherStore = create<CypherState>((set) => ({
  isMember: false,
  unlockModalOpen: false,
  setMember: (value) => set({ isMember: value }),
  openUnlockModal: () => set({ unlockModalOpen: true }),
  closeUnlockModal: () => set({ unlockModalOpen: false }),
}));
