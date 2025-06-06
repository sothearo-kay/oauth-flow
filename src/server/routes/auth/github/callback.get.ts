import { OAuth2RequestError } from "arctic";
import type { User } from "~/types/user";

interface GitHubUser {
  id: number;
  login: string;
  email: string | null;
  avatar_url: string;
  name: string | null;
}

export default defineEventHandler(async (event) => {
  try {
    const code = validateOAuthState(event);

    const github = getGitHubClient();
    const tokens = await github.validateAuthorizationCode(code);
    const accessToken = tokens.accessToken();

    const githubUser = await $fetch<GitHubUser>("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
      onResponseError({ response }) {
        throw createError({
          statusCode: response.status,
          statusMessage: `Failed to fetch GitHub user data: ${response.statusText}`,
        });
      },
    });

    const userData = {
      accessToken: accessToken,
      githubId: githubUser.id,
      username: githubUser.login,
      email: githubUser.email,
      avatarUrl: githubUser.avatar_url,
    } satisfies User & { accessToken: string };

    createSessionCookies(event, userData);

    // Clean up state cookie
    deleteCookie(event, "github_oauth_state");

    return sendRedirect(event, "/");
  } catch (e) {
    // Clean up state cookie on error
    deleteCookie(event, "github_oauth_state");

    if (e instanceof OAuth2RequestError) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid authorization code",
      });
    }

    if (e instanceof Error && "statusCode" in e) {
      throw e;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
