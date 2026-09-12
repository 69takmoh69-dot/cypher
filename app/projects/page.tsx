"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FolderOpen } from "lucide-react";
import { getStudioById } from "@/lib/studios";
import type { Project } from "@/types/studio";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => setProjects(data.projects ?? []))
      .catch(() => setProjects([]));
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-medium text-ink">Projects</h1>
      <p className="mt-2 text-ink-muted">Everything you've generated in this session.</p>

      <div className="mt-10">
        {projects === null && <p className="text-ink-faint">Loading...</p>}

        {projects?.length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-surface-border bg-surface px-6 py-16 text-center">
            <FolderOpen className="text-ink-faint" size={28} />
            <p className="text-ink-muted">Nothing here yet.</p>
            <Link href="/studio" className="text-sm text-signal hover:underline">
              Open a Studio to generate your first project
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {projects?.map((project) => {
            const studio = getStudioById(project.studioId);
            return (
              <Link
                key={project.id}
                href={`/studio/${project.studioId}`}
                className="flex items-center justify-between rounded-lg border border-surface-border bg-surface p-4 transition-colors hover:border-signal/40"
              >
                <div>
                  <p className="font-medium text-ink">{project.title}</p>
                  <p className="text-xs text-ink-faint">{studio?.name ?? project.studioId}</p>
                </div>
                <span className="text-xs text-ink-faint">
                  {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
