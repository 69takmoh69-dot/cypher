import { z } from "zod";
import { prisma } from "@/lib/db";

// CYPHER-XXXXXXXX where X is any of A-Z0-9, always 8 characters after the dash.
export const unlockCodeSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^CYPHER-[A-Z0-9]{8}$/, "Code must look like CYPHER-XXXXXXXX");

export type UnlockResult =
  | { ok: true }
  | { ok: false; reason: "invalid_format" | "not_found" | "inactive" | "exhausted" };

/**
 * Validates and redeems a code against a given session, all inside one
 * transaction so two concurrent redemptions can't both slip past a
 * maxUses ceiling (a classic race condition with naive read-then-write).
 */
export async function redeemUnlockCode(rawCode: string, sessionDbId: string): Promise<UnlockResult> {
  const parsed = unlockCodeSchema.safeParse(rawCode);
  if (!parsed.success) return { ok: false, reason: "invalid_format" };

  const code = parsed.data;

  return prisma.$transaction(async (tx) => {
    const record = await tx.unlockCode.findUnique({ where: { code } });
    if (!record) return { ok: false, reason: "not_found" };
    if (!record.isActive) return { ok: false, reason: "inactive" };
    if (record.usedCount >= record.maxUses) return { ok: false, reason: "exhausted" };

    await tx.unlockCode.update({
      where: { id: record.id },
      data: { usedCount: { increment: 1 } },
    });

    await tx.session.update({
      where: { id: sessionDbId },
      data: { isMember: true, unlockedAt: new Date(), unlockCodeId: record.id },
    });

    return { ok: true };
  });
}
