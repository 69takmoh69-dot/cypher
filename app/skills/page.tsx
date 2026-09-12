"use client";

import { useMemo, useState } from "react";
import { Copy, Check, Lock } from "lucide-react";
import { skills, skillCategories } from "@/lib/skills";
import { useCypherStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function SkillsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const isMember = useCypherStore((s) => s.isMember);
  const openUnlockModal = useCypherStore((s) => s.openUnlockModal);

  const filtered = useMemo(() => {
    return skills
      .filter((s) => category === "All" || s.category === category)
      .filter((s) => query.trim().length === 0 || s.name.toLowerCase().includes(query.trim().toLowerCase()))
      .slice(0, 60); // render window — the library is large, this keeps the DOM light
  }, [query, category]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-medium text-ink">AI Skills Library</h1>
      <p className="mt-2 text-ink-muted">{skills.length.toLocaleString()} reusable prompts. Search, filter, copy.</p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-9 rounded border border-surface-border bg-surface px-3 text-sm text-ink outline-none focus:border-signal/60"
        >
          {skillCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search skills..."
          className="h-9 w-full rounded border border-surface-border bg-surface px-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-signal/60 sm:w-64"
        />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
        {filtered.map((skill) => (
          <SkillCard key={skill.id} skill={skill} unlocked={isMember || !skill.isPremium} onLockedClick={openUnlockModal} />
        ))}
      </div>
    </div>
  );
}

function SkillCard({
  skill,
  unlocked,
  onLockedClick,
}: {
  skill: (typeof skills)[number];
  unlocked: boolean;
  onLockedClick: () => void;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (!unlocked) {
      onLockedClick();
      return;
    }
    await navigator.clipboard.writeText(skill.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="rounded-lg border border-surface-border bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-mono uppercase tracking-wide text-ink-faint">{skill.category}</p>
          <h3 className="mt-1 font-medium text-ink">{skill.name}</h3>
        </div>
        <button
          onClick={copy}
          className={cn(
            "flex shrink-0 items-center gap-1 rounded-sm border px-2 py-1 text-xs transition-colors",
            unlocked
              ? "border-surface-border text-ink-muted hover:border-signal/50 hover:text-signal"
              : "border-signal/30 text-signal",
          )}
        >
          {!unlocked ? <Lock size={12} /> : copied ? <Check size={12} /> : <Copy size={12} />}
          {!unlocked ? "Unlock" : copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className={cn("mt-3 text-sm leading-relaxed text-ink-muted", !unlocked && "blur-[3px] select-none")}>
        {skill.prompt}
      </p>
    </div>
  );
}
