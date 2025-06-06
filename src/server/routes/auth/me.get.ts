export default defineEventHandler(async (event) => {
  const sessionCookie = getCookie(event, "auth-session");
  const profileCookie = getCookie(event, "user-profile");

  if (!sessionCookie || !profileCookie) {
    throw createError({
      status: 401,
      statusMessage: "Unauthorized",
    });
  }

  try {
    const profile = JSON.parse(profileCookie);
    return {
      user: profile,
    };
  } catch {
    throw createError({
      status: 401,
      statusMessage: "Invalid session",
    });
  }
});
