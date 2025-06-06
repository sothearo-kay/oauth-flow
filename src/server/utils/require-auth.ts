import type { H3Event } from "h3";

export async function requireAuth(event: H3Event) {
  const sessionCookie = getCookie(event, "auth-session");

  if (!sessionCookie) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  try {
    const session: { accessToken: string } = JSON.parse(sessionCookie);
    return session;
  } catch {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid session",
    });
  }
}
