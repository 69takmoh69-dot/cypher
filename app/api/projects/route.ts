import { NextResponse } from "next/server";
import { getOrCreateSession } from "@/lib/session";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getOrCreateSession();
  const projects = await prisma.project.findMany({
    where: { sessionId: session.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json({ projects });
}
