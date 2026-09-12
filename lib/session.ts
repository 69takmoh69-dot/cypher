import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/db";

const SESSION_COOKIE = "cypher_session";

/**
 * Returns the current session's DB row, creating both the cookie and the
 * row on first visit. No login, no password — the cookie itself is the
 * credential, scoped httpOnly + secure so client JS can never read it.
 */
export async function getOrCreateSession() {
  const store = await cookies();
  const existingId = store.get(SESSION_COOKIE)?.value;

  if (existingId) {
    const session = await prisma.session.findUnique({ where: { sessionId: existingId } });
    if (session) {
      await prisma.session.update({
        where: { id: session.id },
        data: { lastSeenAt: new Date() },
      });
      return session;
    }
  }

  const sessionId = randomUUID();
  const session = await prisma.session.create({ data: { sessionId } });

  store.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year — this is a device credential, not a login
    path: "/",
  });

  return session;
}

export async function getCurrentSession() {
  const store = await cookies();
  const existingId = store.get(SESSION_COOKIE)?.value;
  if (!existingId) return null;
  return prisma.session.findUnique({ where: { sessionId: existingId } });
}
