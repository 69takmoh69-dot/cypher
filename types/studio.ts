import { z } from "zod";

export type StudioFieldType = "text" | "textarea" | "select" | "radio";

export type StudioField = {
  id: string;
  label: string;
  type: StudioFieldType;
  options?: string[];
  placeholder?: string;
  required?: boolean;
  advanced?: boolean;
};

export type StudioCategory = "video" | "image" | "writing" | "marketing" | "audio";

export type Studio = {
  id: string;
  name: string;
  description: string;
  category: StudioCategory;
  icon: string; // lucide-react icon name
  isPremium: boolean;
  fields: StudioField[];
  systemPrompt: string;
};

export const CATEGORY_LABELS: Record<StudioCategory, string> = {
  video: "Video",
  image: "Image / Cartoon",
  writing: "Writing",
  marketing: "Marketing",
  audio: "Audio",
};

// Structured generation output. Every Studio produces this shape so the
// results UI, saved Projects, and history view can stay generic.
export const timelineBeatSchema = z.object({
  time: z.string().describe("Timestamp or range, e.g. '0:00-0:03'"),
  visual: z.string().describe("What's on screen during this beat"),
  narration: z.string().describe("Voiceover, dialogue, or on-screen text for this beat"),
});

export const generationOutputSchema = z.object({
  title: z.string().describe("A short, scroll-stopping title for the piece"),
  hook: z.string().describe("The first line or first 3 seconds — must earn attention immediately"),
  script: z.string().describe("The full script or written body, ready to read or perform"),
  timeline: z
    .array(timelineBeatSchema)
    .describe("A shot-by-shot or beat-by-beat breakdown for production"),
  videoPrompt: z.string().describe("A single dense prompt suitable for a text-to-video model"),
  caption: z.string().describe("A ready-to-post caption for the target platform"),
  hashtags: z.array(z.string()).describe("5-10 relevant hashtags, without the # symbol"),
  tips: z.array(z.string()).describe("2-4 concrete tips for shooting, editing, or posting this"),
});

export type GenerationOutput = z.infer<typeof generationOutputSchema>;

export type Project = {
  id: string;
  studioId: string;
  title: string;
  inputData: Record<string, string>;
  outputData: GenerationOutput;
  createdAt: string;
};
