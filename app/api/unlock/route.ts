import { NextResponse } from "next/server";
import { z } from "zod";
import { getOrCreateSession } from "@/lib/session";
import { redeemUnlockCode } from "@/lib/unlock";

const bodySchema = z.object({ code: z.string().min(1) });

const REASON_MESSAGES: Record<string, string> = {
  invalid_format: "That doesn't look like a Cypher code. Format: CYPHER-XXXXXXXX.",
  not_found: "We couldn't find that code.",
  inactive: "This code has been deactivated.",
  exhausted: "This code has already been used.",
};

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Missing code." }, { status: 400 });
  }

  const session = await getOrCreateSession();
  const result = await redeemUnlockCode(parsed.data.code, session.id);

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: REASON_MESSAGES[result.reason] },
      { status: 422 },
    );
  }

  return NextResponse.json({ ok: true });
}
