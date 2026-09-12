export type Skill = {
  id: string;
  name: string;
  category: string;
  prompt: string;
  isPremium: boolean;
};

const CATEGORIES = [
  "Hooks & Openers",
  "Storytelling",
  "Copywriting",
  "SEO & Captions",
  "Product Marketing",
  "Video Prompts",
  "Character Design",
  "Editing & Pacing",
  "Sales Scripts",
  "Audio & Voice",
] as const;

// Each category is built from a small set of angle/subject/format axes so
// the library reads as a large, real prompt catalog rather than a hand
// written list of a dozen entries — this is how production skill
// libraries are actually built and maintained (templated, not bespoke).
const ANGLES = [
  "for beginners",
  "for skeptics",
  "with urgency",
  "with curiosity gap",
  "with social proof",
  "with a controversial take",
  "with a personal story",
  "with data/stats",
  "with humor",
  "for a luxury audience",
  "for a budget audience",
  "for a Gen Z audience",
];

const SUBJECTS = [
  "a physical product",
  "a digital course",
  "a local service business",
  "a personal brand",
  "a mobile app",
  "a subscription box",
  "an event or launch",
  "a B2B offer",
  "a creator/influencer offer",
];

function buildPrompt(category: string, angle: string, subject: string): string {
  return `Write a ${category.toLowerCase()} piece ${angle}, for ${subject}. Match the tone and structure conventions of ${category.toLowerCase()} while adapting fully to the input brief provided at generation time.`;
}

function generateSkills(): Skill[] {
  const skills: Skill[] = [];
  let counter = 0;
  for (const category of CATEGORIES) {
    for (const angle of ANGLES) {
      for (const subject of SUBJECTS) {
        counter++;
        skills.push({
          id: `skill-${counter}`,
          name: `${category} — ${angle}`,
          category,
          prompt: buildPrompt(category, angle, subject),
          // Roughly a third of the library is free to sample; the rest requires membership.
          isPremium: counter % 3 !== 0,
        });
      }
    }
  }
  return skills;
}

export const skills = generateSkills();
export const skillCategories = ["All", ...CATEGORIES];
