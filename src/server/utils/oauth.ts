import { GitHub } from "arctic";
import type { H3Event } from "h3";
import type { User } from "~/types/user";

let github: GitHub;

export function getGitHubClient() {
  if (!github) {
    const config = useRuntimeConfig();

    github = new GitHub(
      config.githubClientId,
      config.githubClientSecret,
      config.githubCallbackUrl,
    );
  }

  return github;
}

export function validateOAuthState(event: H3Event): string {
  const query = getQuery(event);
  const code = query.code?.toString() ?? null;
  const state = query.state?.toString() ?? null;
  const storedState = getCookie(event, "github_oauth_state") ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid OAuth state or code",
    });
  }

  return code;
}

export function createSessionCookies(
  event: H3Event,
  userData: User & { accessToken: string },
) {
  const isProduction = process.env.NODE_ENV === "production";

  // Store sensitive data in httpOnly cookie
  setCookie(
    event,
    "auth-session",
    JSON.stringify({
      accessToken: userData.accessToken,
    }),
    {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  );

  // Store non-sensitive data for client access
  setCookie(
    event,
    "user-profile",
    JSON.stringify({
      githubId: userData.githubId,
      username: userData.username,
      email: userData.email,
      avatarUrl: userData.avatarUrl,
    }),
    {
      httpOnly: false,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  );
}
