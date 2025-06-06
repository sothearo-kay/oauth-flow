import { joinURL } from "ufo";

export default defineEventHandler(async (event) => {
  const proxyUrl = useRuntimeConfig().public.apiUrl;
  const path = event.path.replace(/^\/api\//, "");
  const target = joinURL(proxyUrl, path);

  try {
    const { accessToken } = await requireAuth(event);
    return proxyRequest(event, target, {
      headers: { authorization: `Bearer ${accessToken}` },
    });
  } catch {
    // No auth - proxy without auth header
    return proxyRequest(event, target);
  }
});
