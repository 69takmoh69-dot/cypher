import { NextResponse } from "next/server";
import { z } from "zod";
import { getOrCreateSession } from "@/lib/session";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getOrCreateSession();
  const progress = await prisma.missionProgress.findMany({ where: { sessionId: session.id } });
  return NextResponse.json({ progress });
}

const bodySchema = z.object({
  missionId: z.string(),
  currentStep: z.number().int().min(0),
  completed: z.boolean().optional(),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid body." }, { status: 400 });

  const session = await getOrCreateSession();
  const { missionId, currentStep, completed } = parsed.data;

  const updated = await prisma.missionProgress.upsert({
    where: { sessionId_missionId: { sessionId: session.id, missionId } },
    create: { sessionId: session.id, missionId, currentStep, completed: completed ?? false },
    update: { currentStep, completed: completed ?? false },
  });

  return NextResponse.json({ progress: updated });
}
