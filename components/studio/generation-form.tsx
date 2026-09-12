"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Loader2, Sparkles, Copy, Check } from "lucide-react";
import type { Studio, GenerationOutput } from "@/types/studio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const LOADING_MESSAGES = [
  "Compiling brief...",
  "Decrypting narrative structure...",
  "Rendering hook variations...",
  "Aligning shot timeline...",
  "Finalizing output...",
];

export function GenerationForm({ studio }: { studio: Studio }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<GenerationOutput | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);

  const basicFields = studio.fields.filter((f) => !f.advanced);
  const advancedFields = studio.fields.filter((f) => f.advanced);

  useEffect(() => {
    if (status !== "loading") return;
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % LOADING_MESSAGES.length;
      setLoadingMessage(LOADING_MESSAGES[i] ?? LOADING_MESSAGES[0]!);
    }, 1400);
    return () => clearInterval(interval);
  }, [status]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studioId: studio.id, values }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Generation failed.");
        return;
      }
      setResult(data.project.outputData);
      setStatus("idle");
    } catch {
      setStatus("error");
      setErrorMessage("Network error — check your connection and try again.");
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {basicFields.map((field) => (
          <FieldInput key={field.id} field={field} value={values[field.id] ?? ""} onChange={(v) => setValues((s) => ({ ...s, [field.id]: v }))} />
        ))}

        {advancedFields.length > 0 && (
          <div>
            <button
              type="button"
              onClick={() => setShowAdvanced((v) => !v)}
              className="text-sm text-ink-muted hover:text-signal"
            >
              {showAdvanced ? "Hide" : "Show"} advanced options
            </button>
            {showAdvanced && (
              <div className="mt-4 flex flex-col gap-5 border-l border-surface-border pl-4">
                {advancedFields.map((field) => (
                  <FieldInput key={field.id} field={field} value={values[field.id] ?? ""} onChange={(v) => setValues((s) => ({ ...s, [field.id]: v }))} />
                ))}
              </div>
            )}
          </div>
        )}

        <Button type="submit" size="lg" disabled={status === "loading"} className="mt-2 w-fit">
          {status === "loading" ? (
            <>
              <Loader2 size={16} className="animate-spin" /> {loadingMessage}
            </>
          ) : (
            <>
              <Sparkles size={16} /> Generate
            </>
          )}
        </Button>

        {status === "error" && errorMessage && (
          <p className="text-sm text-signal">{errorMessage}</p>
        )}
      </form>

      {status === "loading" && <ResultsSkeleton />}
      {result && <ResultsView result={result} />}
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Studio["fields"][number];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <Label htmlFor={field.id}>
        {field.label}
        {field.required && <span className="ml-1 text-signal">*</span>}
      </Label>
      {field.type === "textarea" && (
        <Textarea id={field.id} placeholder={field.placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
      {field.type === "text" && (
        <Input id={field.id} placeholder={field.placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
      {field.type === "select" && (
        <select
          id={field.id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full rounded border border-surface-border bg-surface px-3 text-sm text-ink outline-none focus:border-signal/60"
        >
          <option value="">Choose...</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}
      {field.type === "radio" && (
        <div className="flex flex-wrap gap-2">
          {field.options?.map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => onChange(opt)}
              className={cn(
                "rounded-sm border px-3 py-1.5 text-sm transition-colors",
                value === opt
                  ? "border-signal/50 bg-signal-faint text-signal"
                  : "border-surface-border text-ink-muted hover:text-ink",
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div className="animate-pulse space-y-4 rounded-lg border border-surface-border bg-surface p-6">
      <div className="h-5 w-1/3 rounded bg-surface-raised" />
      <div className="h-3 w-full rounded bg-surface-raised" />
      <div className="h-3 w-5/6 rounded bg-surface-raised" />
      <div className="h-24 w-full rounded bg-surface-raised" />
    </div>
  );
}

function ResultsView({ result }: { result: GenerationOutput }) {
  return (
    <div className="animate-fade-in flex flex-col gap-6 rounded-lg border border-surface-border bg-surface p-6">
      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-signal">Output</p>
        <h2 className="mt-1 text-xl font-medium text-ink">{result.title}</h2>
      </div>

      <CopyBlock label="Hook" content={result.hook} />
      <CopyBlock label="Script" content={result.script} multiline />

      <div>
        <p className="mb-2 text-sm font-medium text-ink-muted">Timeline</p>
        <div className="flex flex-col divide-y divide-surface-border rounded border border-surface-border">
          {result.timeline.map((beat, i) => (
            <div key={i} className="grid grid-cols-[64px_1fr] gap-4 p-3 text-sm">
              <span className="font-mono text-signal">{beat.time}</span>
              <div>
                <p className="text-ink">{beat.visual}</p>
                <p className="mt-1 text-ink-faint">{beat.narration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CopyBlock label="Video Prompt" content={result.videoPrompt} multiline />
      <CopyBlock label="Caption" content={result.caption} />

      <div>
        <p className="mb-2 text-sm font-medium text-ink-muted">Hashtags</p>
        <div className="flex flex-wrap gap-2">
          {result.hashtags.map((tag) => (
            <span key={tag} className="rounded-sm bg-surface-raised px-2 py-1 font-mono text-xs text-ink-muted">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-ink-muted">Tips</p>
        <ul className="list-inside list-disc space-y-1 text-sm text-ink-muted">
          {result.tips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CopyBlock({ label, content, multiline }: { label: string; content: string; multiline?: boolean }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  async function copy() {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium text-ink-muted">{label}</p>
        <button onClick={copy} className="flex items-center gap-1 text-xs text-ink-faint hover:text-signal">
          {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className={cn("rounded border border-surface-border bg-surface-raised p-3 text-sm text-ink", multiline && "whitespace-pre-wrap leading-relaxed")}>
        {content}
      </p>
    </div>
  );
}
