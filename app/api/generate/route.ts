import { NextResponse } from "next/server";
import { z } from "zod";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { generationOutputSchema } from "@/types/studio";
import { getStudioById } from "@/lib/studios";
import { getOrCreateSession } from "@/lib/session";
import { prisma } from "@/lib/db";

const requestSchema = z.object({
  studioId: z.string(),
  values: z.record(z.string()),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = requestSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { studioId, values } = parsed.data;
  const studio = getStudioById(studioId);
  if (!studio) {
    return NextResponse.json({ error: "Unknown studio." }, { status: 404 });
  }

  const session = await getOrCreateSession();
  if (studio.isPremium && !session.isMember) {
    return NextResponse.json({ error: "This Studio requires an unlocked membership." }, { status: 403 });
  }

  // Missing required fields fail loudly here rather than producing a vague generation.
  const missing = studio.fields.filter((f) => f.required && !values[f.id]?.trim());
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required field(s): ${missing.map((f) => f.label).join(", ")}` },
      { status: 400 },
    );
  }

  const userBrief = studio.fields
    .filter((f) => values[f.id]?.trim())
    .map((f) => `${f.label}: ${values[f.id]}`)
    .join("\n");

  try {
    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: generationOutputSchema,
      system: studio.systemPrompt,
      prompt: `Generate a complete Cypher content package from this brief:\n\n${userBrief}`,
    });

    const project = await prisma.project.create({
      data: {
        sessionId: session.id,
        studioId: studio.id,
        title: object.title,
        inputData: values,
        outputData: object,
      },
    });

    return NextResponse.json({ project });
  } catch (err) {
    console.error("[generate] model call failed", err);
    return NextResponse.json(
      { error: "Generation failed. The model may be temporarily unavailable — try again." },
      { status: 502 },
    );
  }
}
