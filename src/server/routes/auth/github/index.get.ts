import { generateState } from "arctic";

export default defineEventHandler(async (event) => {
  const github = getGitHubClient();
  const state = generateState();

  // Store state in cookie for CSRF protection
  setCookie(event, "github_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10, // 10 minutes
    sameSite: "lax",
  });

  const url = github.createAuthorizationURL(state, ["user:email", "read:user"]);

  return sendRedirect(event, url.toString());
});
