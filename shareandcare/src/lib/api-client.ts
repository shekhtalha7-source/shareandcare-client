import { authClient } from "@/lib/auth-client";

const API = process.env.NEXT_PUBLIC_API_URL;

export async function authFetch(path: string, options: RequestInit = {}) {
  const { data } = await authClient.token();
  return fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${data?.token}`,
    },
  });
}