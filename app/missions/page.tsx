"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { missions } from "@/lib/missions";
import { cn } from "@/lib/utils";

type ProgressMap = Record<string, { currentStep: number; completed: boolean }>;

export default function MissionsPage() {
  const [progress, setProgress] = useState<ProgressMap>({});

  useEffect(() => {
    fetch("/api/missions")
      .then((r) => r.json())
      .then((data) => {
        const map: ProgressMap = {};
        for (const p of data.progress ?? []) {
          map[p.missionId] = { currentStep: p.currentStep, completed: p.completed };
        }
        setProgress(map);
      })
      .catch(() => {});
  }, []);

  async function advance(missionId: string, totalSteps: number) {
    const current = progress[missionId]?.currentStep ?? 0;
    const next = Math.min(current + 1, totalSteps);
    const completed = next >= totalSteps;
    setProgress((p) => ({ ...p, [missionId]: { currentStep: next, completed } }));
    await fetch("/api/missions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ missionId, currentStep: next, completed }),
    });
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-medium text-ink">Missions</h1>
      <p className="mt-2 text-ink-muted">Guided paths for getting the most out of Cypher.</p>

      <div className="mt-10 flex flex-col gap-6">
        {missions.map((mission) => {
          const state = progress[mission.id] ?? { currentStep: 0, completed: false };
          return (
            <div key={mission.id} className="rounded-lg border border-surface-border bg-surface p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-medium text-ink">{mission.name}</h2>
                  <p className="mt-1 text-sm text-ink-muted">{mission.description}</p>
                </div>
                {state.completed && (
                  <span className="flex items-center gap-1 rounded-sm border border-signal/30 bg-signal-faint px-2 py-1 text-xs text-signal">
                    <Check size={12} /> Done
                  </span>
                )}
              </div>

              <div className="mt-5 flex flex-col gap-3">
                {mission.steps.map((step, i) => {
                  const isDone = i < state.currentStep;
                  const isCurrent = i === state.currentStep;
                  return (
                    <div key={step.title} className="flex items-start gap-3">
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs",
                          isDone ? "border-signal bg-signal text-white" : "border-surface-border text-ink-faint",
                        )}
                      >
                        {isDone ? <Check size={12} /> : i + 1}
                      </span>
                      <div className="flex-1">
                        <p className={cn("text-sm", isDone ? "text-ink-faint line-through" : "text-ink")}>{step.title}</p>
                        <p className="text-xs text-ink-faint">{step.description}</p>
                      </div>
                      {isCurrent && !state.completed && (
                        <button
                          onClick={() => advance(mission.id, mission.steps.length)}
                          className="shrink-0 rounded-sm border border-signal/40 px-2 py-1 text-xs text-signal hover:bg-signal-faint"
                        >
                          Mark done
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
