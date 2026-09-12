import { ExternalLink, Wand2 } from "lucide-react";

const TOOLS = [
  {
    name: "Google Flow",
    description: "Text-to-video generation for turning a Cypher videoPrompt into a rendered clip.",
    href: "https://labs.google/flow",
  },
  {
    name: "ElevenLabs",
    description: "Turn a Studio script into a voiceover with a cloned or stock voice.",
    href: "https://elevenlabs.io",
  },
  {
    name: "CapCut",
    description: "Assemble generated shots, captions, and voiceover into a final export.",
    href: "https://www.capcut.com",
  },
];

export default function ToolsFlowPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex items-center gap-2">
        <Wand2 className="text-signal" size={20} />
        <h1 className="text-3xl font-medium text-ink">Tools</h1>
      </div>
      <p className="mt-2 text-ink-muted">
        External production tools that pair well with Cypher's output. Generate here, produce there.
      </p>

      <div className="mt-10 flex flex-col gap-3">
        {TOOLS.map((tool) => (
          <a
            key={tool.name}
            href={tool.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-lg border border-surface-border bg-surface p-5 transition-colors hover:border-signal/40"
          >
            <div>
              <p className="font-medium text-ink">{tool.name}</p>
              <p className="mt-1 text-sm text-ink-muted">{tool.description}</p>
            </div>
            <ExternalLink className="shrink-0 text-ink-faint" size={16} />
          </a>
        ))}
      </div>
    </div>
  );
}
