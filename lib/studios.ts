import type { Studio } from "@/types/studio";

// Each systemPrompt is written to force structured, production-ready output
// that matches `generationOutputSchema` — no filler, no meta-commentary.
export const studios: Studio[] = [
  {
    id: "short-horror-story",
    name: "Short Horror Story",
    description: "Dread-building micro-horror scripts built for a single unbroken take.",
    category: "writing",
    icon: "Skull",
    isPremium: false,
    fields: [
      { id: "premise", label: "Premise", type: "textarea", placeholder: "A babysitter finds a second baby monitor she never set up...", required: true },
      { id: "setting", label: "Setting", type: "text", placeholder: "Suburban house, 2 a.m.", required: true },
      { id: "length", label: "Length", type: "select", options: ["30s", "60s", "90s"], required: true },
      { id: "tone", label: "Tone", type: "radio", options: ["Quiet dread", "Jump-scare", "Cosmic horror"], advanced: true },
    ],
    systemPrompt: `You are a horror screenwriter who specializes in short-form vertical video (TikTok/Reels/Shorts). Write a self-contained horror story that builds dread through implication and pacing, not gore. Use the second-person or close-first-person voice a faceless narrator would read aloud. Every beat in the timeline must escalate tension. The hook must plant a question the viewer needs answered before they can scroll away. End on a twist or unresolved image, never a moral. Keep language plain and visual — this will be read aloud over stock or AI-generated b-roll.`,
  },
  {
    id: "faceless-content",
    name: "Faceless Content",
    description: "Voiceover-driven narrative or list content with zero on-camera talent.",
    category: "video",
    icon: "UserRoundX",
    isPremium: false,
    fields: [
      { id: "topic", label: "Topic", type: "textarea", placeholder: "5 psychology facts that explain why people procrastinate", required: true },
      { id: "format", label: "Format", type: "select", options: ["Listicle", "Story", "Explainer", "Reaction/commentary"], required: true },
      { id: "platform", label: "Platform", type: "select", options: ["TikTok", "YouTube Shorts", "Instagram Reels"], required: true },
    ],
    systemPrompt: `You are a faceless-channel content strategist. Write a script designed to be read by a voice clone or TTS engine over stock footage, screen recordings, or AI b-roll — there is no host on camera, so every line must carry its own visual instruction in the timeline. Front-load the single most surprising fact or claim in the hook. Write in short, punchy sentences suited to burned-in captions. Avoid any stage direction that assumes a human presenter.`,
  },
  {
    id: "product-showcase-video",
    name: "Product Showcase Video",
    description: "Conversion-focused product demos for TikTok Shop, Shopee, and Lazada.",
    category: "marketing",
    icon: "PackageSearch",
    isPremium: false,
    fields: [
      { id: "product", label: "Product name", type: "text", placeholder: "Collagen coffee sachets", required: true },
      { id: "keyBenefit", label: "Key benefit", type: "text", placeholder: "No bitter aftertaste, dissolves instantly", required: true },
      { id: "price", label: "Price / offer", type: "text", placeholder: "฿299 for 10 sachets, free shipping" },
      { id: "audience", label: "Target audience", type: "text", placeholder: "Women 25-40 who drink coffee daily" },
    ],
    systemPrompt: `You are a direct-response video producer for social commerce (TikTok Shop, Shopee Live, Lazada). Structure the script around: stop-scroll hook → problem → product as the solution → proof/demo beat → price reveal → clear call to action. The videoPrompt must describe a clean product-first shot list a phone camera or AI video tool can execute. The caption and hashtags must be optimized for the stated platform's algorithm and include a purchase-intent phrase. Never claim medical or unverifiable results.`,
  },
  {
    id: "ai-cartoon",
    name: "AI Cartoon",
    description: "Character-driven cartoon shorts with locked visual style across scenes.",
    category: "image",
    icon: "Sparkles",
    isPremium: true,
    fields: [
      { id: "characters", label: "Characters", type: "textarea", placeholder: "A grumpy cat detective and his anxious pigeon sidekick", required: true },
      { id: "plot", label: "Plot", type: "textarea", placeholder: "They investigate who stole the neighborhood's fish", required: true },
      { id: "artStyle", label: "Art style", type: "select", options: ["Studio Ghibli-inspired", "Flat 2D vector", "Claymation-style 3D", "Anime"], required: true },
    ],
    systemPrompt: `You are an animation director building a style-locked cartoon short. Every visual description in the timeline and the videoPrompt must reference the exact same art style, character design, and palette so an image/video model produces consistent frames across shots — repeat the core visual descriptors verbatim in each beat rather than paraphrasing them. Comedy and plot must read clearly through visuals alone, since dialogue may be limited. The videoPrompt should function as a reusable style anchor the user can paste into every subsequent shot.`,
  },
  {
    id: "knowledge-explainer",
    name: "Knowledge Explainer",
    description: "Clear, credible explainers that simplify a complex topic in under 90 seconds.",
    category: "video",
    icon: "GraduationCap",
    isPremium: false,
    fields: [
      { id: "topic", label: "Topic", type: "textarea", placeholder: "Why does compound interest grow so much faster over time?", required: true },
      { id: "audienceLevel", label: "Audience level", type: "select", options: ["Total beginner", "Some background", "Advanced"], required: true },
      { id: "analogy", label: "Preferred analogy (optional)", type: "text", advanced: true },
    ],
    systemPrompt: `You are an educational content writer known for making dense topics click in under 90 seconds. Open with the single question the viewer actually has, not a definition. Use one concrete analogy and carry it through the whole timeline. Every visual beat should either show the analogy or show the real-world mechanism — never a talking-head with no visual aid. Avoid jargon unless you immediately define it in plain terms. Do not oversimplify to the point of being inaccurate.`,
  },
  {
    id: "comedy-skit",
    name: "Comedy Skit",
    description: "Short-form scripted comedy built around one clear premise and payoff.",
    category: "video",
    icon: "Drama",
    isPremium: false,
    fields: [
      { id: "premise", label: "Premise", type: "textarea", placeholder: "A customer tries to return a clearly-used candle", required: true },
      { id: "characters", label: "Characters", type: "text", placeholder: "Overly polite employee, unreasonable customer" },
      { id: "style", label: "Comedy style", type: "select", options: ["Deadpan", "Absurdist", "Cringe/awkward", "Slapstick"], required: true },
    ],
    systemPrompt: `You are a sketch comedy writer for short-form video. Build the whole script around a single clean premise with one escalation and one payoff — resist adding subplots. Every line of dialogue should be performable by one or two people in a single location. The hook must set up the premise in the first sentence so the joke is legible with sound off, relying on burned-in captions and visible action. Match the requested comedy style precisely in tone and pacing.`,
  },
  {
    id: "cinematic-short-film",
    name: "Cinematic Short Film",
    description: "Mood-first narrative shorts written like a director's shot list.",
    category: "video",
    icon: "Clapperboard",
    isPremium: true,
    fields: [
      { id: "logline", label: "Logline", type: "textarea", placeholder: "A retired lighthouse keeper receives a letter from someone who shouldn't be alive", required: true },
      { id: "genre", label: "Genre", type: "select", options: ["Drama", "Sci-fi", "Noir", "Romance", "Thriller"], required: true },
      { id: "runtime", label: "Target runtime", type: "select", options: ["60s", "3 min", "5 min"], required: true },
    ],
    systemPrompt: `You are a film director writing a shot-by-shot treatment for an AI-generated short film. Prioritize mood, composition, and pacing over dialogue — describe camera movement, lighting, and framing in every timeline beat as a cinematographer would. The videoPrompt must read like a single cinematic master shot description (lens, lighting, atmosphere) reusable across a text-to-video model. Keep dialogue sparse and purposeful. The ending must resolve the logline's core tension, even ambiguously.`,
  },
  {
    id: "tiktok-shop-selling-clip",
    name: "TikTok Shop / Selling Clip",
    description: "High-urgency live-style selling scripts optimized for cart conversions.",
    category: "marketing",
    icon: "ShoppingCart",
    isPremium: false,
    fields: [
      { id: "product", label: "Product", type: "text", required: true },
      { id: "promo", label: "Promotion", type: "text", placeholder: "Flash sale, 40% off, next 2 hours only" },
      { id: "objection", label: "Main customer objection to overcome", type: "textarea", placeholder: "Worried it won't fit / won't work for their skin type" },
    ],
    systemPrompt: `You are a live-commerce sales scriptwriter. Write in the direct, urgent, second-person voice of a host talking straight into the camera to a shopping-intent audience. The hook must interrupt scrolling within one second. The script must explicitly name and defuse the stated customer objection. Build urgency around the promotion without sounding deceptive. The caption must include a direct, unambiguous call to action to tap the yellow cart or shop tab. Never fabricate stock scarcity or fake countdowns not provided in the input.`,
  },
];

export function getStudioById(id: string): Studio | undefined {
  return studios.find((s) => s.id === id);
}

export function getStudiosByCategory(category: string): Studio[] {
  if (category === "all") return studios;
  return studios.filter((s) => s.category === category);
}
