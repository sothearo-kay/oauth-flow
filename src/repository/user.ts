import type { NitroFetchRequest, $Fetch } from "nitropack";
import type { User } from "~/types/user";

export interface UserPaginationParams {
  page?: number;
  limit?: number;
}

export interface UserResponse {
  users: User[];
  hasMore: boolean;
  total: number;
}

export const userRepository = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
  async get(params?: UserPaginationParams): Promise<UserResponse> {
    return fetch("/api/users", { params });
  },
});
