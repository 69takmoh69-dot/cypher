"use client";

import { useMemo, useState } from "react";
import { studios } from "@/lib/studios";
import { CATEGORY_LABELS, type StudioCategory } from "@/types/studio";
import { StudioCard } from "@/components/studio/studio-card";
import { cn } from "@/lib/utils";

const CATEGORIES: Array<StudioCategory | "all"> = ["all", "video", "image", "writing", "marketing", "audio"];

export default function StudioListPage() {
  const [category, setCategory] = useState<StudioCategory | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return studios.filter((s) => {
      const matchesCategory = category === "all" || s.category === category;
      const matchesQuery =
        query.trim().length === 0 || s.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-medium text-ink">Studios</h1>
      <p className="mt-2 text-ink-muted">Pick a workflow. Fill the brief. Get a production-ready package.</p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-sm border px-3 py-1.5 text-sm transition-colors",
                category === c
                  ? "border-signal/50 bg-signal-faint text-signal"
                  : "border-surface-border text-ink-muted hover:text-ink",
              )}
            >
              {c === "all" ? "All" : CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search studios..."
          className="h-9 w-full rounded border border-surface-border bg-surface px-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-signal/60 sm:w-64"
        />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((studio) => (
          <StudioCard key={studio.id} studio={studio} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-16 text-center text-ink-faint">
            Nothing matches that search. Try a different term or category.
          </p>
        )}
      </div>
    </div>
  );
}
