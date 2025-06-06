import type { FetchOptions } from "ofetch";
import { userRepository } from "~/repository/user";

export default defineNuxtPlugin(() => {
  // const config = useRuntimeConfig();
  const accessToken = useCookie("access_token");

  const fetchOptions: FetchOptions = {
    method: "GET",
    onRequest: ({ options }) => {
      const defaults: HeadersInit = {
        "Content-Type": "application/json",
        ...(accessToken.value && {
          Authorization: `Bearer ${accessToken.value}`,
        }),
      };

      options.headers = { ...defaults, ...options.headers };
    },
    onResponseError: ({ response }) => {
      console.log(response);
    },
  };

  const fetcher = $fetch.create(fetchOptions);

  const repositories = {
    user: userRepository(fetcher),
  };

  return {
    provide: {
      api: repositories,
    },
  };
});
